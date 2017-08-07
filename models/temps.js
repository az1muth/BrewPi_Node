//-----CONTROLLER FOR TEMPS COLLECTION
//7-28-17 adding mongoose to project per mdb
//TempModel.js includes the Schema definition and  export the model()
//just need to require() and a new model instance will be created
var tempModel = require('./TempModel.js');

// returns all temps records in the collection. No formatting
// changing to the monggose approach

exports.all = function(cb){

	tempModel.find([],function(err,results){
		console.log('Records in tempModel:' + results.length)
		cb(results)
	})
	

	/*
	tempModel.count({},function(err,results){
		console.log('Attempting tempModel.count:' + results)
		cb(results)
	})
	*/
}
  

/* returns the specified number of records. Number of records
is pulled from the URL. using limit. also uses projection 
to remove the id. */
exports.getNtemps = function(Nfilter,cb){
	        Nfilter = parseInt(Nfilter)

	        // --- using mongoose approach ----
	        var query = tempModel.find({})
	        query.find({})
	        	.limit(Nfilter)
	        	.exec( function(err, results){

	        		format4Chart(results, function(data){
	        			cb(data)
	        		})
	        	})
	        // -- END mongoose approach ---
}


/* returns records for last N days. Where Ndays is a param
with a default value that returns all data.  */
exports.getTemps = function(Ndays=1e3,cb){
  // date calc all in milliseconds
  // number of seconds in 1day = 8.64e4
  // mongo created data is javascript/1000
  console.log("Ndays: "+ Ndays + "  Sec in Ndays:" + Ndays*8.64E4)
  var _created = (Date.now()/1000) - (Ndays*8.64e4) 
  console.log('Now/1000:' + Date.now()/1000 + "  _created:" + _created )
  // --- using mongoose approach ----
	        var query = tempModel.find({})
	        	//using the mongoose query builder
	        	//JSON doc equivalent would be find({'created':{$gt:_created}})
	        	.where('created').gt(_created)
	        	.exec( function(err, results){
	        		format4Chart(results, function(data){
	        			cb(data)
	        		})
	        	})
	        // -- END mongoose approach ---
}






/* returns a json doc formatted for use with HiCharts line chart.
one key in the json doc 'data' that is and array of arrays 
with x,y data. */

function format4Chart(datArray, cb){
        var wrapperArray = []
        var pointArray = []
		for (i=0;i<datArray.length;i++){
		 	pointArray = []
		 	//created in unix ts in mongodb. multipy by 1000 to 
		 	//get JS format
		 	pointArray.push(datArray[i].created * 1000)
		 	//trying the virtual property JS_created
		 	//pointArray.push(datArray[i].JS_created)
		 	pointArray.push(datArray[i].tempC )
			wrapperArray.push(pointArray)
		}	
		cb(wrapperArray)
}

	
//hits Mongo and returns the full array. 
function getAll (){
		//console.log("just hit the mongo collection. ")
		//if (err) return console.error('Uhoh, there was an error', err)
		var collection = db.get().collection('Temp')	
		collection.find().toArray(function(err, docs) {
		  	console.log("docs array length: " + docs.length)
		})	
}



function formatAll (FullMongoArray){
	console.log ("formatting the results")
   for (i=0;i<10;i++){
		results[i] = "TempC:" + FullMongoArray[i].tempC
	}	
	console.log(results)	
}
	


exports.stats = function(cb){
	    var statArray = [];
		Count(function(data){
			statArray.push("Total Readings: " + data + " ")

		FirstOrLast(-1,function(data){
			//convert unix date string to datestring
			var newDate = new Date(data.created*1000).toString();
			statArray.push("Latest(date): " + newDate + " ")
			statArray.push("Latest(Temp C): " + data.tempC + " ")
			data = statArray
			//cb(data)

			FirstOrLast(1,function(data){
				//convert unix date string to datestring
				var newDate = new Date(data.created*1000).toString();
				statArray.push("Oldest(date): " + newDate + " ")
				statArray.push("Oldest(Temp C): " + data.tempC + " ")
				data = statArray
				cb(data)
			})

		})
		
	})		
}


// return the number of records in Temps collection	
function Count(cb){
	tempModel.count({},function(err,results){
		console.log('tempModel.count:' + results)
		cb(results)
	})

}


// gets the most recent  and earliest entries
// intSort order is 1 for earliest, -1 for latest(current)
function FirstOrLast(intSort, cb){
	var query = tempModel.findOne({});
	query.sort({created:intSort});
	query.exec(function(err,results){
		//convert unix date string to datestring
		var newDate = new Date(results.created*1000).toString();
		//console.log('Latest: ' + newDate + "   " + results.tempC);
		cb(results)
	})
}





/*
exports.all = function(){
	//var dataArray = '12,34,45'
	db.collection("Temps").find({}).toArray(function(err,results){
	if (err) throw err;
    console.log(results);
    return results;
})
 */  

	//console.log ("dataArray from Temps.all:" + dataArray)
	//return dataArray


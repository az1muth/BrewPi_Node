//-----CONTROLLER FOR TEMPS COLLECTION
//--file with Mongodb connection helper functions
//var db = require('../db')
//-- call helper function to set the  TEMP collection for this controller

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

//------ orig function to get all----

//exports.all = function(cb){
//		var collection = db.get().collection('Temp')	
//		collection.find().toArray(function(err, results) {
//		  	console.log("results array length: " + results.length)
//			cb(results)
//		})		
//	}

//-----END OF oring get all function ----


  
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

	        

	        // commented out orig work method
	        /*
			var collection = db.get().collection('Temp')
			collection.find({},{'_id':0}).limit(Nfilter).toArray(function(err, results) {
		  		console.log("results array length: " + results.length)

				format4Chart(results, function(data){
					cb(data)
				})
			})
			*/
}


/* returns a json doc formatted for use with HiCharts line chart.
one key in the json doc 'data' that is and array of arrays 
with x,y data. */

function format4Chart(datArray, cb){
        var wrapperArray = []
        var pointArray = []
		for (i=0;i<datArray.length;i++){
		 	pointArray = []
		 	pointArray.push(datArray[i].created)
		 	pointArray.push(datArray[i].tempC )
			wrapperArray.push(pointArray)
		}	
		cb(wrapperArray)
}

	
  	//var collection = db.get().collection('Temp')
	//collection.find().toArray(function(err, docs) {
	//  console.log("Qurying mongo")
	//  console.log("docs array length: " + docs.length)
	//})
	



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


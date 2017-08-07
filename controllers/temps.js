// THIS IS THE CONTROLLER FOR TEMPS //
// Mounted as /temps in app.js /
var express = require('express')
var router = express.Router()
var Temps  = require('../models/temps.js')
var path = require('path')


/*
router.get('/all', function(req, res) {
   Temps.all(function(err, docs) {
   console.log('just called the controllers-temps.js')
   console.log('db state:'+ state)
   //res.render('temps', {temps: docs})
  })
})
*/

// root route for /temps. placeholder for now. 
router.get('/', function(req,res){
	res.send ('NOT IMPLEMENTED....basic entry root route-----Temps')
})


//  route for experimenting with Hicharts. 
// serves html page with js for hichart that calls getNtemps using getJSON() 
router.get('/chart', function(req,res){
	//res.sendFile('/Users/SMF/Documents/GzSndBox/Node/apps/BrewPi/views/highChartTest.html');
   //build the path name. Cleaner to adjust when moving to various dev machines
  	var zbDir = 'C:\\Users\\gman\\Documents\\Node\\apps\\BrewPi\\views'
  	var macDir = '/Users/SMF/Documents/GzSndBox/Node/apps/BrewPi/views/'
  	var ec2Dir = 'var/www/node/BrewPi/views'

  var pth2View = path.format({
   	dir: ec2Dir,
   	base: 'stats.html'
   })

   console.log(pth2View)
   //res.sendFile('/Users/SMF/Documents/GzSndBox/Node/apps/BrewPi/views/stats.html');
   res.sendFile(pth2View)
})	


// retuns all the records from the TEMP collection
// no formatting, filtering, or projection
router.get('/getAll', function(req, res) {
	//res.send('this is the / route')
	Temps.all(function(data){
		res.json(data)
	})		
})


// returns a limited number of records from Temp collection
// using find().limit(N)
router.get('/getNtemps/:Ntemps', function(req, res){
 	//res.send ('this is the all route')
 	var numberOftemps = req.params.Ntemps
 	Temps.getNtemps(numberOftemps, function(data){
 		res.send(JSON.stringify(data))
 	})
})


// returns records from Temp collection for last N days
// , where N days is a parameter.  
router.get('/LastNDays/:NumOfDays', function(req, res){
 	var NumOfDays = req.params.NumOfDays
 	Temps.getTemps(NumOfDays, function(data){
 		res.send(JSON.stringify(data))
 	})
})

// gets some stats about the Collection
router.get('/stats', function(req,res){
	//res.send('called the stats method. Checked the console')
	Temps.stats(function(data){
		console.log("from Stats in router: " + data.length)
		var strData
		for(i=0;i<data.length;i++){
			strData += data[i]
		}
		console.log(strData)
		//data will be and array with values to use for display
		res.send(data)
	})
})

module.exports = router

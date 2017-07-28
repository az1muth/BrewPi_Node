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
	res.sendFile('/Users/SMF/Documents/GzSndBox/Node/apps/BrewPi/views/highChartTest.html');
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

module.exports = router

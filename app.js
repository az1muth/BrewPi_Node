/*
7-28-17 adding mongoose per the mdn example. Create a branch on git

7-14-17  Experimenting to create mvc style app for reading Brew Pi Temps from Mongo
on Node.
*/
var express = require('express')

//Changing to mongoose approach
//var db = require('./db')
var mongoose = require('mongoose');

app = express()

//view engine to be implemented later
//app.engine('jade', require('jade').__express)
//app.set('view engine', 'jade')

app.use('/temps', require('./controllers/temps'))

//set static file serving from public. mainly setup for css
//when experimenting with bootstrap. 
app.use(express.static('public'))

//---Connecting to mongo with mongoose-------
//setup uri to mongodb
var mongoDB = 'mongodb://BrewPi:BrewPi@ds145380.mlab.com:45380/brew'
mongoose.connect(mongoDB, {
  useMongoClient: true,
  /* other options */
});


//Get the connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of an conn error)
db.on('error', console.error.bind(console, 'MongoDB connection error'))

//verifying connection
db.once('open', function() {
  // we're connected!
  console.log('Connected to Mongo. readyState: ' + db.readyState + "  collection: " + db.collections.collection)
});


//---Connection to mongo END of section---------

// Connect to Mongo on start
// uri stored in the db.js
/*
db.connect(db.uri, function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
    //app.listen(3000, function() {
      console.log('Connected to mlab. ' + db.uri)
    //})
  }
})
*/

// listen on port 3000
app.listen(3000, function(){
	console.log('listening on port 3000...')
})

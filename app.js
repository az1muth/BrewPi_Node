/*
7-14-17  Experimenting to create mvc style app for reading Brew Pi Temps from Mongo
on Node.
*/
var express = require('express')
var db = require('./db')


app = express()

//view engine to be implemented later
//app.engine('jade', require('jade').__express)
//app.set('view engine', 'jade')

app.use('/temps', require('./controllers/temps'))

//set static file serving from public. mainly setup for css
//when experimenting with bootstrap. 
app.use(express.static('public'))

// Connect to Mongo on start
// uri stored in the db.js
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

// listen on port 3000
app.listen(3000, function(){
	console.log('listening on port 3000...')
})

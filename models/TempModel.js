// schema and model for mongoose and Temps collection

//Require mongoose
var mongoose = require('mongoose');

//Define a schema
var schema = mongoose.Schema;

var TempModelSchema = new schema({
	tempC: 	Number,	
	created: Number
})

//exports function to creat TempModel model class
module.exports = mongoose.model('TempModel',TempModelSchema,'Temp');
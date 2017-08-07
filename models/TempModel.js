// schema and model for mongoose and Temps collection

//Require mongoose
var mongoose = require('mongoose');

//Define a schema
var schema = mongoose.Schema;

var TempModelSchema = new schema({
	tempC: 	Number,	
	created: Number
})

TempModelSchema.virtual('JS_created').get(function(){
	//value stored in mongo is unix so multiply by 1000 to get javascript 
	return this.created * 1000;
})

//exports function to creat TempModel model class
module.exports = mongoose.model('TempModel',TempModelSchema,'Temp');
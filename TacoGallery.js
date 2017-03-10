var AWS = require("aws-sdk");
var uuid = require('uuid');
var dynamodb = require('serverless-dynamodb-client');

class TacoGallery{
	constructor(){
		this.db = dynamodb.doc;

	}
	
	hello(event){
		return {
		  message: 'Go Serverless v1.0! Your function executed successfully!',
		  input: event,
		}
	}
	
	saveTaco(tacoName,tacoDescription){

		var params = {
			TableName:'TacoGallery',
			Item:{
				"id": uuid.v4(),
				"name": tacoName,
				"description": tacoDescription
			}
		};
		
		return this.db.put(params).promise();
	}
}

module.exports = TacoGallery;
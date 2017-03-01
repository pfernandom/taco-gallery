var AWS = require("aws-sdk");
var uuid = require('uuid');

AWS.config.update({
  region: "us-west-1"
});

class TacoGallery{
	constructor(){
		this.db = new AWS.DynamoDB.DocumentClient();

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
	import uuid from 'uuid';
	import dynamodb from 'serverless-dynamodb-client';
	import {ValidationUtils} from './Utils';

	class TacoGallery{
		constructor(){
			this.db = dynamodb.doc;
			this.v = new ValidationUtils();
		}

		hello(event){
			return {
			  message: 'Go Serverless v1.0! Your function executed successfully!',
			  input: event,
			}
		}

		saveTaco(taco){
			let id = uuid.v4();
			var params = {
				TableName:'TacoGallery',
				Item:Object.assign({
					"id": id
				}, taco)
			};

			return this.v.validate(taco, "/Taco").then(data => {
				return this.db.put(params).promise().then(data => {
					data = Object.assign({id:id},data);
					return data;
				});
			});
		}
		getTaco(id){
			var params = {
				TableName:'TacoGallery',
				KeyConditionExpression: "#id = :idValue",
				ExpressionAttributeNames:{
					"#id": "id"
				},
				ExpressionAttributeValues: {
					":idValue":id
				}
			};

			return this.db.query(params).promise();
		}
	}

	module.exports = TacoGallery;
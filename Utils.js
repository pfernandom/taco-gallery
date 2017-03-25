/**
 * Created by pedro on 3/5/17.
 */
import {Validator} from 'jsonschema';

class ValidationUtils{
	constructor(){
		this.v = new Validator();

		const schema = {
			"id": "/Taco",
			"type": "object",
			"properties": {
				"name": {"type": "string"},
				"description": {"type": "string"}
			},
			"required": ["name"],
			"additionalProperties": false
		}

		this.v.addSchema(schema, '/Taco');
	}
	validate(object, type){
		let schema = this.v.schemas[type];

		return new Promise((resolve, reject) => {
			var validation = this.v.validate(object, schema);
			if(validation.errors.length > 0){
				console.log(validation);
				reject(validation.errors)
			}
			else{
				resolve();
			}
		});
	}
}

export {ValidationUtils};
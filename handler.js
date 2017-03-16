import TacoGallery from './TacoGallery'

const isString = (obj => typeof obj === 'string' || obj instanceof String )


module.exports.hello = (event, context, callback) => {
	var tacoGallery = new TacoGallery();
	
  const response = {
    statusCode: 200,
    body: JSON.stringify(tacoGallery.hello(event)),
  };

  callback(null, response);
};

module.exports.saveTaco = (event, context, callback) => {
	var tacoGallery = new TacoGallery();
	console.log(event)
	var params = isString(event) ? JSON.parse(event.body): event.body;
	console.log(params);
	
	tacoGallery.saveTaco(params.name, params.description).then(data => {
		const response = {
			statusCode: 200,
			body: JSON.stringify(data),
		};

		callback(null, response);
	})
	.catch(err => {
		const response = {
			statusCode: 409,
			body: JSON.stringify({
				message: 'Could not save the taco',
				stack: err
			})
		};

		callback(null, response);
	});
	
  
};

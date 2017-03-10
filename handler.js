import TacoGallery from './TacoGallery'

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
	var params = JSON.parse(event.body);
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

import TacoGallery from './TacoGallery'
import lib from './lib'

const isString = (obj => typeof obj === 'string' || obj instanceof String )


module.exports.hello = (event, context, callback) => {
	var tacoGallery = new TacoGallery();
	
  const response = {
    statusCode: 200,
	headers: {
	  "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
	  "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
	},
    body: JSON.stringify(tacoGallery.hello(event)),
  };

  callback(null, response);
};

module.exports.saveTaco = (event, context, callback) => {
	var tacoGallery = new TacoGallery();
	console.log(typeof event.body)
	var params = isString(event.body) ? JSON.parse(event.body): event.body;

	tacoGallery.saveTaco(params).then(data => {
		const response = {
			statusCode: 200,
			body: JSON.stringify(data),
		};

		callback(null, response);
	})
	.catch(err => {
		const response = {
			statusCode: 409,
			body: {
				message: 'Could not save the taco',
				stack: err
			}
		};

		callback(null, response);
	});
	
  
};

module.exports.getTaco = (event, context, callback) => {
	var tacoGallery = new TacoGallery();
	let id = event.pathParameters.id;

	tacoGallery.getTaco(id).then(data => {
			const response = {
				statusCode: 200,
				body: JSON.stringify(data),
			};

			callback(null, response);
		})
		.catch(err => {
			const response = {
				statusCode: 409,
				body: {
					message: 'Could not save the taco',
					stack: err
				}
			};

			callback(null, response);
		});


};


// Lambda function index.handler - thin wrapper around lib.authenticate
module.exports.auth = function( event, context ) {
	console.log("Staaart");
	try{
		lib.authenticate( event )
			.then( context.succeed )
			.catch( err => {
				if ( ! err ) context.fail( "Unhandled error case" );
//      if ( err.message ) context.fail( err.message );
				console.log(err);
				context.fail( err );
			});
	}
	catch(err){
		console.log(err);
		context.fail( err );
	}
};

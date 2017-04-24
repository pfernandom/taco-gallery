require('dotenv').load();
var hello = require('./handler').hello
var saveTaco = require('./handler').saveTaco
var TestUtils = require('./TestUtils.util');

var assert = require('chai').assert;
var should = require('chai').should();

describe("Taco Gallery tests", function () {
	
	before(function(done){
		this.timeout(50000);
		TestUtils.mockDB().then(function(data){
			done();
		})
		.catch(function(err){
			assert(false,"Could not create the mock DB")
			done();
		});
	});

    it('the hello function should work', function(done){
		this.timeout(50000);
		var event={};
		var context={};
		var callback = (ctx, data) => {
			done();
		}
		hello(event,context,callback)
	})
	
	 it('should save a taco', function(done){
		
		var event={
			"body":'{"name":"Al pastor","description": "Delicious taco!"}'
		};
		var context={};
		var callback = (ctx, data) => {
			try{
				console.log(data)
				assert(data);
				assert(data.statusCode == 200);
			}
			catch (err){
				console.log(err)
				done(err);
			}
		}
		saveTaco(event,context,callback)
	})

   
});
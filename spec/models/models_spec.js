var models = require("../../models/models");
var Person = models.Person;
var db = require("../../config/db");
describe("models", function(){
    beforeEach(function(done){
        db.connect(function(){
            models.seed(function(){
                done();
            });
        });
    });
    afterEach(function(done){
        db.disconnect(function(){
            done();
        });
    });
    describe("getPersonByName", function(){
        var person;
        beforeEach(function(){
            Person.getOneByName("Moe", function(err, _person){
                person = _person;
                done();
            });
        });
        it("Person Is Moe", function(){
           expect(person.name).toEqual("Moe"); 
        });
        
    });
    
});
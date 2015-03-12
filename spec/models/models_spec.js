var models = require("../../models/models");
var Person = models.Person;
var Thing = models.Thing;
var db = require("../../config/db");
describe("models", function(){
    var ids = {};
    beforeEach(function(done){
        db.connect(function(){
            models.seed(function(err, moe, larry, curly, r, p, s){
                ids.moeId = moe.id;
                ids.larryId = larry.id;
                ids.curlyId = curly.id;
                ids.rockId = r.id;
                ids.paperId = p.id;
                ids.scissorsId = s.id;
                done();
            });
        });
    });
    afterEach(function(done){
        db.disconnect(function(){
            done();
        });
    });
    
    describe("Person", function(){
        describe("getPersonByName", function(){
            var person;
            beforeEach(function(done){
                Person.getOneByName("Moe", function(err, _person){
                    person = _person;
                    done();
                });
            });
            it("Person Is Moe", function(){
               expect(person.name).toEqual("Moe"); 
            });
        });
        describe("getPersonById", function(){
            var person;
            beforeEach(function(done){
                Person.getOneById(ids.moeId, function(err, _person){
                    person = _person;
                    done();
                });
            });
            it("Returns Moe", function(){
                expect(person.name).toEqual("Moe");
            });
            
        });
        describe("getAll", function(){
            var people;
            beforeEach(function(done){
                Person.getAll(function(err, _people){
                    people = _people.map(function(person){
                        return person.name;
                    });
                    done();
                });
            });
            it("Returns [curly, larry, moe]", function(){
                expect(people).toEqual(['Curly', 'Larry', 'Moe']);
            });
        });
    });
    
    describe("Thing", function(){
        describe("get one by name", function(){
            var thing;
            beforeEach(function(done){
                Thing.getOneByName("Rock", function(err, _thing){
                    thing = _thing;
                    done();
                });
            });
            it("Should be Rock", function(){
                
                expect(thing.name).toEqual("Rock");
            });
        });
        describe("get thing by id", function(){
            var thing;
            beforeEach(function(done){
                Thing.getOneById(ids.rockId, function(err, _thing){
                    thing = _thing;
                    done();
                });
            });
            it("Should be Rock", function(){
                expect(thing.name).toEqual("Rock");
            });
        });
    });
});
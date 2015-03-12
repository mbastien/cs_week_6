var mongoose = require("mongoose");
var PersonSchema = new mongoose.Schema({
    name:String
});
var ThingSchema = new mongoose.Schema({
    name:String
});

PersonSchema.statics.getOneByName = function(name, cb){
    this.findOne({name:name}, cb);
};

ThingSchema.statics.getOneByName = function(name, cb){
    this.findOne({name:name}, cb);
};

PersonSchema.statics.getOneById = function(id, cb){
    this.findOne({_id:id}, cb);
};

PersonSchema.statics.getAll = function(cb){
    this.find({}).sort("name").exec(cb);
};

var Person = mongoose.model("Person", PersonSchema);

var Thing = mongoose.model("Thing", ThingSchema);

function seed(cb){
    var people = [
        {name : "Moe"},
        {name : "Larry"},
        {name : "Curly"}
    ];
    var things = [
        {name : "Rock"},
        {name : "Paper"},
        {name : "Scissors"}
    ];
    Person.remove({}, function(){
        Person.create(people, function(err, moe, larry, curly){
            Thing.remove({}, function(){
                Thing.create(things, function(err, r, p, s){
                    cb(err, moe, larry, curly, r, p, s);
                });
            });
        });
    });
    
}

module.exports = {
    seed : seed,
    Person : Person, 
    Thing : Thing
}
var mongoose = require("mongoose");
var PersonSchema = new mongoose.Schema({
    name:String
});

function seed(cb){
    var people = [
        {name : "Moe"},
        {name : "Larry"},
        {name : "Curly"}
    ];
    Person.remove({}, function(){
        Person.create(people, function(err, moe, larry, curly){
            cb(err, moe, larry, curly);
        });
    });
}

var Person = mongoose.model("Person", PersonSchema);

module.exports = {
    seed : seed,
    Person : Person    
}
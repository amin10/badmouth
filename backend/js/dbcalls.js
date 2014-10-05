Parse.initialize("s32blhuMK0fzjARmluinIoP7GMNCsWXPsREdsFhD", "geSjnD0tu528nZjZHMKPCQ9XB9EbGKCoaUGdXf56");

var Target = Parse.Object.extend("Target");
var Badmouth = Parse.Object.extend("Badmouth");

function get_target_promise(){
    var query = new Parse.Query(Target);
    var d = new Date();
    var time = (5 * 24 * 3600 * 1000);
    var expirationDate = new Date(d.getTime() - (time));
    query.greaterThan("createdAt",  expirationDate);
    query.descending("bmcount");
    return query.find();
}

function populate_table(){
promise = get_target_promise();
promise.then(function(results) {
  console.log(results);  
})
}
                        
function get_badmouths(target_id) {
    var query = new Parse.Query(Target);
    query.equalTo("objectId",target_id);
    return query.find();
}

function init_badmouths(){
promise = get_target_promise();
promise.then(function(results) {
    for (i = 0; i < results.length; i++) {
        results[i].relation("badmouths").query().find().then(function (results2) {
            console.log(results2[0].get("text")); }); 
    } 
})
}


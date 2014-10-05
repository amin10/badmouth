Parse.initialize("s32blhuMK0fzjARmluinIoP7GMNCsWXPsREdsFhD", "geSjnD0tu528nZjZHMKPCQ9XB9EbGKCoaUGdXf56");



function get_targets(){
    var Target = Parse.Object.extend("Target");
    var query = new Parse.Query(Target);
    var d = new Date();
    var time = (5 * 24 * 3600 * 1000);
    var expirationDate = new Date(d.getTime() - (time));
    query.greaterThan("createdAt",  expirationDate);
    query.descending("bmcount");
    query.find().then(function(results) {
     return results;
    })
}



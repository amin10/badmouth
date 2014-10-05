Parse.initialize("s32blhuMK0fzjARmluinIoP7GMNCsWXPsREdsFhD", "geSjnD0tu528nZjZHMKPCQ9XB9EbGKCoaUGdXf56");

var Target = Parse.Object.extend("Target");
var Badmouth = Parse.Object.extend("Badmouth");

function submit_badmouth(target_name, badmouth_text){
    var query = new Parse.Query(Target);
    query.equalTo("name", target_name);
    query.find({
        success: function(results) {
            if (results.length == 0) { 
                var target = new Target();
                target.set("name", target_name);
                target.save(null, {
                    success: function(target) {
                        insert_badmouth(target.id, badmouth_text); 
                    },
                    error: function(error) {
                    console.log(error);
                    }
                })
            }
            else {
                insert_badmouth(results[0].id, badmouth_text); 
            }
        },
        error: function(error) {
        console.log(error);
        }
        
    })
    
}

function insert_badmouth(target_id, badmouth_text){
	var Target = Parse.Object.extend("Target");
	var target = new Target();
	target.id = target_id;	

	var Badmouth = Parse.Object.extend("Badmouth");
	var badmouth = new Badmouth();
	badmouth.set("text", badmouth_text);
	badmouth.set("parent", target);

	badmouth.save(null, {
		success: function(badmouth) {
    		target.fetch({
		    	success: function(target) {
		    		target.increment("bmcount");
		    		var relation = target.relation("badmouths");
		    		relation.add(badmouth);
		    		target.save(null, {
						success: function(target) {
						},
						error: function(target, error) {
		    				console.log('Failed to create new object, with error code: ' + error.message);
						}

					});
		    		console.log("here");
				},
				error: function(target, error) {
					console.log(error);
				}
			});
		},
		error: function(badmouth, error) {
    		console.log('Failed to create new object, with error code: ' + error.message);
		}
	});

			

}

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
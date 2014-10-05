Parse.initialize("s32blhuMK0fzjARmluinIoP7GMNCsWXPsREdsFhD", "geSjnD0tu528nZjZHMKPCQ9XB9EbGKCoaUGdXf56");



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
    		alert('New object created with objectId: ' + badmouth.id);
		},
		error: function(badmouth, error) {
    		alert('Failed to create new object, with error code: ' + error.message);
		}
	});

	target.fetch({
    	success: function(target) {
    		target.increment("bmcount");
    		var relation = target.relation("badmouths");
    		relation.add(badmouth);
    		target.save(null, {
				success: function(target) {
    				alert('New object created with objectId: ' + target.id);
				},
				error: function(target, error) {
    				alert('Failed to create new object, with error code: ' + error.message);
				}

			});
    		console.log("here");
		},
		error: function(target, error) {
			console.log(error);
		}
	});

}
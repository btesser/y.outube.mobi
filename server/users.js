var mongo = require('mongodb');

var Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('mean-dev', server);
db.open(function(err, db) {
	if (!err){
		console.log('DB Connected');
		db.collection('users', {strict: true}, function(err, collection){
			if(err) {
				console.log('no user db');
				populateDB();
			}
		});
	}
});
exports.all = function(req,res){
	db.collection('users', function(err, collection){
		collection.find().toArray(function(err, items){
			res.send(items);
		});
	});
};
exports.addUser = function(req,res){
    var wine = req.body;
    console.log('Adding wine: ' + typeof req.body);
	res.send(req.body);
/*    db.collection('wines', function(err, collection) {
        collection.insert(wine, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
*/
};

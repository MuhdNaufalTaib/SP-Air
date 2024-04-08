var db = require('./databaseConfig.js');
var config = require('../config.js');
var jwt = require('jsonwebtoken');

var usersDB = {
	getUser: function (userid, callback) {

		var conn = db.getConnection();
		conn.connect(function (err) {
			if (err) {
				console.log(err);
				return callback(err, null);
			}
			else {
				console.log("***Connected!");

				var sql = `SELECT userid,email,username FROM users WHERE userid = ?`;


				conn.query(sql, [userid], function (err, result) {
					conn.end();
					if (err) {
						console.log(err);
						return callback(err, null);
					} else {
						return callback(null, result);
					}
				});
			}
		});
	},

	loginUser: function (email, password, callback) {

		var conn = db.getConnection();

		conn.connect(function (err) {
			if (err) {
				console.log(err);
				return callback(err, null);
			}
			else {
				console.log("Connected!");

				var sql = 'select * from users where email=? and password=?';

				conn.query(sql, [email, password], function (err, result) {
					conn.end();

					if (err) {
						console.log("Err: " + err);
						return callback(err, null, null);
					} else {
						var token = "";
						var i;
						if (result.length == 1) {

							token = jwt.sign({ id: result[0].userid, role: result[0].role }, config.key, {
								expiresIn: 86400 //expires in 24 hrs
							});
							console.log("@@token " + token);
							return callback(null, token, result);


						} else {
							var err2 = new Error("UserID/Password does not match.");
							err2.statusCode = 500;
							return callback(err2, null, null);
						}
					}  //else
				});
			}
		});
	},

	updateUser: function (username, email, contact, img, callback) {

		var conn = db.getConnection();

		conn.connect(function (err) {
			if (err) {
				console.log(err);
				return callback(err, null);
			} else {
				console.log("Connected!");

				var sql = "UPDATE users SET username=?, contact=?, profile_pic_url=? WHERE email=?";

				conn.query(sql, [username, contact, img, email], function (err, result) {
					conn.end();

					if (err) {
						console.log(err);
						return callback(err, null);
					} else {
						console.log("No. of records updated successfully: " + result.affectedRows);
						return callback(null, result.affectedRows);
					}
				})
			}
		})
	},

	

	getUsers: function (callback) {

		var conn = db.getConnection();
		conn.connect(function (err) {
			if (err) {
				console.log(err);
				return callback(err, null);
			}
			else {
				console.log("***Connected!");

				var sql = 'SELECT userid,username,email FROM users ';
				conn.query(sql, [], function (err, result) {
					conn.end();
					if (err) {
						console.log(err);
						return callback(err, null);
					} else {
						return callback(null, result);
					}
				});
			}
		});
	}

};

module.exports = usersDB;


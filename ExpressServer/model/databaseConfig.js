var mysql = require('mysql');

var dbconnect = {
getConnection: function() {
    var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1qwer$#@!",
    database: "sp_air",
    multipleStatements: true
});
return conn;
}
};

module.exports = dbconnect
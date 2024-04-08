// StudentID    P2129004
// Name:	    Naufal
// Class:		DISM/FT/2A/01 
// Assessment:	CA2
// Script name:	airport.js
//
// ***************** Importing request from databaseConfig ***********
const db=require('./databaseConfig.js');

// ***************** Function for airportDB **********************
const airportDB = {
    
    // Adding of airport (API 5)
    addAirport: function (name, country, description, callback) {
        const conn = db.getConnection()
        conn.connect(function (err){
            //connection fails
            if (err) {
                return callback(err, null)
            }

            //connection successful
            else {
                const sql = `insert into airport (name, country, description) values (?,?,?)`
                //execute the sql statement
                conn.query(sql, [name, country, description], function (err,result) {
                    conn.end()
                    if (err){
                        return callback(err, null)
                    }

                    else {
                        return callback(null, result)
                    }
                })
            }
        })
    },

    // getting Aiport Information (API 6)
    getAirport: function (callback) {
        const conn = db.getConnection()
        conn.connect(function (err){
            //connection fails
            if (err) {
                return callback(err, null)
            }

            //connection successful
            else {
                const sql = 'SELECT * FROM airport'
                //execute the sql statement
                conn.query(sql, function (err,result) {
                    conn.end()
                    if (err){
                        return callback(err, null)
                    }

                    else {
                        return callback(null, result)
                    }
                })
            }
        })
    }, 

    // Adding of airport image (Additional API)
    addAirportImage: function (name, country, description, callback) {
        const conn = db.getConnection()
        conn.connect(function (err){
            //connection fails
            if (err) {
                return callback(err, null)
            }

            //connection successful
            else {
                const sql = `INSERT INTO airport (name, country, description) VALUES (?,?,?)`
                //execute the sql statement
                conn.query(sql, [name, country, description], function (err,result) {
                    conn.end()
                    if (err){
                        return callback(err, null)
                    }

                    else {
                        return callback(null, result)
                    }
                })
            }
        })
    }, 

    // getting of Aiport Images (Additional API)
    getAirportImage: function (airportid, callback) {
        const conn = db.getConnection()
        conn.connect(function (err){
            //connection fails
            if (err) {
                return callback(err, null)
            }

            //connection successful
            else {
                const sql = 'Select airportimage from airport WHERE airportid=?'
                //execute the sql statement
                conn.query(sql, [airportid], function (err,result) {
                    conn.end()
                    if (err){
                        console.log(err)
                        return callback(err, null)
                    }
                    
                    else {
                        return callback(null, result)
                    }
                })
            }
        })
    },
    //getting search api 
    getKeyword: function (searchWord, callback) {
        const conn = db.getConnection()
        conn.connect(function (err){
            //connection fails
            if (err) {
                return callback(err, null)
            }
            //connection successful
            else {
                const sql = `SELECT * from airport where match (country, name) against (? IN BOOLEAN MODE);`
                
                //execute the sql statement
                conn.query(sql,[searchWord], function (err,result) {
                    conn.end()
                    if (err){
                        return callback(err, null)
                    }
                    else {
                        return callback(null, result)
                    }
                })
            }
        })
    }

}

// *************** Exporting file *********************
module.exports = airportDB
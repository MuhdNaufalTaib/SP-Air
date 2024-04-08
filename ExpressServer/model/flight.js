// StudentID:	P2129004
// Name:	    Naufal
// Class:		DISM/FT/2A/01 
// Assessment:	CA2
// Script name:	flight.js
//
// ***************** Importing request from databaseConfig ***********
const db=require('./databaseConfig.js');

// ***************** function for flightDB **************************
const flightDB = {
    
    // Adding of flight (API 7)
    addFlight: function (flightCode, aircraft, originAirport, destinationAirport, embarkDate, travelTime, price, callback){
        const dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }

            else {
                const addFlightQuery = `INSERT INTO flight (flightCode, aircraft, originAirport, destinationAirport, embarkDate, travelTime, price) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`;
                dbConn.query(addFlightQuery , [flightCode, aircraft, originAirport, destinationAirport, embarkDate, travelTime, price],function (err,result) {
                    if (err){
                        return callback(err, null)
                    }

                    const selectQuery = "SELECT flightId FROM flight"
                    dbConn.query(selectQuery, (error, results) => {
                        dbConn.end();
                        if (error) {
                            return callback(error);
                        }
                        return callback(null, results)
                    })
                })
            }
        })
    }, 

    // Getting the flight information (API 8)
    getFlight: function (originAirport, destinationAirport, embarkDate, callback) {
        const conn = db.getConnection()
        conn.connect(function (err){
            //connection fails
            if (err) {
                return callback(err, null)
            }
            
            //connection successful
            else {
                const sql = `
                SELECT f.flightid, f.flightCode, f.aircraft, (select name from airport where airportid = f.originAirport) as originAirport,(select name from airport where airportid = f.destinationAirport) AS destinationAirport,(select country airport where airportid = f.originAirport) as originCountry, (select country from airport where airportid = f.destinationAirport) AS destinationCountry, f.embarkDate, f.travelTime, (convert((f.price ),char)) as price
                FROM flight f, airport a
                WHERE (f.originAirport=? AND f.destinationAirport=?) AND  f.originAirport = a.airportid AND CAST(f.embarkDate AS DATE) = ?`
                //execute the sql statement
                conn.query(sql, [originAirport,destinationAirport,embarkDate],  function (err,result) {
                    conn.end()
                    if (err) {
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

    // Deletion of flights (API 10)
    deleteFlight: function (flightId, callback) {
        var conn = db.getConnection()
        conn.connect(function (err) {
            if (err) {
                return callback(err,null)
            }

            else {    
                var sql = 'Delete from flight where flightId=?';
                conn.query(sql, [flightId], function (err, result) {
                    conn.end();      
                    if (err) {
                        return callback(err,null);            
                    }
                    
                    else {
                        return callback(null,result.affectedRows);
                    }
                })
            }        
        })
    }
 
}

// *************** Exporting file *********************
module.exports = flightDB
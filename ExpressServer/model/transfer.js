// StudentID:	P2129004
// Name:	    Naufal
// Class:		DISM/FT/2A/01 
// Assessment:	CA2
// Script name:	transfer.js
//
// ***************** Importing request from databaseConfig ***********
const db=require('./databaseConfig');

// ***************** function for transferDB **************************
const transferDB = {

    // Getting the booking of transfer flight (API 11)
    getTransfer: function (originAirport, destinationAirport, destinationAirports, originAirports, embarkDate, callback) {
        const conn = db.getConnection()
        conn.connect(function (err){
            //connection fails
            if (err) {
                return callback(err, null)
            }
            //connection successful
            else {
                const sql = 
               `CREATE TEMPORARY TABLE IF NOT EXISTS flight1 (flightId INT NOT NULL, flightCode VARCHAR(45) NOT NULL, aircraft VARCHAR(45) NOT NULL, originAirport VARCHAR(45) NOT NULL, destinationAirport VARCHAR(45) NOT NULL, embarkDate datetime NOT NULL, price DECIMAL(10,2) NOT NULL);
                INSERT INTO flight1 SELECT f.flightId, f.flightCode, f.aircraft, f.originAirport, f.destinationAirport, f.embarkDate, f.price FROM flight f WHERE f.originAirport = ? and f.destinationAirport != ?;
                CREATE TEMPORARY TABLE IF NOT EXISTS flight2 (flightId INT NOT NULL, flightCode VARCHAR(45) NOT NULL, aircraft VARCHAR(45) NOT NULL, originAirport VARCHAR(45) NOT NULL, destinationAirport VARCHAR(45) NOT NULL, embarkDate datetime NOT NULL, price DECIMAL(10,2) NOT NULL);
                INSERT INTO flight2 SELECT f.flightId, f.flightCode, f.aircraft, f.originAirport, f.destinationAirport, f.embarkDate, f.price FROM flight f WHERE f.destinationAirport = ? and f.originAirport != ?;
                SELECT f1.flightId AS firstFlightId, f2.flightId AS secondFlightId, f1.flightCode AS flightCode1, f2.flightCode AS flightCode2, f1.aircraft AS aircraft1, f2.aircraft AS aircraft2, (SELECT name FROM airport WHERE airportid = f1.originAirport) AS originAirport, (SELECT name FROM airport WHERE airportid = f2.originAirport) AS transferAirport, (SELECT name FROM airport WHERE airportid = f2.destinationAirport) AS destinationAirport , f1.embarkDate AS embarkDate, convert((f1.price+f2.price),char) AS totalPrice FROM flight1 f1, flight2 f2 WHERE f1.destinationAirport = f2.originAirport AND CAST(f1.embarkDate AS DATE) = ? AND f1.embarkDate < f2.embarkDate;`
                //execute the sql statement
                conn.query(sql, [originAirport, destinationAirport, destinationAirports, originAirports, embarkDate], function (err,result) {
                    conn.end()
                    if (err) {
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
module.exports = transferDB
// StudentID:	P2129004
// Name:	    Naufal
// Class:		DISM/FT/2A/01 
// Assessment:	CA2
// Script name:	promotion.js
//
// ***************** Importing request from databaseConfig ***********
const db=require('./databaseConfig');

// ***************** function for bookingDB **************************
const promotionDB = {

    // Adding of a promotion (Additional API)
    addPromotion: function (name, startDate, endDate, discount, description, callback){
        const dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                return callback(err, null);
            }

            else {
                const addPromotionQuery = `INSERT INTO promotion (name, startDate, endDate, discount, description) 
                VALUES (?, ?, ?, ?, ?)`;
                dbConn.query(addPromotionQuery , [name, startDate, endDate, discount, description], function (err,result) {
                    if (err) {
                        return callback(err, null)
                    }

                    const selectQuery = "SELECT promotionid FROM promotion"
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

    // Getting of a promotion (Additional API)
    getPromotions: function (callback) {
        const conn = db.getConnection()
        conn.connect(function (err){
            //connection fails
            if (err) {
                return callback(err, null)
            }

            //connection successful
            else {
                const sql = 'Select name, startDate, endDate, discount, description from promotion'
                //execute the sql statement
                conn.query(sql, function (err,result) {
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
    },

    // Getting a singular promotion information (Additional API)
    getPromotion: function (promotionid, callback) {
        const conn = db.getConnection()
        conn.connect(function (err){
            //connection fails
            if (err) {
                return callback(err, null)
            }
            //connection successful
            else {
                const sql = 'Select name, startDate, endDate, discount, description from promotion where promotionid=?'
                //execute the sql statement
                conn.query(sql, [promotionid], function (err,result) {
                    //close execution 
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

    // Deleting a promotion information (Additional API)
    deletePromotion: function (promotionid, callback) {
        var conn = db.getConnection()
        conn.connect(function (err) {
            if (err) {
                return callback(err,null)
            }
            else {    
                var sql = 'Delete from promotion where promotionid=?';
                conn.query(sql, [promotionid], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err);
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
module.exports = promotionDB
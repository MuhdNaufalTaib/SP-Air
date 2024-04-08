var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var user = require('../model/users.js');
var flight = require('../model/flight.js');
var verifyFN = require('../auth/verifyToken.js');
var airport = require('../model/airport.js');
var promotion = require('../model/promotion.js')
var transfer = require('../model/transfer.js');
var cors = require('cors');

app.options('*',cors());
app.use(cors());
var urlencodedParser=bodyParser.urlencoded({extended:false});


app.use(bodyParser.json());
app.use(urlencodedParser);

// Importing path
var path = require('path')

// ****************************** Using Multer **************************************
// Requiring Multer
const multer = require('multer') 

// Using Storage as multer requires a storage

// app.use('/static', express.static('C:/Users/Naufal/Desktop/DISM Year 2 Sem 1/BED/Bed-trial/'))
// app.use(express.static('C:/Users/Naufal/Desktop/DISM Year 2 Sem 1/BED/Bed-trial/frontend'))
var storage = multer.diskStorage({
    destination: function(req,file,cb){
      cb(null,'public/image')
    },
    filename:function(req,file,cb){
        
        cb(null, new Date().toISOString().replace(/:/g, "-")+'--' +file.originalname) 
    }
  })

var upload = multer({ 
    //multer settings and to limit the file size and only accepting jpg and png
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    },
    limits:{
        fileSize: 1000000
    }
})



app.post('/users', function(req,res){
	var username = req.body.username;
	var email = req.body.email;
	var role = req.body.role;
    var contact = req.body.contact;
    var img = req.body.profile_pic_url
	
	
	user.addUser(username,email,role,contact,img, function(err,result){
		if(!err){
			console.log("Post successful");
			res.statusCode = 200;
  			
  			
		}else{
			res.status(500);
			res.send(err.statuscode);
		}
	})
}); 

app.get('/user/:userid',function(req, res){
    var id = req.params.userid;

    user.getUser(id, function(err, result){
        if(!err){
            res.send(result);
        }else{
            res.status(500).send("Some error");
        }
    });
}); 

app.post('/users/login',function(req, res){
    var email=req.body.email;
    var password = req.body.password;

    user.loginUser(email, password, function(err, token, result){
        if(!err){
			res.statusCode = 200;
			  res.setHeader('Content-Type', 'application/json');
			  delete result[0]['password'];//clear the password in json data, do not send back to client
			//   console.log(result);
			res.json({success: true, UserData: JSON.stringify(result), token:token, status: 'You are successfully logged in!'}); 
			res.send();
		}else{
            res.status(500);
            res.send(err.statusCode);
        }
    }); 
}); 


app.post('/user/logout', function(req,res){
	console.log("..logging out.");
	//res.clearCookie('session-id'); //clears the cookie in the response
	//res.setHeader('Content-Type', 'application/json');
  	res.json({success: true, status: 'Log out successful!'});

});



app.put('/user',verifyFN.verifyToken, function(req,res){
	var username = req.body.username;
	var email = req.body.email;
	
    var contact = req.body.contact;
    var img = req.body.profile_pic_url
	
	
	user.updateUser(username,email,contact,img, function(err,result){
		if(!err){
			console.log("Update successful");
			res.statusCode = 200;
  			res.setHeader('Content-Type', 'application/json');
  			res.json({success: true, result: result, status: 'Record updated successfully!'});
		}else{
			res.status(500);
			res.send(err.statuscode);
		}
	})
}); 


app.post('/user',function(req,res){
	
	var username = req.body.username;
	var email = req.body.email;
	var role = req.body.role;
	var password = req.body.password;
	var pic = req.body.pic;
	
	user.addUser(username,email,role,password,pic,function(err,result){
	if(!err){
		res.status(200);
		res.send(result);
	}else{
		res.status(500);
		res.send("{\"message\":\"Some error!\"}");
	}
	});
});

app.get('/user',function(req, res){

    user.getUsers(function(err, result){
        if(!err){
            res.send(result);
        }else{
            res.status(500).send(null);
        }
    });
}); 

// API 7
// app.post('/flight/', function (req, res){

//     const flightCode = req.body.flightCode
//     const aircraft = req.body.aircraft
//     const originAirport = req.body.originAirport
//     const destinationAirport = req.body.destinationAirport
//     const embarkDate = req.body.embarkDate
//     const travelTime = req.body.travelTime
//     const price = req.body.price

//     flight.addFlight(flightCode, aircraft, originAirport, destinationAirport,embarkDate,travelTime, price, function(err,result){
//         if (!err){
//             res.status(201).send(result[result.length - 1])
//         }
//         else{
//             res.status(500).send(err)
//         }
//     })
// })


// API 8
app.get('/flightDirect/:originAirport/:destinationAirport/:embarkDate', function(req, res) {

    const originAirport = req.params.originAirport;
    const destinationAirport = req.params.destinationAirport;
	const embarkDate = req.params.embarkDate;

    flight.getFlight(originAirport,destinationAirport, embarkDate, function(err, result) {
        if (result.length == 0) {
            res.status(500).send() 
        }
        else if (!err) {
            res.status(200).send(result); //to get the whole line
        }
        else{
            res.status(500).send();
        }
    })
})


app.get('/airport',function(req, res){

    airport.getAirport(function(err, result){
        if(!err){
            res.send(result);
         
        }else{
            res.status(500).send(null);
        }
    });
}); 


//get airport image
app.get('/airport/:airportid/images', function (req, res) {

    const airportid = req.params.airportid;

    airport.getAirportImage(airportid, function (err, result) {
        if (!err) {
            res.status(200).sendFile(result[0].airportimage,{root:'public/image'})
        }
        else{
            res.status(500).send(err);
        }
    })
});


// API 5
app.post('/airport/',verifyFN.verifyToken,verifyFN.verifyAdmin, function (req, res) {

    const name = req.body.name;
    const country = req.body.country;
    const description = req.body.description;
    
    airport.addAirport(name, country, description, function (err, result) {
        if (!err) {
            res.status(204).send()
        }
        else {
            if (err.code=='ER_DUP_ENTRY') {
                res.status(422).send()
            }
            else {
                res.status(500).send()
            }
        }
    })
})


// API 7
app.post('/flight/',verifyFN.verifyToken,verifyFN.verifyAdmin, function (req, res){

    const flightCode = req.body.flightCode
    const aircraft = req.body.aircraft
    const originAirport = req.body.originAirport
    const destinationAirport = req.body.destinationAirport
    const embarkDate = req.body.embarkDate
    const travelTime = req.body.travelTime
    const price = req.body.price

    flight.addFlight(flightCode, aircraft, originAirport, destinationAirport,embarkDate,travelTime, price, function(err,result){
        if (!err){
            res.status(201).send(result[result.length - 1])
        }
        else{
            res.status(500).send(err)
        }
    })
})


// Additional API
// Adding of images of the airport
// app.post('/airport/', function (req, res) {

//     const name = req.body.name;
//     const country = req.body.country;
//     const description = req.body.description;
//     const images = req.body.airportimage;
    
//     airport.addAirportImage(name, country, description, images, function (err, result) {
//         if (!err) {
//             res.status(201).send()
//         }
//         else {
//             console.log(err)
//             if (err.code=='ER_DUP_ENTRY') {
//                 res.status(422).send()
//             }
//             else {
//                 res.status(500).send(err)
//             }
//         }
//     })
// })

// Additional API (Promotion)
// Adding of promotion
app.post('/promotion/',verifyFN.verifyToken,verifyFN.verifyAdmin, function (req, res) {

    const name = req.body.name
    const startDate = req.body.startDate
    const endDate = req.body.endDate;
    const discount = req.body.discount;
    const description = req.body.description;
    
    promotion.addPromotion(name, startDate, endDate, discount, description,  function (err, result) {
        if (!err) {
            res.status(201).send(JSON.stringify(result[result.length - 1]))
        }    
        else{
            res.status(500).send();
        }
    })
});


// Getting promotion details
app.get('/promotion/', function (req, res) {
    promotion.getPromotions(function (err, result) {
        if (!err) {
            res.status(200).send(result);
        }
        else{
            console.log(result);
            res.status(500).send();
        }
    })
});


//Getting specific promotion details
app.get('/promotion/:promotionid', function(req, res) {

    const promotionid = req.params.promotionid
    
    promotion.getPromotion(promotionid, function(err, result) {
        if (!err) {
            res.status(200).send(result)
        }
        else {
            res.status(500).send()
        }
    })
})


// Deletion of the promotion
app.delete('/promotion/:promotionid', function (req, res) {

    var promotionid = req.params.promotionid

    promotion.deletePromotion(promotionid, function (err, result) {
        if (!err) {
            res.status(200).send('{"Message":"Deletion successful"}');
        }
        else{
            res.status(500).send();
        }
    })
})


// API 11
app.get('/transfer/flight/:originAirport/:destinationAirport/:embarkDate', function (req, res) {

    const originAirport = req.params.originAirport
    const destinationAirport = req.params.destinationAirport
    const originAirports = req.params.originAirport
    const destinationAirports = req.params.destinationAirport
    const embarkDate = req.params.embarkDate

    transfer.getTransfer(originAirport, destinationAirport, destinationAirports, originAirports, embarkDate, function (err, result) {
        if (result[4].length == 0) {
            res.status(500).send() 
        }
        else 
        if (!err) {
            console.log(result)
            res.status(201).send(result[4])
        }
        else{
            console.log(err)
            res.status(500).send(err);
        }
    
    })
});

module.exports = app;


// controllers/hotels.js





const {conn} = require('../db.js');
const mysql = require('mysql2');


const axios=require('axios');

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
// gethotels


const gethotels = (req,res)=> {

console.log("gethotels() called");
 try{
 conn.query("Select * from hotels" ,(err , results) =>    { 
if(err)
 console.error("Failed to get hotels",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the hotels",err);
 res.status(500).send({error:err});
}
};
// gethotelsBy


// gethotelsBy


const gethotelsBy = (req,res)=> {

console.log("gethotels() called");
 try{
 conn.query("Select * from hotels where hotelID = ?" ,[req.params.id] ,(err , results) =>    { 
//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
if(err)
 console.error("Failed to get hotels",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the hotels",err);
 res.status(500).send({error:err});
}
};
// gethotelsLike


const gethotelsLike = (req,res)=> {

console.log("gethotels() called");
 try{
 conn.query("Select * from hotels where  cafe like ? or checkIn like ? or checkOut like ? or city like ? or hotelDesc like ? or hotelID like ? or hotelName like ? or laundry like ? or locality like ? or mainImage like ? or parking like ? or rating like ? or restaurant like ? or swimmingPool like ? wifi like ?",[`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`],(err , results) =>    { 
if(err)
 console.error("Failed to get hotels",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the hotels",err);
 res.status(500).send({error:err});
}
};
// applyFilterSearchhotels


const applyFilterSearchhotels = (req,res)=> {

console.log("applyFilterSearchhotels() called");
console.log("params received is",req.query);

const { id ,hotelID,wifi }= req.query;

let checkFields =[];
let checkValues=[];

checkFields.push("true");
 
const query =`Select * from hotels where ${checkFields.join(" and ")} and (cafe like ?  or checkIn like ?  or checkOut like ?  or city like ?  or hotelDesc like ?  or hotelName like ?  or laundry like ?  or locality like ?  or parking like ?  or rating like ?  or restaurant like ?  or swimmingPool like ? wifi like ?
)` 
checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);
 try{
 conn.query(query, checkValues,(err , results) =>    { 
if(err)
 console.error("Failed to applyFilterSearchhotels",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the applyFilterSearchhotels",err);
 res.status(500).send({error:err});
}
};


// addhotels


//hotelsid might not be auto generate in that case you need to manually insert hotelsId or hotelsID

const addhotels= (req ,res) => {
if(!conn)
 console.log("conn not properly linked to routes");
 console.log("addhotels Called");
//hotelsid might not be auto generate in that case you need to manually insert hotelsId or hotelsID

const {cafe,checkIn,checkOut,city,hotelDesc,hotelID,hotelName,laundry,locality,mainImage,parking,price,rating,restaurant,roomsAvailable,stars,swimmingPool,wifi}=req.body;console.log(req.body);
    conn.query("Insert into hotels(cafe ,checkIn ,checkOut ,city ,hotelDesc ,hotelID ,hotelName ,laundry ,locality ,mainImage ,parking ,price ,rating ,restaurant ,roomsAvailable ,stars ,swimmingPool ,wifi) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [cafe,checkIn,checkOut,city,hotelDesc,hotelID,hotelName,laundry,locality,mainImage,parking,price,rating,restaurant,roomsAvailable,stars,swimmingPool,wifi], (err , result) =>
 {
 if(err)
 console.error("Failed to add hotels");
else
{console.log("Successfully created hotels");

res.status(201).json(result);
 }
});
};

// deletehotels


const deletehotels= async (req , res)=>{
console.log("deletehotels() called");
if(!conn)
console.error("conn was not routed properly");
 console.log("deletehotels called");

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query("Delete from hotels where hotelID =?",[req.params.id], (err, result)=>
{
if(!err)
res.status(200).send("User deleted successfully");
else
{

console.error("An error occured", err);
}
});
};

// updatehotels




const updatehotels =async (req , res) => { 
console.log("updatehotels() called");
if(!conn)
 console.error("conn not linked to routes"); 

const hotelsId= req.params.id

const {
cafecheckIncheckOutcityhotelDeschotelIDhotelNamelaundrylocalitymainImageparkingpriceratingrestaurantroomsAvailablestarsswimmingPoolwifi}= req.body;

if(!hotelsId||isNaN(hotelsId))
{
console.error("Invalid hotelsId sent");
 res.status(404).send("Invalid hotelsId");
}
let updateFields= [];
 let updateValues=[];

if(checkIn){

updateFields.push('checkIn=?');
updateValues.push(checkIn);
}
if(checkOut){

updateFields.push('checkOut=?');
updateValues.push(checkOut);
}
if(city){

updateFields.push('city=?');
updateValues.push(city);
}
if(hotelDesc){

updateFields.push('hotelDesc=?');
updateValues.push(hotelDesc);
}
if(hotelID){

updateFields.push('hotelID=?');
updateValues.push(hotelID);
}
if(hotelName){

updateFields.push('hotelName=?');
updateValues.push(hotelName);
}
if(laundry){

updateFields.push('laundry=?');
updateValues.push(laundry);
}
if(locality){

updateFields.push('locality=?');
updateValues.push(locality);
}
if(mainImage){

updateFields.push('mainImage=?');
updateValues.push(mainImage);
}
if(parking){

updateFields.push('parking=?');
updateValues.push(parking);
}
if(price){

updateFields.push('price=?');
updateValues.push(price);
}
if(rating){

updateFields.push('rating=?');
updateValues.push(rating);
}
if(restaurant){

updateFields.push('restaurant=?');
updateValues.push(restaurant);
}
if(roomsAvailable){

updateFields.push('roomsAvailable=?');
updateValues.push(roomsAvailable);
}
if(stars){

updateFields.push('stars=?');
updateValues.push(stars);
}
if(swimmingPool){

updateFields.push('swimmingPool=?');
updateValues.push(swimmingPool);
}
if(wifi){

updateFields.push('wifi=?');
updateValues.push(wifi);
}
updateValues.push(cafe)
if(updateFields.length==0)
 console.error("NO field value specified for update")

const query  = `update hotels set ${userFields.join(',')} where hotelID= '?'`;
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query( query , updateValues, (err , result)=>{
if(err)
 {console.error("Failed to update hotels");
 res.status(400).send("An error occured", err);
}
res.status(200).send(result);
 });
 } 

module.exports={gethotels ,addhotels ,deletehotels , updatehotels ,gethotelsBy, gethotelsLike ,applyFilterSearchhotels};



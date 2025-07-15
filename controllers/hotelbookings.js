

// controllers/hotelbookings.js





const {conn} = require('../db.js');
const mysql = require('mysql2');


const axios=require('axios');

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
// gethotelbookings


const gethotelbookings = (req,res)=> {

console.log("gethotelbookings() called");
 try{
 conn.query("Select * from hotelbookings" ,(err , results) =>    { 
if(err)
 console.error("Failed to get hotelbookings",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the hotelbookings",err);
 res.status(500).send({error:err});
}
};
// gethotelbookingsBy


// gethotelbookingsBy


const gethotelbookingsBy = (req,res)=> {

console.log("gethotelbookings() called");
 try{
 conn.query("Select * from hotelbookings where bookingID = ?" ,[req.params.id] ,(err , results) =>    { 
//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
if(err)
 console.error("Failed to get hotelbookings",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the hotelbookings",err);
 res.status(500).send({error:err});
}
};
// gethotelbookingsLike


const gethotelbookingsLike = (req,res)=> {

console.log("gethotelbookings() called");
 try{
 conn.query("Select * from hotelbookings where  hotelID like ? username like ?",[`${req.params.id}%`],(err , results) =>    { 
if(err)
 console.error("Failed to get hotelbookings",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the hotelbookings",err);
 res.status(500).send({error:err});
}
};
// applyFilterSearchhotelbookings


const applyFilterSearchhotelbookings = (req,res)=> {

console.log("applyFilterSearchhotelbookings() called");
console.log("params received is",req.query);

const { id ,bookingID,cancelled,hotelID,paymentStatus,username }= req.query;

let checkFields =[];
let checkValues=[];

checkFields.push("true");
 
if(cancelled)
{checkFields.push(`cancelled = ?`);
 checkValues.push(`${cancelled}` );
}
if(paymentStatus)
{checkFields.push(`paymentStatus = ?`);
 checkValues.push(`${paymentStatus}` );
}
const query =`Select * from hotelbookings where ${checkFields.join(" and ")} and (username like ? ` 
checkValues.push(`${req.query.id}%`);


 try{
 conn.query(query, checkValues,(err , results) =>    { 
if(err)
 console.error("Failed to applyFilterSearchhotelbookings",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the applyFilterSearchhotelbookings",err);
 res.status(500).send({error:err});
}
};


// addhotelbookings


//hotelbookingsid might not be auto generate in that case you need to manually insert hotelbookingsId or hotelbookingsID

const addhotelbookings= (req ,res) => {
if(!conn)
 console.log("conn not properly linked to routes");
 console.log("addhotelbookings Called");
//hotelbookingsid might not be auto generate in that case you need to manually insert hotelbookingsId or hotelbookingsID

const {cancelled,checkIn,checkOut,date,guests,hotelID,notes,paymentStatus,totalCost,username}=req.body;console.log(req.body);
    conn.query("Insert into hotelbookings(cancelled ,checkIn ,checkOut ,date ,guests ,hotelID ,notes ,paymentStatus ,totalCost ,username) values (?,?,?,?,?,?,?,?,?,?)", [cancelled,checkIn,checkOut,date,guests,hotelID,notes,paymentStatus,totalCost,username], (err , result) =>
 {
 if(err)
 console.error("Failed to add hotelbookings");
else
{console.log("Successfully created hotelbookings");

res.status(201).json(result);
 }
});
};

// deletehotelbookings


const deletehotelbookings= async (req , res)=>{
console.log("deletehotelbookings() called");
if(!conn)
console.error("conn was not routed properly");
 console.log("deletehotelbookings called");

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query("Delete from hotelbookings where bookingID =?",[req.params.id], (err, result)=>
{
if(!err)
res.status(200).send("User deleted successfully");
else
{

console.error("An error occured", err);
}
});
};

// updatehotelbookings




const updatehotelbookings =async (req , res) => { 
console.log("updatehotelbookings() called");
if(!conn)
 console.error("conn not linked to routes"); 

const hotelbookingsId= req.params.id

const {
bookingIDbookingTimecancelledcheckIncheckOutdateguestshotelIDnotespaymentStatustotalCostusername}= req.body;

if(!hotelbookingsId||isNaN(hotelbookingsId))
{
console.error("Invalid hotelbookingsId sent");
 res.status(404).send("Invalid hotelbookingsId");
}
let updateFields= [];
 let updateValues=[];

if(bookingTime){

updateFields.push('bookingTime=?');
updateValues.push(bookingTime);
}
if(cancelled){

updateFields.push('cancelled=?');
updateValues.push(cancelled);
}
if(checkIn){

updateFields.push('checkIn=?');
updateValues.push(checkIn);
}
if(checkOut){

updateFields.push('checkOut=?');
updateValues.push(checkOut);
}
if(date){

updateFields.push('date=?');
updateValues.push(date);
}
if(guests){

updateFields.push('guests=?');
updateValues.push(guests);
}
if(hotelID){

updateFields.push('hotelID=?');
updateValues.push(hotelID);
}
if(notes){

updateFields.push('notes=?');
updateValues.push(notes);
}
if(paymentStatus){

updateFields.push('paymentStatus=?');
updateValues.push(paymentStatus);
}
if(totalCost){

updateFields.push('totalCost=?');
updateValues.push(totalCost);
}
if(username){

updateFields.push('username=?');
updateValues.push(username);
}
updateValues.push(bookingID)
if(updateFields.length==0)
 console.error("NO field value specified for update")

const query  = `update hotelbookings set ${userFields.join(',')} where bookingID= '?'`;
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query( query , updateValues, (err , result)=>{
if(err)
 {console.error("Failed to update hotelbookings");
 res.status(400).send("An error occured", err);
}
res.status(200).send(result);
 });
 } 

module.exports={gethotelbookings ,addhotelbookings ,deletehotelbookings , updatehotelbookings ,gethotelbookingsBy, gethotelbookingsLike ,applyFilterSearchhotelbookings};



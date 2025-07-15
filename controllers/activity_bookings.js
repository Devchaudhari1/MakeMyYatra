

// controllers/activity_bookings.js





const {conn} = require('../db.js');
const mysql = require('mysql2');


const axios=require('axios');

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
// getactivity_bookings


const getactivity_bookings = (req,res)=> {

console.log("getactivity_bookings() called");
 try{
 conn.query("Select * from activity_bookings" ,(err , results) =>    { 
if(err)
 console.error("Failed to get activity_bookings",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the activity_bookings",err);
 res.status(500).send({error:err});
}
};
// getactivity_bookingsBy


// getactivity_bookingsBy


const getactivity_bookingsBy = (req,res)=> {

console.log("getactivity_bookings() called");
 try{
 conn.query("Select * from activity_bookings where BookingID = ?" ,[req.params.id] ,(err , results) =>    { 
//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
if(err)
 console.error("Failed to get activity_bookings",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the activity_bookings",err);
 res.status(500).send({error:err});
}
};
// getactivity_bookingsLike


const getactivity_bookingsLike = (req,res)=> {

console.log("getactivity_bookings() called");
 try{
 conn.query("Select * from activity_bookings where ",[`${req.params.id}%`],(err , results) =>    { 
if(err)
 console.error("Failed to get activity_bookings",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the activity_bookings",err);
 res.status(500).send({error:err});
}
};
// applyFilterSearchactivity_bookings


const applyFilterSearchactivity_bookings = (req,res)=> {

console.log("applyFilterSearchactivity_bookings() called");
console.log("params received is",req.query);

const { id ,BookingID,UserID,ActivityID,PaymentStatus,PaymentID,Notes }= req.query;

let checkFields =[];
let checkValues=[];

checkFields.push("true");
 
if(PaymentStatus)
{checkFields.push(`PaymentStatus = ?`);
 checkValues.push(`${PaymentStatus}` );
}
const query =`Select * from activity_bookings where ${checkFields.join(" and ")} `  ;
try{
 conn.query(query, checkValues,(err , results) =>    { 
if(err)
 console.error("Failed to applyFilterSearchactivity_bookings",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the applyFilterSearchactivity_bookings",err);
 res.status(500).send({error:err});
}
};


// addactivity_bookings


//activity_bookingsid might not be auto generate in that case you need to manually insert activity_bookingsId or activity_bookingsID

const addactivity_bookings= (req ,res) => {
if(!conn)
 console.log("conn not properly linked to routes");
 console.log("addactivity_bookings Called");
//activity_bookingsid might not be auto generate in that case you need to manually insert activity_bookingsId or activity_bookingsID

const {UserID,ActivityID,NumberOfParticipants,TotalPrice,PaymentStatus,PaymentID,Notes}=req.body;console.log(req.body);
    conn.query("Insert into activity_bookings(UserID ,ActivityID ,NumberOfParticipants ,TotalPrice ,PaymentStatus ,PaymentID ,Notes) values (?,?,?,?,?,?,?)", [UserID,ActivityID,NumberOfParticipants,TotalPrice,PaymentStatus,PaymentID,Notes], (err , result) =>
 {
 if(err)
 console.error("Failed to add activity_bookings");
else
{console.log("Successfully created activity_bookings");

res.status(201).json(result);
 }
});
};

// deleteactivity_bookings


const deleteactivity_bookings= async (req , res)=>{
console.log("deleteactivity_bookings() called");
if(!conn)
console.error("conn was not routed properly");
 console.log("deleteactivity_bookings called");

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query("Delete from activity_bookings where BookingID =?",[req.params.id], (err, result)=>
{
if(!err)
res.status(200).send("User deleted successfully");
else
{

console.error("An error occured", err);
}
});
};

// updateactivity_bookings




const updateactivity_bookings =async (req , res) => { 
console.log("updateactivity_bookings() called");
if(!conn)
 console.error("conn not linked to routes"); 

const activity_bookingsId= req.params.id

const {
BookingIDUserIDActivityIDBookingDateNumberOfParticipantsTotalPricePaymentStatusPaymentIDNotes}= req.body;

if(!activity_bookingsId||isNaN(activity_bookingsId))
{
console.error("Invalid activity_bookingsId sent");
 res.status(404).send("Invalid activity_bookingsId");
}
let updateFields= [];
 let updateValues=[];

if(UserID){

updateFields.push('UserID=?');
updateValues.push(UserID);
}
if(ActivityID){

updateFields.push('ActivityID=?');
updateValues.push(ActivityID);
}
if(BookingDate){

updateFields.push('BookingDate=?');
updateValues.push(BookingDate);
}
if(NumberOfParticipants){

updateFields.push('NumberOfParticipants=?');
updateValues.push(NumberOfParticipants);
}
if(TotalPrice){

updateFields.push('TotalPrice=?');
updateValues.push(TotalPrice);
}
if(PaymentStatus){

updateFields.push('PaymentStatus=?');
updateValues.push(PaymentStatus);
}
if(PaymentID){

updateFields.push('PaymentID=?');
updateValues.push(PaymentID);
}
if(Notes){

updateFields.push('Notes=?');
updateValues.push(Notes);
}
updateValues.push(BookingID)
if(updateFields.length==0)
 console.error("NO field value specified for update")

const query  = `update activity_bookings set ${userFields.join(',')} where BookingID= '?'`;
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query( query , updateValues, (err , result)=>{
if(err)
 {console.error("Failed to update activity_bookings");
 res.status(400).send("An error occured", err);
}
res.status(200).send(result);
 });
 } 

module.exports={getactivity_bookings ,addactivity_bookings ,deleteactivity_bookings , updateactivity_bookings ,getactivity_bookingsBy, getactivity_bookingsLike ,applyFilterSearchactivity_bookings};



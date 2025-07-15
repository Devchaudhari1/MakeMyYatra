

// controllers/flightbookings.js





const {conn} = require('../db.js');
const mysql = require('mysql2');


const axios=require('axios');

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
// getflightbookings


const getflightbookings = (req,res)=> {

console.log("getflightbookings() called");
 try{
 conn.query("Select * from flightbookings" ,(err , results) =>    { 
if(err)
 console.error("Failed to get flightbookings",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the flightbookings",err);
 res.status(500).send({error:err});
}
};
// getflightbookingsBy


// getflightbookingsBy


const getflightbookingsBy = (req,res)=> {

console.log("getflightbookings() called");
 try{
 conn.query("Select * from flightbookings where bookingID = ?" ,[req.params.id] ,(err , results) =>    { 
//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
if(err)
 console.error("Failed to get flightbookings",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the flightbookings",err);
 res.status(500).send({error:err});
}
};
// getflightbookingsLike


const getflightbookingsLike = (req,res)=> {

console.log("getflightbookings() called");
 try{
 conn.query("Select * from flightbookings where  destination like ? or flightNumber like ? or origin like ? username like ?",[`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`],(err , results) =>    { 
if(err)
 console.error("Failed to get flightbookings",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the flightbookings",err);
 res.status(500).send({error:err});
}
};
// applyFilterSearchflightbookings


const applyFilterSearchflightbookings = (req,res)=> {

console.log("applyFilterSearchflightbookings() called");
console.log("params received is",req.query);

const { id ,bookingID,cancelled,paymentStatus,status,type,username }= req.query;

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
if(status)
{checkFields.push(`status = ?`);
 checkValues.push(`${status}` );
}
if(type)
{checkFields.push(`type = ?`);
 checkValues.push(`${type}` );
}
const query =`Select * from flightbookings where ${checkFields.join(" and ")} and (destination like ?  or flightNumber like ?  or origin like ? username like ?
)` 
checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);


 try{
 conn.query(query, checkValues,(err , results) =>    { 
if(err)
 console.error("Failed to applyFilterSearchflightbookings",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the applyFilterSearchflightbookings",err);
 res.status(500).send({error:err});
}
};


// addflightbookings


//flightbookingsid might not be auto generate in that case you need to manually insert flightbookingsId or flightbookingsID

const addflightbookings= (req ,res) => {
if(!conn)
 console.log("conn not properly linked to routes");
 console.log("addflightbookings Called");
//flightbookingsid might not be auto generate in that case you need to manually insert flightbookingsId or flightbookingsID

const {cancelled,date,destination,flightNumber,origin,passengers,paymentStatus,status,type,username}=req.body;console.log(req.body);
    conn.query("Insert into flightbookings(cancelled ,date ,destination ,flightNumber ,origin ,passengers ,paymentStatus ,status ,type ,username) values (?,?,?,?,?,?,?,?,?,?)", [cancelled,date,destination,flightNumber,origin,passengers,paymentStatus,status,type,username], (err , result) =>
 {
 if(err)
 console.error("Failed to add flightbookings");
else
{console.log("Successfully created flightbookings");

res.status(201).json(result);
 }
});
};

// deleteflightbookings


const deleteflightbookings= async (req , res)=>{
console.log("deleteflightbookings() called");
if(!conn)
console.error("conn was not routed properly");
 console.log("deleteflightbookings called");

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query("Delete from flightbookings where bookingID =?",[req.params.id], (err, result)=>
{
if(!err)
res.status(200).send("User deleted successfully");
else
{

console.error("An error occured", err);
}
});
};

// updateflightbookings




const updateflightbookings =async (req , res) => { 
console.log("updateflightbookings() called");
if(!conn)
 console.error("conn not linked to routes"); 

const flightbookingsId= req.params.id

const {
bookingIDbookingTimecancelleddatedestinationflightNumberoriginpassengerspaymentStatusstatustypeusername}= req.body;

if(!flightbookingsId||isNaN(flightbookingsId))
{
console.error("Invalid flightbookingsId sent");
 res.status(404).send("Invalid flightbookingsId");
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
if(date){

updateFields.push('date=?');
updateValues.push(date);
}
if(destination){

updateFields.push('destination=?');
updateValues.push(destination);
}
if(flightNumber){

updateFields.push('flightNumber=?');
updateValues.push(flightNumber);
}
if(origin){

updateFields.push('origin=?');
updateValues.push(origin);
}
if(passengers){

updateFields.push('passengers=?');
updateValues.push(passengers);
}
if(paymentStatus){

updateFields.push('paymentStatus=?');
updateValues.push(paymentStatus);
}
if(status){

updateFields.push('status=?');
updateValues.push(status);
}
if(type){

updateFields.push('type=?');
updateValues.push(type);
}
if(username){

updateFields.push('username=?');
updateValues.push(username);
}
updateValues.push(bookingID)
if(updateFields.length==0)
 console.error("NO field value specified for update")

const query  = `update flightbookings set ${userFields.join(',')} where bookingID= '?'`;
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query( query , updateValues, (err , result)=>{
if(err)
 {console.error("Failed to update flightbookings");
 res.status(400).send("An error occured", err);
}
res.status(200).send(result);
 });
 } 

module.exports={getflightbookings ,addflightbookings ,deleteflightbookings , updateflightbookings ,getflightbookingsBy, getflightbookingsLike ,applyFilterSearchflightbookings};



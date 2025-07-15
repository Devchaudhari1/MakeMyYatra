

// controllers/busbookings.js





const {conn} = require('../db.js');
const mysql = require('mysql2');


const axios=require('axios');

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
// getbusbookings


const getbusbookings = (req,res)=> {

console.log("getbusbookings() called");
 try{
 conn.query("Select * from busbookings" ,(err , results) =>    { 
if(err)
 console.error("Failed to get busbookings",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the busbookings",err);
 res.status(500).send({error:err});
}
};
// getbusbookingsBy


// getbusbookingsBy


const getbusbookingsBy = (req,res)=> {

console.log("getbusbookings() called");
 try{
 conn.query("Select * from busbookings where bookingID = ?" ,[req.params.id] ,(err , results) =>    { 
//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
if(err)
 console.error("Failed to get busbookings",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the busbookings",err);
 res.status(500).send({error:err});
}
};
// getbusbookingsLike


const getbusbookingsLike = (req,res)=> {

console.log("getbusbookings() called");
 try{
 conn.query("Select * from busbookings where  username like ? or origin like ? or destination like ? or busID like ? ",[`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`],(err , results) =>    { 
if(err)
 console.error("Failed to get busbookings",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the busbookings",err);
 res.status(500).send({error:err});
}
};
// applyFilterSearchbusbookings


const applyFilterSearchbusbookings = (req,res)=> {

console.log("applyFilterSearchbusbookings() called");
console.log("params received is",req.query);

const { id ,bookingID,cancelled,busID,status }= req.query;

let checkFields =[];
let checkValues=[];

checkFields.push("true");
 
if(cancelled)
{checkFields.push(`cancelled = ?`);
 checkValues.push(`${cancelled}` );
}
if(status)
{checkFields.push(`status = ?`);
 checkValues.push(`${status}` );
}
const query =`Select * from busbookings where ${checkFields.join(" and ")} and (username like ?  or origin like ?  or destination like ? )` 
checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);


 try{
 conn.query(query, checkValues,(err , results) =>    { 
if(err)
 console.error("Failed to applyFilterSearchbusbookings",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the applyFilterSearchbusbookings",err);
 res.status(500).send({error:err});
}
};


// addbusbookings


//busbookingsid might not be auto generate in that case you need to manually insert busbookingsId or busbookingsID

const addbusbookings= (req ,res) => {
if(!conn)
 console.log("conn not properly linked to routes");
 console.log("addbusbookings Called");
//busbookingsid might not be auto generate in that case you need to manually insert busbookingsId or busbookingsID

const {username,date,cancelled,origin,destination,passengers,busID,fare,status}=req.body;console.log(req.body);
    conn.query("Insert into busbookings(username ,date ,cancelled ,origin ,destination ,passengers ,busID ,fare ,status) values (?,?,?,?,?,?,?,?,?)", [username,date,cancelled,origin,destination,passengers,busID,fare,status], (err , result) =>
 {
 if(err)
 console.error("Failed to add busbookings");
else
{console.log("Successfully created busbookings");

res.status(201).json(result);
 }
});
};

// deletebusbookings


const deletebusbookings= async (req , res)=>{
console.log("deletebusbookings() called");
if(!conn)
console.error("conn was not routed properly");
 console.log("deletebusbookings called");

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query("Delete from busbookings where bookingID =?",[req.params.id], (err, result)=>
{
if(!err)
res.status(200).send("User deleted successfully");
else
{

console.error("An error occured", err);
}
});
};

// updatebusbookings




const updatebusbookings =async (req , res) => { 
console.log("updatebusbookings() called");
if(!conn)
 console.error("conn not linked to routes"); 

const busbookingsId= req.params.id

const {
bookingIDusernamedatecancelledorigindestinationpassengersbookingTimebusIDfarestatus}= req.body;

if(!busbookingsId||isNaN(busbookingsId))
{
console.error("Invalid busbookingsId sent");
 res.status(404).send("Invalid busbookingsId");
}
let updateFields= [];
 let updateValues=[];

if(username){

updateFields.push('username=?');
updateValues.push(username);
}
if(date){

updateFields.push('date=?');
updateValues.push(date);
}
if(cancelled){

updateFields.push('cancelled=?');
updateValues.push(cancelled);
}
if(origin){

updateFields.push('origin=?');
updateValues.push(origin);
}
if(destination){

updateFields.push('destination=?');
updateValues.push(destination);
}
if(passengers){

updateFields.push('passengers=?');
updateValues.push(passengers);
}
if(bookingTime){

updateFields.push('bookingTime=?');
updateValues.push(bookingTime);
}
if(busID){

updateFields.push('busID=?');
updateValues.push(busID);
}
if(fare){

updateFields.push('fare=?');
updateValues.push(fare);
}
if(status){

updateFields.push('status=?');
updateValues.push(status);
}
updateValues.push(bookingID)
if(updateFields.length==0)
 console.error("NO field value specified for update")

const query  = `update busbookings set ${userFields.join(',')} where bookingID= '?'`;
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query( query , updateValues, (err , result)=>{
if(err)
 {console.error("Failed to update busbookings");
 res.status(400).send("An error occured", err);
}
res.status(200).send(result);
 });
 } 

module.exports={getbusbookings ,addbusbookings ,deletebusbookings , updatebusbookings ,getbusbookingsBy, getbusbookingsLike ,applyFilterSearchbusbookings};



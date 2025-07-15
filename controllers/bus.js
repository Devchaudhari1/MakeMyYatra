

// controllers/bus.js





const {conn} = require('../db.js');
const mysql = require('mysql2');


const axios=require('axios');

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
// getbus


const getbus = (req,res)=> {

console.log("getbus() called");
 try{
 conn.query("Select * from bus" ,(err , results) =>    { 
if(err)
 console.error("Failed to get bus",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the bus",err);
 res.status(500).send({error:err});
}
};
// getbusBy


// getbusBy


const getbusBy = (req,res)=> {

console.log("getbus() called");
 try{
 conn.query("Select * from bus where busID = ?" ,[req.params.id] ,(err , results) =>    { 
//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
if(err)
 console.error("Failed to get bus",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the bus",err);
 res.status(500).send({error:err});
}
};
// getbusLike


const getbusLike = (req,res)=> {

console.log("getbus() called");
 try{
 conn.query("Select * from bus where  busID like ? or operator like ? or type like ? or origin like ? or destination like ? or originArea like ? or destinationArea like ? ",[`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`],(err , results) =>    { 
if(err)
 console.error("Failed to get bus",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the bus",err);
 res.status(500).send({error:err});
}
};
// applyFilterSearchbus


const applyFilterSearchbus = (req,res)=> {

console.log("applyFilterSearchbus() called");
console.log("params received is",req.query);

const { id ,busID,noofbookings }= req.query;

let checkFields =[];
let checkValues=[];

checkFields.push("true");
 
const query =`Select * from bus where ${checkFields.join(" and ")} and (operator like ?  or type like ?  or origin like ?  or destination like ?  or originArea like ?  or destinationArea like ? )` 
checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);
 try{
 conn.query(query, checkValues,(err , results) =>    { 
if(err)
 console.error("Failed to applyFilterSearchbus",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the applyFilterSearchbus",err);
 res.status(500).send({error:err});
}
};


// addbus


//busid might not be auto generate in that case you need to manually insert busId or busID

const addbus= (req ,res) => {
if(!conn)
 console.log("conn not properly linked to routes");
 console.log("addbus Called");
//busid might not be auto generate in that case you need to manually insert busId or busID

const {busID,operator,type,origin,destination,originArea,destinationArea,departure,arrival,seats,windows,fare,seatsAvailable,noofbookings}=req.body;console.log(req.body);
    conn.query("Insert into bus(busID ,operator ,type ,origin ,destination ,originArea ,destinationArea ,departure ,arrival ,seats ,windows ,fare ,seatsAvailable ,noofbookings) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [busID,operator,type,origin,destination,originArea,destinationArea,departure,arrival,seats,windows,fare,seatsAvailable,noofbookings], (err , result) =>
 {
 if(err)
 console.error("Failed to add bus");
else
{console.log("Successfully created bus");

res.status(201).json(result);
 }
});
};

// deletebus


const deletebus= async (req , res)=>{
console.log("deletebus() called");
if(!conn)
console.error("conn was not routed properly");
 console.log("deletebus called");

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query("Delete from bus where busID =?",[req.params.id], (err, result)=>
{
if(!err)
res.status(200).send("User deleted successfully");
else
{

console.error("An error occured", err);
}
});
};

// updatebus




const updatebus =async (req , res) => { 
console.log("updatebus() called");
if(!conn)
 console.error("conn not linked to routes"); 

const busId= req.params.id

const {
busIDoperatortypeorigindestinationoriginAreadestinationAreadeparturearrivalseatswindowsfareseatsAvailablenoofbookings}= req.body;

if(!busId||isNaN(busId))
{
console.error("Invalid busId sent");
 res.status(404).send("Invalid busId");
}
let updateFields= [];
 let updateValues=[];

if(operator){

updateFields.push('operator=?');
updateValues.push(operator);
}
if(type){

updateFields.push('type=?');
updateValues.push(type);
}
if(origin){

updateFields.push('origin=?');
updateValues.push(origin);
}
if(destination){

updateFields.push('destination=?');
updateValues.push(destination);
}
if(originArea){

updateFields.push('originArea=?');
updateValues.push(originArea);
}
if(destinationArea){

updateFields.push('destinationArea=?');
updateValues.push(destinationArea);
}
if(departure){

updateFields.push('departure=?');
updateValues.push(departure);
}
if(arrival){

updateFields.push('arrival=?');
updateValues.push(arrival);
}
if(seats){

updateFields.push('seats=?');
updateValues.push(seats);
}
if(windows){

updateFields.push('windows=?');
updateValues.push(windows);
}
if(fare){

updateFields.push('fare=?');
updateValues.push(fare);
}
if(seatsAvailable){

updateFields.push('seatsAvailable=?');
updateValues.push(seatsAvailable);
}
if(noofbookings){

updateFields.push('noofbookings=?');
updateValues.push(noofbookings);
}
updateValues.push(busID)
if(updateFields.length==0)
 console.error("NO field value specified for update")

const query  = `update bus set ${userFields.join(',')} where busID= '?'`;
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query( query , updateValues, (err , result)=>{
if(err)
 {console.error("Failed to update bus");
 res.status(400).send("An error occured", err);
}
res.status(200).send(result);
 });
 } 

module.exports={getbus ,addbus ,deletebus , updatebus ,getbusBy, getbusLike ,applyFilterSearchbus};



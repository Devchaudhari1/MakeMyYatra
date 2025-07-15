

// controllers/trainbookings.js





const {conn} = require('../db.js');
const mysql = require('mysql2');


const axios=require('axios');

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
// gettrainbookings


const gettrainbookings = (req,res)=> {

console.log("gettrainbookings() called");
 try{
 conn.query("Select * from trainbookings" ,(err , results) =>    { 
if(err)
 console.error("Failed to get trainbookings",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the trainbookings",err);
 res.status(500).send({error:err});
}
};
// gettrainbookingsBy


// gettrainbookingsBy


const gettrainbookingsBy = (req,res)=> {

console.log("gettrainbookings() called");
 try{
 conn.query("Select * from trainbookings where bookingID = ?" ,[req.params.id] ,(err , results) =>    { 
//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
if(err)
 console.error("Failed to get trainbookings",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the trainbookings",err);
 res.status(500).send({error:err});
}
};
// gettrainbookingsLike


const gettrainbookingsLike = (req,res)=> {

console.log("gettrainbookings() called");
 try{
 conn.query("Select * from trainbookings where  destination like ? or origin like ? username like ?",[`${req.params.id}%`,`${req.params.id}%`],(err , results) =>    { 
if(err)
 console.error("Failed to get trainbookings",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the trainbookings",err);
 res.status(500).send({error:err});
}
};
// applyFilterSearchtrainbookings


const applyFilterSearchtrainbookings = (req,res)=> {

console.log("applyFilterSearchtrainbookings() called");
console.log("params received is",req.query);

const { id ,bookingID,cancelled,classy,paymentStatus,username }= req.query;

let checkFields =[];
let checkValues=[];

checkFields.push("true");
 
if(cancelled)
{checkFields.push(`cancelled = ?`);
 checkValues.push(`${cancelled}` );
}
if(classy)
{checkFields.push(`class = ?`);
 checkValues.push(`${classy}` );
}
if(paymentStatus)
{checkFields.push(`paymentStatus = ?`);
 checkValues.push(`${paymentStatus}` );
}
const query =`Select * from trainbookings where ${checkFields.join(" and ")} and (destination like ?  or origin like ? username like ?
)` 
checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);


 try{
 conn.query(query, checkValues,(err , results) =>    { 
if(err)
 console.error("Failed to applyFilterSearchtrainbookings",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the applyFilterSearchtrainbookings",err);
 res.status(500).send({error:err});
}
};


// addtrainbookings


//trainbookingsid might not be auto generate in that case you need to manually insert trainbookingsId or trainbookingsID

const addtrainbookings= (req ,res) => {
if(!conn)
 console.log("conn not properly linked to routes");
 console.log("addtrainbookings Called");
//trainbookingsid might not be auto generate in that case you need to manually insert trainbookingsId or trainbookingsID

const {cancelled,classy,date,destination,notes,origin,passengers,paymentStatus,totalCost,trainNo,username}=req.body;console.log(req.body);
    conn.query("Insert into trainbookings(cancelled ,classy ,date ,destination ,notes ,origin ,passengers ,paymentStatus ,totalCost ,trainNo ,username) values (?,?,?,?,?,?,?,?,?,?,?)", [cancelled,classy,date,destination,notes,origin,passengers,paymentStatus,totalCost,trainNo,username], (err , result) =>
 {
 if(err)
 console.error("Failed to add trainbookings");
else
{console.log("Successfully created trainbookings");

res.status(201).json(result);
 }
});
};

// deletetrainbookings


const deletetrainbookings= async (req , res)=>{
console.log("deletetrainbookings() called");
if(!conn)
console.error("conn was not routed properly");
 console.log("deletetrainbookings called");

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query("Delete from trainbookings where bookingID =?",[req.params.id], (err, result)=>
{
if(!err)
res.status(200).send("User deleted successfully");
else
{

console.error("An error occured", err);
}
});
};

// updatetrainbookings




const updatetrainbookings =async (req , res) => { 
console.log("updatetrainbookings() called");
if(!conn)
 console.error("conn not linked to routes"); 

const trainbookingsId= req.params.id

const {
bookingIDbookingTimecancelledclassdatedestinationnotesoriginpassengerspaymentStatustotalCosttrainNousername}= req.body;

if(!trainbookingsId||isNaN(trainbookingsId))
{
console.error("Invalid trainbookingsId sent");
 res.status(404).send("Invalid trainbookingsId");
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
if(classy){

updateFields.push('classy=?');
updateValues.push(classy);
}
if(date){

updateFields.push('date=?');
updateValues.push(date);
}
if(destination){

updateFields.push('destination=?');
updateValues.push(destination);
}
if(notes){

updateFields.push('notes=?');
updateValues.push(notes);
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
if(totalCost){

updateFields.push('totalCost=?');
updateValues.push(totalCost);
}
if(trainNo){

updateFields.push('trainNo=?');
updateValues.push(trainNo);
}
if(username){

updateFields.push('username=?');
updateValues.push(username);
}
updateValues.push(bookingID)
if(updateFields.length==0)
 console.error("NO field value specified for update")

const query  = `update trainbookings set ${userFields.join(',')} where bookingID= '?'`;
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query( query , updateValues, (err , result)=>{
if(err)
 {console.error("Failed to update trainbookings");
 res.status(400).send("An error occured", err);
}
res.status(200).send(result);
 });
 } 

module.exports={gettrainbookings ,addtrainbookings ,deletetrainbookings , updatetrainbookings ,gettrainbookingsBy, gettrainbookingsLike ,applyFilterSearchtrainbookings};



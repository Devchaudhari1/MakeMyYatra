

// controllers/cabbookings.js





const {conn} = require('../db.js');
const mysql = require('mysql2');


const axios=require('axios');

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
// getcabbookings


const getcabbookings = (req,res)=> {

console.log("getcabbookings() called");
 try{
 conn.query("Select * from cabbookings" ,(err , results) =>    { 
if(err)
 console.error("Failed to get cabbookings",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the cabbookings",err);
 res.status(500).send({error:err});
}
};
// getcabbookingsBy


// getcabbookingsBy


const getcabbookingsBy = (req,res)=> {

console.log("getcabbookings() called");
 try{
 conn.query("Select * from cabbookings where bookingID = ?" ,[req.params.id] ,(err , results) =>    { 
//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
if(err)
 console.error("Failed to get cabbookings",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the cabbookings",err);
 res.status(500).send({error:err});
}
};
// getcabbookingsLike


const getcabbookingsLike = (req,res)=> {

console.log("getcabbookings() called");
 try{
 conn.query("Select * from cabbookings where  destination like ? or origin like ? username like ?",[`${req.params.id}%`,`${req.params.id}%`],(err , results) =>    { 
if(err)
 console.error("Failed to get cabbookings",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the cabbookings",err);
 res.status(500).send({error:err});
}
};
// applyFilterSearchcabbookings


const applyFilterSearchcabbookings = (req,res)=> {

console.log("applyFilterSearchcabbookings() called");
console.log("params received is",req.query);

const { id ,bookingID,cancelled,carID,driverID,paymentStatus,status,username }= req.query;

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
const query =`Select * from cabbookings where ${checkFields.join(" and ")} and (destination like ?  or origin like ? username like ?
)` 
checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);


 try{
 conn.query(query, checkValues,(err , results) =>    { 
if(err)
 console.error("Failed to applyFilterSearchcabbookings",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the applyFilterSearchcabbookings",err);
 res.status(500).send({error:err});
}
};


// addcabbookings


//cabbookingsid might not be auto generate in that case you need to manually insert cabbookingsId or cabbookingsID

const addcabbookings= (req ,res) => {
if(!conn)
 console.log("conn not properly linked to routes");
 console.log("addcabbookings Called");
//cabbookingsid might not be auto generate in that case you need to manually insert cabbookingsId or cabbookingsID

const {cancelled,carID,date,destination,driverID,fare,notes,origin,passengers,paymentStatus,status,username}=req.body;console.log(req.body);
    conn.query("Insert into cabbookings(cancelled ,carID ,date ,destination ,driverID ,fare ,notes ,origin ,passengers ,paymentStatus ,status ,username) values (?,?,?,?,?,?,?,?,?,?,?,?)", [cancelled,carID,date,destination,driverID,fare,notes,origin,passengers,paymentStatus,status,username], (err , result) =>
 {
 if(err)
 console.error("Failed to add cabbookings");
else
{console.log("Successfully created cabbookings");

res.status(201).json(result);
 }
});
};

// deletecabbookings


const deletecabbookings= async (req , res)=>{
console.log("deletecabbookings() called");
if(!conn)
console.error("conn was not routed properly");
 console.log("deletecabbookings called");

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query("Delete from cabbookings where bookingID =?",[req.params.id], (err, result)=>
{
if(!err)
res.status(200).send("User deleted successfully");
else
{

console.error("An error occured", err);
}
});
};

// updatecabbookings




const updatecabbookings =async (req , res) => { 
console.log("updatecabbookings() called");
if(!conn)
 console.error("conn not linked to routes"); 

const cabbookingsId= req.params.id

const {
bookingIDbookingTimecancelledcarIDdatedestinationdriverIDfarenotesoriginpassengerspaymentStatusstatususername}= req.body;

if(!cabbookingsId||isNaN(cabbookingsId))
{
console.error("Invalid cabbookingsId sent");
 res.status(404).send("Invalid cabbookingsId");
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
if(carID){

updateFields.push('carID=?');
updateValues.push(carID);
}
if(date){

updateFields.push('date=?');
updateValues.push(date);
}
if(destination){

updateFields.push('destination=?');
updateValues.push(destination);
}
if(driverID){

updateFields.push('driverID=?');
updateValues.push(driverID);
}
if(fare){

updateFields.push('fare=?');
updateValues.push(fare);
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
if(status){

updateFields.push('status=?');
updateValues.push(status);
}
if(username){

updateFields.push('username=?');
updateValues.push(username);
}
updateValues.push(bookingID)
if(updateFields.length==0)
 console.error("NO field value specified for update")

const query  = `update cabbookings set ${userFields.join(',')} where bookingID= '?'`;
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query( query , updateValues, (err , result)=>{
if(err)
 {console.error("Failed to update cabbookings");
 res.status(400).send("An error occured", err);
}
res.status(200).send(result);
 });
 } 

module.exports={getcabbookings ,addcabbookings ,deletecabbookings , updatecabbookings ,getcabbookingsBy, getcabbookingsLike ,applyFilterSearchcabbookings};



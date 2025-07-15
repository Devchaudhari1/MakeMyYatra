

// controllers/cabs.js





const {conn} = require('../db.js');
const mysql = require('mysql2');


const axios=require('axios');

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
// getcabs


const getcabs = (req,res)=> {

console.log("getcabs() called");
 try{
 conn.query("Select * from cabs" ,(err , results) =>    { 
if(err)
 console.error("Failed to get cabs",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the cabs",err);
 res.status(500).send({error:err});
}
};
// getcabsBy


// getcabsBy


const getcabsBy = (req,res)=> {

console.log("getcabs() called");
 try{
 conn.query("Select * from cabs where id = ?" ,[req.params.id] ,(err , results) =>    { 
//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
if(err)
 console.error("Failed to get cabs",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the cabs",err);
 res.status(500).send({error:err});
}
};
// getcabsLike


const getcabsLike = (req,res)=> {

console.log("getcabs() called");
 try{
 conn.query("Select * from cabs where  origin like ? or destination like ? or originCode like ? or destinationCode like ? ",[`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`],(err , results) =>    { 
if(err)
 console.error("Failed to get cabs",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the cabs",err);
 res.status(500).send({error:err});
}
};
// applyFilterSearchcabs


const applyFilterSearchcabs = (req,res)=> {

console.log("applyFilterSearchcabs() called");
console.log("params received is",req.query);

const { id ,cabsid,active,notes }= req.query;

let checkFields =[];
let checkValues=[];

checkFields.push("true");
 
if(active)
{checkFields.push(`active = ?`);
 checkValues.push(`${active}` );
}
const query =`Select * from cabs where ${checkFields.join(" and ")} and (origin like ?  or destination like ?  or originCode like ?  or destinationCode like ? )` 
checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);
 try{
 conn.query(query, checkValues,(err , results) =>    { 
if(err)
 console.error("Failed to applyFilterSearchcabs",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the applyFilterSearchcabs",err);
 res.status(500).send({error:err});
}
};


// addcabs


//cabsid might not be auto generate in that case you need to manually insert cabsId or cabsID

const addcabs= (req ,res) => {
if(!conn)
 console.log("conn not properly linked to routes");
 console.log("addcabs Called");
//cabsid might not be auto generate in that case you need to manually insert cabsId or cabsID

const {origin,destination,distance,time,originCode,destinationCode,baseFare,perKmRate,estimatedFare,active,notes}=req.body;console.log(req.body);
    conn.query("Insert into cabs(origin ,destination ,distance ,time ,originCode ,destinationCode ,baseFare ,perKmRate ,estimatedFare ,active ,notes) values (?,?,?,?,?,?,?,?,?,?,?)", [origin,destination,distance,time,originCode,destinationCode,baseFare,perKmRate,estimatedFare,active,notes], (err , result) =>
 {
 if(err)
 console.error("Failed to add cabs");
else
{console.log("Successfully created cabs");

res.status(201).json(result);
 }
});
};

// deletecabs


const deletecabs= async (req , res)=>{
console.log("deletecabs() called");
if(!conn)
console.error("conn was not routed properly");
 console.log("deletecabs called");

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query("Delete from cabs where id =?",[req.params.id], (err, result)=>
{
if(!err)
res.status(200).send("User deleted successfully");
else
{

console.error("An error occured", err);
}
});
};

// updatecabs




const updatecabs =async (req , res) => { 
console.log("updatecabs() called");
if(!conn)
 console.error("conn not linked to routes"); 

const cabsId= req.params.id

const {
idorigindestinationdistancetimeoriginCodedestinationCodebaseFareperKmRateestimatedFareactivenotes}= req.body;

if(!cabsId||isNaN(cabsId))
{
console.error("Invalid cabsId sent");
 res.status(404).send("Invalid cabsId");
}
let updateFields= [];
 let updateValues=[];

if(origin){

updateFields.push('origin=?');
updateValues.push(origin);
}
if(destination){

updateFields.push('destination=?');
updateValues.push(destination);
}
if(distance){

updateFields.push('distance=?');
updateValues.push(distance);
}
if(time){

updateFields.push('time=?');
updateValues.push(time);
}
if(originCode){

updateFields.push('originCode=?');
updateValues.push(originCode);
}
if(destinationCode){

updateFields.push('destinationCode=?');
updateValues.push(destinationCode);
}
if(baseFare){

updateFields.push('baseFare=?');
updateValues.push(baseFare);
}
if(perKmRate){

updateFields.push('perKmRate=?');
updateValues.push(perKmRate);
}
if(estimatedFare){

updateFields.push('estimatedFare=?');
updateValues.push(estimatedFare);
}
if(active){

updateFields.push('active=?');
updateValues.push(active);
}
if(notes){

updateFields.push('notes=?');
updateValues.push(notes);
}
updateValues.push(id)
if(updateFields.length==0)
 console.error("NO field value specified for update")

const query  = `update cabs set ${userFields.join(',')} where id= '?'`;
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query( query , updateValues, (err , result)=>{
if(err)
 {console.error("Failed to update cabs");
 res.status(400).send("An error occured", err);
}
res.status(200).send(result);
 });
 } 

module.exports={getcabs ,addcabs ,deletecabs , updatecabs ,getcabsBy, getcabsLike ,applyFilterSearchcabs};



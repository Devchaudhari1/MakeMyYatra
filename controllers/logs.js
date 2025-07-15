

// controllers/logs.js





const {conn} = require('../db.js');
const mysql = require('mysql2');


const axios=require('axios');

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
// getlogs


const getlogs = (req,res)=> {

console.log("getlogs() called");
 try{
 conn.query("Select * from logs" ,(err , results) =>    { 
if(err)
 console.error("Failed to get logs",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the logs",err);
 res.status(500).send({error:err});
}
};
// getlogsBy


// getlogsBy


const getlogsBy = (req,res)=> {

console.log("getlogs() called");
 try{
 conn.query("Select * from logs where LogID = ?" ,[req.params.id] ,(err , results) =>    { 
//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
if(err)
 console.error("Failed to get logs",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the logs",err);
 res.status(500).send({error:err});
}
};
// getlogsLike


const getlogsLike = (req,res)=> {

console.log("getlogs() called");
 try{
 conn.query("Select * from logs where  EntityType like ? or IPAddress like ? or SessionID like ? ",[`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`],(err , results) =>    { 
if(err)
 console.error("Failed to get logs",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the logs",err);
 res.status(500).send({error:err});
}
};
// applyFilterSearchlogs


const applyFilterSearchlogs = (req,res)=> {

console.log("applyFilterSearchlogs() called");
console.log("params received is",req.query);

const { id ,EntityID,LogID,LogType,SessionID,UserID }= req.query;

let checkFields =[];
let checkValues=[];

checkFields.push("true");
 
if(LogType)
{checkFields.push(`LogType = ?`);
 checkValues.push(`${LogType}` );
}
const query =`Select * from logs where ${checkFields.join(" and ")} and (EntityType like ?  or IPAddress like ? )` 
checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);


 try{
 conn.query(query, checkValues,(err , results) =>    { 
if(err)
 console.error("Failed to applyFilterSearchlogs",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the applyFilterSearchlogs",err);
 res.status(500).send({error:err});
}
};


// addlogs


//logsid might not be auto generate in that case you need to manually insert logsId or logsID

const addlogs= (req ,res) => {
if(!conn)
 console.log("conn not properly linked to routes");
 console.log("addlogs Called");
//logsid might not be auto generate in that case you need to manually insert logsId or logsID

const {EntityID,EntityType,IPAddress,LogType,Message,SessionID,UserID}=req.body;console.log(req.body);
    conn.query("Insert into logs(EntityID ,EntityType ,IPAddress ,LogType ,Message ,SessionID ,UserID) values (?,?,?,?,?,?,?)", [EntityID,EntityType,IPAddress,LogType,Message,SessionID,UserID], (err , result) =>
 {
 if(err)
 console.error("Failed to add logs");
else
{console.log("Successfully created logs");

res.status(201).json(result);
 }
});
};

// deletelogs


const deletelogs= async (req , res)=>{
console.log("deletelogs() called");
if(!conn)
console.error("conn was not routed properly");
 console.log("deletelogs called");

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query("Delete from logs where LogID =?",[req.params.id], (err, result)=>
{
if(!err)
res.status(200).send("User deleted successfully");
else
{

console.error("An error occured", err);
}
});
};

// updatelogs




const updatelogs =async (req , res) => { 
console.log("updatelogs() called");
if(!conn)
 console.error("conn not linked to routes"); 

const logsId= req.params.id

const {
CreatedAtEntityIDEntityTypeIPAddressLogIDLogTypeMessageSessionIDUserID}= req.body;

if(!logsId||isNaN(logsId))
{
console.error("Invalid logsId sent");
 res.status(404).send("Invalid logsId");
}
let updateFields= [];
 let updateValues=[];

if(EntityID){

updateFields.push('EntityID=?');
updateValues.push(EntityID);
}
if(EntityType){

updateFields.push('EntityType=?');
updateValues.push(EntityType);
}
if(IPAddress){

updateFields.push('IPAddress=?');
updateValues.push(IPAddress);
}
if(LogID){

updateFields.push('LogID=?');
updateValues.push(LogID);
}
if(LogType){

updateFields.push('LogType=?');
updateValues.push(LogType);
}
if(Message){

updateFields.push('Message=?');
updateValues.push(Message);
}
if(SessionID){

updateFields.push('SessionID=?');
updateValues.push(SessionID);
}
if(UserID){

updateFields.push('UserID=?');
updateValues.push(UserID);
}
updateValues.push(CreatedAt)
if(updateFields.length==0)
 console.error("NO field value specified for update")

const query  = `update logs set ${userFields.join(',')} where LogID= '?'`;
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query( query , updateValues, (err , result)=>{
if(err)
 {console.error("Failed to update logs");
 res.status(400).send("An error occured", err);
}
res.status(200).send(result);
 });
 } 

module.exports={getlogs ,addlogs ,deletelogs , updatelogs ,getlogsBy, getlogsLike ,applyFilterSearchlogs};



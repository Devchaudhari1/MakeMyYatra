

// controllers/notifications.js





const {conn} = require('../db.js');
const mysql = require('mysql2');


const axios=require('axios');

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
// getnotifications


const getnotifications = (req,res)=> {

console.log("getnotifications() called");
 try{
 conn.query("Select * from notifications" ,(err , results) =>    { 
if(err)
 console.error("Failed to get notifications",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the notifications",err);
 res.status(500).send({error:err});
}
};
// getnotificationsBy


// getnotificationsBy


const getnotificationsBy = (req,res)=> {

console.log("getnotifications() called");
 try{
 conn.query("Select * from notifications where NotificationID = ?" ,[req.params.id] ,(err , results) =>    { 
//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
if(err)
 console.error("Failed to get notifications",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the notifications",err);
 res.status(500).send({error:err});
}
};
// getnotificationsLike


const getnotificationsLike = (req,res)=> {

console.log("getnotifications() called");
 try{
 conn.query("Select * from notifications where ",[`${req.params.id}%`],(err , results) =>    { 
if(err)
 console.error("Failed to get notifications",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the notifications",err);
 res.status(500).send({error:err});
}
};
// applyFilterSearchnotifications


const applyFilterSearchnotifications = (req,res)=> {

console.log("applyFilterSearchnotifications() called");
console.log("params received is",req.query);

const { id ,NotificationID,NotificationType,Status,UserID }= req.query;

let checkFields =[];
let checkValues=[];

checkFields.push("true");
 
if(NotificationType)
{checkFields.push(`NotificationType = ?`);
 checkValues.push(`${NotificationType}` );
}
if(Status)
{checkFields.push(`Status = ?`);
 checkValues.push(`${Status}` );
}
const query =`Select * from notifications where ${checkFields.join(" and ")} ` 

 try{
 conn.query(query, checkValues,(err , results) =>    { 
if(err)
 console.error("Failed to applyFilterSearchnotifications",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the applyFilterSearchnotifications",err);
 res.status(500).send({error:err});
}
};


// addnotifications


//notificationsid might not be auto generate in that case you need to manually insert notificationsId or notificationsID

const addnotifications= (req ,res) => {
if(!conn)
 console.log("conn not properly linked to routes");
 console.log("addnotifications Called");
//notificationsid might not be auto generate in that case you need to manually insert notificationsId or notificationsID

const {Message,Notes,NotificationType,Status,UserID}=req.body;console.log(req.body);
    conn.query("Insert into notifications(Message ,Notes ,NotificationType ,Status ,UserID) values (?,?,?,?,?)", [Message,Notes,NotificationType,Status,UserID], (err , result) =>
 {
 if(err)
 console.error("Failed to add notifications");
else
{console.log("Successfully created notifications");

res.status(201).json(result);
 }
});
};

// deletenotifications


const deletenotifications= async (req , res)=>{
console.log("deletenotifications() called");
if(!conn)
console.error("conn was not routed properly");
 console.log("deletenotifications called");

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query("Delete from notifications where NotificationID =?",[req.params.id], (err, result)=>
{
if(!err)
res.status(200).send("User deleted successfully");
else
{

console.error("An error occured", err);
}
});
};

// updatenotifications




const updatenotifications =async (req , res) => { 
console.log("updatenotifications() called");
if(!conn)
 console.error("conn not linked to routes"); 

const notificationsId= req.params.id

const {
MessageNotesNotificationIDNotificationTypeReadDateSentDateStatusUserID}= req.body;

if(!notificationsId||isNaN(notificationsId))
{
console.error("Invalid notificationsId sent");
 res.status(404).send("Invalid notificationsId");
}
let updateFields= [];
 let updateValues=[];

if(Notes){

updateFields.push('Notes=?');
updateValues.push(Notes);
}
if(NotificationID){

updateFields.push('NotificationID=?');
updateValues.push(NotificationID);
}
if(NotificationType){

updateFields.push('NotificationType=?');
updateValues.push(NotificationType);
}
if(ReadDate){

updateFields.push('ReadDate=?');
updateValues.push(ReadDate);
}
if(SentDate){

updateFields.push('SentDate=?');
updateValues.push(SentDate);
}
if(Status){

updateFields.push('Status=?');
updateValues.push(Status);
}
if(UserID){

updateFields.push('UserID=?');
updateValues.push(UserID);
}
updateValues.push(Message)
if(updateFields.length==0)
 console.error("NO field value specified for update")

const query  = `update notifications set ${userFields.join(',')} where NotificationID= '?'`;
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query( query , updateValues, (err , result)=>{
if(err)
 {console.error("Failed to update notifications");
 res.status(400).send("An error occured", err);
}
res.status(200).send(result);
 });
 } 

module.exports={getnotifications ,addnotifications ,deletenotifications , updatenotifications ,getnotificationsBy, getnotificationsLike ,applyFilterSearchnotifications};



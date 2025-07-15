

// controllers/email_notifications.js





const {conn} = require('../db.js');
const mysql = require('mysql2');


const axios=require('axios');

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
// getemail_notifications


const getemail_notifications = (req,res)=> {

console.log("getemail_notifications() called");
 try{
 conn.query("Select * from email_notifications" ,(err , results) =>    { 
if(err)
 console.error("Failed to get email_notifications",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the email_notifications",err);
 res.status(500).send({error:err});
}
};
// getemail_notificationsBy


// getemail_notificationsBy


const getemail_notificationsBy = (req,res)=> {

console.log("getemail_notifications() called");
 try{
 conn.query("Select * from email_notifications where NotificationID = ?" ,[req.params.id] ,(err , results) =>    { 
//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
if(err)
 console.error("Failed to get email_notifications",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the email_notifications",err);
 res.status(500).send({error:err});
}
};
// getemail_notificationsLike


const getemail_notificationsLike = (req,res)=> {

console.log("getemail_notifications() called");
 try{
 conn.query("Select * from email_notifications where ",[`${req.params.id}%`],(err , results) =>    { 
if(err)
 console.error("Failed to get email_notifications",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the email_notifications",err);
 res.status(500).send({error:err});
}
};
// applyFilterSearchemail_notifications


const applyFilterSearchemail_notifications = (req,res)=> {

console.log("applyFilterSearchemail_notifications() called");
console.log("params received is",req.query);

const { id ,NotificationID,Status,TemplateID,UserID }= req.query;

let checkFields =[];
let checkValues=[];

checkFields.push("true");
 
if(Status)
{checkFields.push(`Status = ?`);
 checkValues.push(`${Status}` );
}
const query =`Select * from email_notifications where ${checkFields.join(" and ")} ` 

 try{
 conn.query(query, checkValues,(err , results) =>    { 
if(err)
 console.error("Failed to applyFilterSearchemail_notifications",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the applyFilterSearchemail_notifications",err);
 res.status(500).send({error:err});
}
};


// addemail_notifications


//email_notificationsid might not be auto generate in that case you need to manually insert email_notificationsId or email_notificationsID

const addemail_notifications= (req ,res) => {
if(!conn)
 console.log("conn not properly linked to routes");
 console.log("addemail_notifications Called");
//email_notificationsid might not be auto generate in that case you need to manually insert email_notificationsId or email_notificationsID

const {Status,TemplateID,UserID}=req.body;console.log(req.body);
    conn.query("Insert into email_notifications(Status ,TemplateID ,UserID) values (?,?,?)", [Status,TemplateID,UserID], (err , result) =>
 {
 if(err)
 console.error("Failed to add email_notifications");
else
{console.log("Successfully created email_notifications");

res.status(201).json(result);
 }
});
};

// deleteemail_notifications


const deleteemail_notifications= async (req , res)=>{
console.log("deleteemail_notifications() called");
if(!conn)
console.error("conn was not routed properly");
 console.log("deleteemail_notifications called");

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query("Delete from email_notifications where NotificationID =?",[req.params.id], (err, result)=>
{
if(!err)
res.status(200).send("User deleted successfully");
else
{

console.error("An error occured", err);
}
});
};

// updateemail_notifications




const updateemail_notifications =async (req , res) => { 
console.log("updateemail_notifications() called");
if(!conn)
 console.error("conn not linked to routes"); 

const email_notificationsId= req.params.id

const {
NotificationIDSentAtStatusTemplateIDUserID}= req.body;

if(!email_notificationsId||isNaN(email_notificationsId))
{
console.error("Invalid email_notificationsId sent");
 res.status(404).send("Invalid email_notificationsId");
}
let updateFields= [];
 let updateValues=[];

if(SentAt){

updateFields.push('SentAt=?');
updateValues.push(SentAt);
}
if(Status){

updateFields.push('Status=?');
updateValues.push(Status);
}
if(TemplateID){

updateFields.push('TemplateID=?');
updateValues.push(TemplateID);
}
if(UserID){

updateFields.push('UserID=?');
updateValues.push(UserID);
}
updateValues.push(NotificationID)
if(updateFields.length==0)
 console.error("NO field value specified for update")

const query  = `update email_notifications set ${userFields.join(',')} where NotificationID= '?'`;
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query( query , updateValues, (err , result)=>{
if(err)
 {console.error("Failed to update email_notifications");
 res.status(400).send("An error occured", err);
}
res.status(200).send(result);
 });
 } 

module.exports={getemail_notifications ,addemail_notifications ,deleteemail_notifications , updateemail_notifications ,getemail_notificationsBy, getemail_notificationsLike ,applyFilterSearchemail_notifications};



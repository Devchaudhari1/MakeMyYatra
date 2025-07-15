

// controllers/email_templates.js





const {conn} = require('../db.js');
const mysql = require('mysql2');


const axios=require('axios');

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
// getemail_templates


const getemail_templates = (req,res)=> {

console.log("getemail_templates() called");
 try{
 conn.query("Select * from email_templates" ,(err , results) =>    { 
if(err)
 console.error("Failed to get email_templates",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the email_templates",err);
 res.status(500).send({error:err});
}
};
// getemail_templatesBy


// getemail_templatesBy


const getemail_templatesBy = (req,res)=> {

console.log("getemail_templates() called");
 try{
 conn.query("Select * from email_templates where TemplateID = ?" ,[req.params.id] ,(err , results) =>    { 
//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
if(err)
 console.error("Failed to get email_templates",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the email_templates",err);
 res.status(500).send({error:err});
}
};
// getemail_templatesLike


const getemail_templatesLike = (req,res)=> {

console.log("getemail_templates() called");
 try{
 conn.query("Select * from email_templates where  Subject like ? or TemplateName like ? ",[`${req.params.id}%`,`${req.params.id}%`],(err , results) =>    { 
if(err)
 console.error("Failed to get email_templates",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the email_templates",err);
 res.status(500).send({error:err});
}
};
// applyFilterSearchemail_templates


const applyFilterSearchemail_templates = (req,res)=> {

console.log("applyFilterSearchemail_templates() called");
console.log("params received is",req.query);

const { id ,TemplateID,UpdatedAt }= req.query;

let checkFields =[];
let checkValues=[];

checkFields.push("true");
 
const query =`Select * from email_templates where ${checkFields.join(" and ")} and (Subject like ?  or TemplateName like ? )` 
checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);


 try{
 conn.query(query, checkValues,(err , results) =>    { 
if(err)
 console.error("Failed to applyFilterSearchemail_templates",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the applyFilterSearchemail_templates",err);
 res.status(500).send({error:err});
}
};


// addemail_templates


//email_templatesid might not be auto generate in that case you need to manually insert email_templatesId or email_templatesID

const addemail_templates= (req ,res) => {
if(!conn)
 console.log("conn not properly linked to routes");
 console.log("addemail_templates Called");
//email_templatesid might not be auto generate in that case you need to manually insert email_templatesId or email_templatesID

const {Body,Subject,TemplateName,UpdatedAt}=req.body;console.log(req.body);
    conn.query("Insert into email_templates(Body ,Subject ,TemplateName ,UpdatedAt) values (?,?,?,?)", [Body,Subject,TemplateName,UpdatedAt], (err , result) =>
 {
 if(err)
 console.error("Failed to add email_templates");
else
{console.log("Successfully created email_templates");

res.status(201).json(result);
 }
});
};

// deleteemail_templates


const deleteemail_templates= async (req , res)=>{
console.log("deleteemail_templates() called");
if(!conn)
console.error("conn was not routed properly");
 console.log("deleteemail_templates called");

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query("Delete from email_templates where TemplateID =?",[req.params.id], (err, result)=>
{
if(!err)
res.status(200).send("User deleted successfully");
else
{

console.error("An error occured", err);
}
});
};

// updateemail_templates




const updateemail_templates =async (req , res) => { 
console.log("updateemail_templates() called");
if(!conn)
 console.error("conn not linked to routes"); 

const email_templatesId= req.params.id

const {
BodyCreatedAtSubjectTemplateIDTemplateNameUpdatedAt}= req.body;

if(!email_templatesId||isNaN(email_templatesId))
{
console.error("Invalid email_templatesId sent");
 res.status(404).send("Invalid email_templatesId");
}
let updateFields= [];
 let updateValues=[];

if(CreatedAt){

updateFields.push('CreatedAt=?');
updateValues.push(CreatedAt);
}
if(Subject){

updateFields.push('Subject=?');
updateValues.push(Subject);
}
if(TemplateID){

updateFields.push('TemplateID=?');
updateValues.push(TemplateID);
}
if(TemplateName){

updateFields.push('TemplateName=?');
updateValues.push(TemplateName);
}
if(UpdatedAt){

updateFields.push('UpdatedAt=?');
updateValues.push(UpdatedAt);
}
updateValues.push(Body)
if(updateFields.length==0)
 console.error("NO field value specified for update")

const query  = `update email_templates set ${userFields.join(',')} where TemplateID= '?'`;
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query( query , updateValues, (err , result)=>{
if(err)
 {console.error("Failed to update email_templates");
 res.status(400).send("An error occured", err);
}
res.status(200).send(result);
 });
 } 

module.exports={getemail_templates ,addemail_templates ,deleteemail_templates , updateemail_templates ,getemail_templatesBy, getemail_templatesLike ,applyFilterSearchemail_templates};



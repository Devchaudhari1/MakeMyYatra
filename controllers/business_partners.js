

// controllers/business_partners.js





const {conn} = require('../db.js');
const mysql = require('mysql2');


const axios=require('axios');

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
// getbusiness_partners


const getbusiness_partners = (req,res)=> {

console.log("getbusiness_partners() called");
 try{
 conn.query("Select * from business_partners" ,(err , results) =>    { 
if(err)
 console.error("Failed to get business_partners",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the business_partners",err);
 res.status(500).send({error:err});
}
};
// getbusiness_partnersBy


// getbusiness_partnersBy


const getbusiness_partnersBy = (req,res)=> {

console.log("getbusiness_partners() called");
 try{
 conn.query("Select * from business_partners where PartnerID = ?" ,[req.params.id] ,(err , results) =>    { 
//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
if(err)
 console.error("Failed to get business_partners",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the business_partners",err);
 res.status(500).send({error:err});
}
};
// getbusiness_partnersLike


const getbusiness_partnersLike = (req,res)=> {

console.log("getbusiness_partners() called");
 try{
 conn.query("Select * from business_partners where  BusinessAddress like ? or BusinessName like ? or Email like ? or FullName like ? or Phone like ? ",[`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`],(err , results) =>    { 
if(err)
 console.error("Failed to get business_partners",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the business_partners",err);
 res.status(500).send({error:err});
}
};
// applyFilterSearchbusiness_partners


const applyFilterSearchbusiness_partners = (req,res)=> {

console.log("applyFilterSearchbusiness_partners() called");
console.log("params received is",req.query);

const { id ,CuratorID,IsVerified,PartnerID,PartnerType,UpdatedAt }= req.query;

let checkFields =[];
let checkValues=[];

checkFields.push("true");
 
if(IsVerified)
{checkFields.push(`IsVerified = ?`);
 checkValues.push(`${IsVerified}` );
}
if(PartnerType)
{checkFields.push(`PartnerType = ?`);
 checkValues.push(`${PartnerType}` );
}
const query =`Select * from business_partners where ${checkFields.join(" and ")} and (BusinessAddress like ?  or BusinessName like ?  or Email like ?  or FullName like ?  or Phone like ? )` 
checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);


 try{
 conn.query(query, checkValues,(err , results) =>    { 
if(err)
 console.error("Failed to applyFilterSearchbusiness_partners",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the applyFilterSearchbusiness_partners",err);
 res.status(500).send({error:err});
}
};


// addbusiness_partners


//business_partnersid might not be auto generate in that case you need to manually insert business_partnersId or business_partnersID

const addbusiness_partners= (req ,res) => {
if(!conn)
 console.log("conn not properly linked to routes");
 console.log("addbusiness_partners Called");
//business_partnersid might not be auto generate in that case you need to manually insert business_partnersId or business_partnersID

const {BusinessAddress,BusinessDescription,BusinessName,CuratorID,Email,FullName,IsVerified,PartnerType,Phone,UpdatedAt}=req.body;console.log(req.body);
    conn.query("Insert into business_partners(BusinessAddress ,BusinessDescription ,BusinessName ,CuratorID ,Email ,FullName ,IsVerified ,PartnerType ,Phone ,UpdatedAt) values (?,?,?,?,?,?,?,?,?,?)", [BusinessAddress,BusinessDescription,BusinessName,CuratorID,Email,FullName,IsVerified,PartnerType,Phone,UpdatedAt], (err , result) =>
 {
 if(err)
 console.error("Failed to add business_partners");
else
{console.log("Successfully created business_partners");

res.status(201).json(result);
 }
});
};

// deletebusiness_partners


const deletebusiness_partners= async (req , res)=>{
console.log("deletebusiness_partners() called");
if(!conn)
console.error("conn was not routed properly");
 console.log("deletebusiness_partners called");

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query("Delete from business_partners where PartnerID =?",[req.params.id], (err, result)=>
{
if(!err)
res.status(200).send("User deleted successfully");
else
{

console.error("An error occured", err);
}
});
};

// updatebusiness_partners




const updatebusiness_partners =async (req , res) => { 
console.log("updatebusiness_partners() called");
if(!conn)
 console.error("conn not linked to routes"); 

const business_partnersId= req.params.id

const {
BusinessAddressBusinessDescriptionBusinessNameCreatedAtCuratorIDEmailFullNameIsVerifiedPartnerIDPartnerTypePhoneUpdatedAt}= req.body;

if(!business_partnersId||isNaN(business_partnersId))
{
console.error("Invalid business_partnersId sent");
 res.status(404).send("Invalid business_partnersId");
}
let updateFields= [];
 let updateValues=[];

if(BusinessDescription){

updateFields.push('BusinessDescription=?');
updateValues.push(BusinessDescription);
}
if(BusinessName){

updateFields.push('BusinessName=?');
updateValues.push(BusinessName);
}
if(CreatedAt){

updateFields.push('CreatedAt=?');
updateValues.push(CreatedAt);
}
if(CuratorID){

updateFields.push('CuratorID=?');
updateValues.push(CuratorID);
}
if(Email){

updateFields.push('Email=?');
updateValues.push(Email);
}
if(FullName){

updateFields.push('FullName=?');
updateValues.push(FullName);
}
if(IsVerified){

updateFields.push('IsVerified=?');
updateValues.push(IsVerified);
}
if(PartnerID){

updateFields.push('PartnerID=?');
updateValues.push(PartnerID);
}
if(PartnerType){

updateFields.push('PartnerType=?');
updateValues.push(PartnerType);
}
if(Phone){

updateFields.push('Phone=?');
updateValues.push(Phone);
}
if(UpdatedAt){

updateFields.push('UpdatedAt=?');
updateValues.push(UpdatedAt);
}
updateValues.push(BusinessAddress)
if(updateFields.length==0)
 console.error("NO field value specified for update")

const query  = `update business_partners set ${userFields.join(',')} where PartnerID= '?'`;
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query( query , updateValues, (err , result)=>{
if(err)
 {console.error("Failed to update business_partners");
 res.status(400).send("An error occured", err);
}
res.status(200).send(result);
 });
 } 

module.exports={getbusiness_partners ,addbusiness_partners ,deletebusiness_partners , updatebusiness_partners ,getbusiness_partnersBy, getbusiness_partnersLike ,applyFilterSearchbusiness_partners};



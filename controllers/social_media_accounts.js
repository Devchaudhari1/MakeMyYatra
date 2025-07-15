

// controllers/social_media_accounts.js





const {conn} = require('../db.js');
const mysql = require('mysql2');


const axios=require('axios');

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
// getsocial_media_accounts


const getsocial_media_accounts = (req,res)=> {

console.log("getsocial_media_accounts() called");
 try{
 conn.query("Select * from social_media_accounts" ,(err , results) =>    { 
if(err)
 console.error("Failed to get social_media_accounts",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the social_media_accounts",err);
 res.status(500).send({error:err});
}
};
// getsocial_media_accountsBy


// getsocial_media_accountsBy


const getsocial_media_accountsBy = (req,res)=> {

console.log("getsocial_media_accounts() called");
 try{
 conn.query("Select * from social_media_accounts where SocialMediaID = ?" ,[req.params.id] ,(err , results) =>    { 
//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
if(err)
 console.error("Failed to get social_media_accounts",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the social_media_accounts",err);
 res.status(500).send({error:err});
}
};
// getsocial_media_accountsLike


const getsocial_media_accountsLike = (req,res)=> {

console.log("getsocial_media_accounts() called");
 try{
 conn.query("Select * from social_media_accounts where  SocialMediaUserID like ? ",[`${req.params.id}%`],(err , results) =>    { 
if(err)
 console.error("Failed to get social_media_accounts",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the social_media_accounts",err);
 res.status(500).send({error:err});
}
};
// applyFilterSearchsocial_media_accounts


const applyFilterSearchsocial_media_accounts = (req,res)=> {

console.log("applyFilterSearchsocial_media_accounts() called");
console.log("params received is",req.query);

const { id ,Platform,SocialMediaID,SocialMediaUserID,UserID }= req.query;

let checkFields =[];
let checkValues=[];

checkFields.push("true");
 
if(Platform)
{checkFields.push(`Platform = ?`);
 checkValues.push(`${Platform}` );
}
const query =`Select * from social_media_accounts where ${checkFields.join(" and ")} ` 

 try{
 conn.query(query, checkValues,(err , results) =>    { 
if(err)
 console.error("Failed to applyFilterSearchsocial_media_accounts",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the applyFilterSearchsocial_media_accounts",err);
 res.status(500).send({error:err});
}
};


// addsocial_media_accounts


//social_media_accountsid might not be auto generate in that case you need to manually insert social_media_accountsId or social_media_accountsID

const addsocial_media_accounts= (req ,res) => {
if(!conn)
 console.log("conn not properly linked to routes");
 console.log("addsocial_media_accounts Called");
//social_media_accountsid might not be auto generate in that case you need to manually insert social_media_accountsId or social_media_accountsID

const {AccessToken,Platform,SocialMediaUserID,UserID}=req.body;console.log(req.body);
    conn.query("Insert into social_media_accounts(AccessToken ,Platform ,SocialMediaUserID ,UserID) values (?,?,?,?)", [AccessToken,Platform,SocialMediaUserID,UserID], (err , result) =>
 {
 if(err)
 console.error("Failed to add social_media_accounts");
else
{console.log("Successfully created social_media_accounts");

res.status(201).json(result);
 }
});
};

// deletesocial_media_accounts


const deletesocial_media_accounts= async (req , res)=>{
console.log("deletesocial_media_accounts() called");
if(!conn)
console.error("conn was not routed properly");
 console.log("deletesocial_media_accounts called");

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query("Delete from social_media_accounts where SocialMediaID =?",[req.params.id], (err, result)=>
{
if(!err)
res.status(200).send("User deleted successfully");
else
{

console.error("An error occured", err);
}
});
};

// updatesocial_media_accounts




const updatesocial_media_accounts =async (req , res) => { 
console.log("updatesocial_media_accounts() called");
if(!conn)
 console.error("conn not linked to routes"); 

const social_media_accountsId= req.params.id

const {
AccessTokenCreatedAtPlatformSocialMediaIDSocialMediaUserIDUpdatedAtUserID}= req.body;

if(!social_media_accountsId||isNaN(social_media_accountsId))
{
console.error("Invalid social_media_accountsId sent");
 res.status(404).send("Invalid social_media_accountsId");
}
let updateFields= [];
 let updateValues=[];

if(CreatedAt){

updateFields.push('CreatedAt=?');
updateValues.push(CreatedAt);
}
if(Platform){

updateFields.push('Platform=?');
updateValues.push(Platform);
}
if(SocialMediaID){

updateFields.push('SocialMediaID=?');
updateValues.push(SocialMediaID);
}
if(SocialMediaUserID){

updateFields.push('SocialMediaUserID=?');
updateValues.push(SocialMediaUserID);
}
if(UpdatedAt){

updateFields.push('UpdatedAt=?');
updateValues.push(UpdatedAt);
}
if(UserID){

updateFields.push('UserID=?');
updateValues.push(UserID);
}
updateValues.push(AccessToken)
if(updateFields.length==0)
 console.error("NO field value specified for update")

const query  = `update social_media_accounts set ${userFields.join(',')} where SocialMediaID= '?'`;
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query( query , updateValues, (err , result)=>{
if(err)
 {console.error("Failed to update social_media_accounts");
 res.status(400).send("An error occured", err);
}
res.status(200).send(result);
 });
 } 

module.exports={getsocial_media_accounts ,addsocial_media_accounts ,deletesocial_media_accounts , updatesocial_media_accounts ,getsocial_media_accountsBy, getsocial_media_accountsLike ,applyFilterSearchsocial_media_accounts};



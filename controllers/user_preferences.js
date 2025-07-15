

// controllers/user_preferences.js





const {conn} = require('../db.js');
const mysql = require('mysql2');


const axios=require('axios');

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
// getuser_preferences


const getuser_preferences = (req,res)=> {

console.log("getuser_preferences() called");
 try{
 conn.query("Select * from user_preferences" ,(err , results) =>    { 
if(err)
 console.error("Failed to get user_preferences",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the user_preferences",err);
 res.status(500).send({error:err});
}
};
// getuser_preferencesBy


// getuser_preferencesBy


const getuser_preferencesBy = (req,res)=> {

console.log("getuser_preferences() called");
 try{
 conn.query("Select * from user_preferences where PreferenceID = ?" ,[req.params.id] ,(err , results) =>    { 
//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
if(err)
 console.error("Failed to get user_preferences",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the user_preferences",err);
 res.status(500).send({error:err});
}
};
// getuser_preferencesLike


const getuser_preferencesLike = (req,res)=> {

console.log("getuser_preferences() called");
 try{
 conn.query("Select * from user_preferences where ",[`${req.params.id}%`],(err , results) =>    { 
if(err)
 console.error("Failed to get user_preferences",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the user_preferences",err);
 res.status(500).send({error:err});
}
};
// applyFilterSearchuser_preferences


const applyFilterSearchuser_preferences = (req,res)=> {

console.log("applyFilterSearchuser_preferences() called");
console.log("params received is",req.query);

const { id ,BudgetRange,LanguageID,PreferenceID,PreferredAccommodationType,PreferredActivities,PreferredCuisine,PreferredTransportation,TravelGroupSize,UserID }= req.query;

let checkFields =[];
let checkValues=[];

checkFields.push("true");
 
if(BudgetRange)
{checkFields.push(`BudgetRange = ?`);
 checkValues.push(`${BudgetRange}` );
}
if(PreferredAccommodationType)
{checkFields.push(`PreferredAccommodationType = ?`);
 checkValues.push(`${PreferredAccommodationType}` );
}
if(PreferredActivities)
{checkFields.push(`PreferredActivities = ?`);
 checkValues.push(`${PreferredActivities}` );
}
if(PreferredCuisine)
{checkFields.push(`PreferredCuisine = ?`);
 checkValues.push(`${PreferredCuisine}` );
}
if(PreferredTransportation)
{checkFields.push(`PreferredTransportation = ?`);
 checkValues.push(`${PreferredTransportation}` );
}
if(TravelGroupSize)
{checkFields.push(`TravelGroupSize = ?`);
 checkValues.push(`${TravelGroupSize}` );
}
const query =`Select * from user_preferences where ${checkFields.join(" and ")} ` 

 try{
 conn.query(query, checkValues,(err , results) =>    { 
if(err)
 console.error("Failed to applyFilterSearchuser_preferences",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the applyFilterSearchuser_preferences",err);
 res.status(500).send({error:err});
}
};


// adduser_preferences


//user_preferencesid might not be auto generate in that case you need to manually insert user_preferencesId or user_preferencesID

const adduser_preferences= (req ,res) => {
if(!conn)
 console.log("conn not properly linked to routes");
 console.log("adduser_preferences Called");
//user_preferencesid might not be auto generate in that case you need to manually insert user_preferencesId or user_preferencesID

const {BudgetRange,LanguageID,PreferredAccommodationType,PreferredActivities,PreferredCuisine,PreferredTransportation,TravelGroupSize,UserID}=req.body;console.log(req.body);
    conn.query("Insert into user_preferences(BudgetRange ,LanguageID ,PreferredAccommodationType ,PreferredActivities ,PreferredCuisine ,PreferredTransportation ,TravelGroupSize ,UserID) values (?,?,?,?,?,?,?,?)", [BudgetRange,LanguageID,PreferredAccommodationType,PreferredActivities,PreferredCuisine,PreferredTransportation,TravelGroupSize,UserID], (err , result) =>
 {
 if(err)
 console.error("Failed to add user_preferences");
else
{console.log("Successfully created user_preferences");

res.status(201).json(result);
 }
});
};

// deleteuser_preferences


const deleteuser_preferences= async (req , res)=>{
console.log("deleteuser_preferences() called");
if(!conn)
console.error("conn was not routed properly");
 console.log("deleteuser_preferences called");

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query("Delete from user_preferences where PreferenceID =?",[req.params.id], (err, result)=>
{
if(!err)
res.status(200).send("User deleted successfully");
else
{

console.error("An error occured", err);
}
});
};

// updateuser_preferences




const updateuser_preferences =async (req , res) => { 
console.log("updateuser_preferences() called");
if(!conn)
 console.error("conn not linked to routes"); 

const user_preferencesId= req.params.id

const {
BudgetRangeCreatedAtLanguageIDPreferenceIDPreferredAccommodationTypePreferredActivitiesPreferredCuisinePreferredTransportationTravelGroupSizeUpdatedAtUserID}= req.body;

if(!user_preferencesId||isNaN(user_preferencesId))
{
console.error("Invalid user_preferencesId sent");
 res.status(404).send("Invalid user_preferencesId");
}
let updateFields= [];
 let updateValues=[];

if(CreatedAt){

updateFields.push('CreatedAt=?');
updateValues.push(CreatedAt);
}
if(LanguageID){

updateFields.push('LanguageID=?');
updateValues.push(LanguageID);
}
if(PreferenceID){

updateFields.push('PreferenceID=?');
updateValues.push(PreferenceID);
}
if(PreferredAccommodationType){

updateFields.push('PreferredAccommodationType=?');
updateValues.push(PreferredAccommodationType);
}
if(PreferredActivities){

updateFields.push('PreferredActivities=?');
updateValues.push(PreferredActivities);
}
if(PreferredCuisine){

updateFields.push('PreferredCuisine=?');
updateValues.push(PreferredCuisine);
}
if(PreferredTransportation){

updateFields.push('PreferredTransportation=?');
updateValues.push(PreferredTransportation);
}
if(TravelGroupSize){

updateFields.push('TravelGroupSize=?');
updateValues.push(TravelGroupSize);
}
if(UpdatedAt){

updateFields.push('UpdatedAt=?');
updateValues.push(UpdatedAt);
}
if(UserID){

updateFields.push('UserID=?');
updateValues.push(UserID);
}
updateValues.push(BudgetRange)
if(updateFields.length==0)
 console.error("NO field value specified for update")

const query  = `update user_preferences set ${userFields.join(',')} where PreferenceID= '?'`;
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query( query , updateValues, (err , result)=>{
if(err)
 {console.error("Failed to update user_preferences");
 res.status(400).send("An error occured", err);
}
res.status(200).send(result);
 });
 } 

module.exports={getuser_preferences ,adduser_preferences ,deleteuser_preferences , updateuser_preferences ,getuser_preferencesBy, getuser_preferencesLike ,applyFilterSearchuser_preferences};



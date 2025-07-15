

// controllers/activities.js





const {conn} = require('../db.js');
const mysql = require('mysql2');


const axios=require('axios');

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
// getactivities


const getactivities = (req,res)=> {

console.log("getactivities() called");
 try{
 conn.query("Select * from activities" ,(err , results) =>    { 
if(err)
 console.error("Failed to get activities",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the activities",err);
 res.status(500).send({error:err});
}
};
// getactivitiesBy


// getactivitiesBy


const getactivitiesBy = (req,res)=> {

console.log("getactivities() called");
 try{
 conn.query("Select * from activities where ActivityID = ?" ,[req.params.id] ,(err , results) =>    { 
//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
if(err)
 console.error("Failed to get activities",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the activities",err);
 res.status(500).send({error:err});
}
};
// getactivitiesLike


const getactivitiesLike = (req,res)=> {

console.log("getactivities() called");
 try{
 conn.query("Select * from activities where  ActivityName like ? or HostEntityID like ? or Location like ? or AgeRestriction like ? ",[`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`],(err , results) =>    { 
if(err)
 console.error("Failed to get activities",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the activities",err);
 res.status(500).send({error:err});
}
};
// applyFilterSearchactivities


const applyFilterSearchactivities = (req,res)=> {

console.log("applyFilterSearchactivities() called");
console.log("params received is",req.query);

const { id ,ActivityID,ActivityType,HostEntityType,HostEntityID,DifficultyLevel,EquipmentRequired,UpdatedAt }= req.query;

let checkFields =[];
let checkValues=[];

checkFields.push("true");
 
if(ActivityType)
{checkFields.push(`ActivityType = ?`);
 checkValues.push(`${ActivityType}` );
}
if(HostEntityType)
{checkFields.push(`HostEntityType = ?`);
 checkValues.push(`${HostEntityType}` );
}
if(DifficultyLevel)
{checkFields.push(`DifficultyLevel = ?`);
 checkValues.push(`${DifficultyLevel}` );
}
if(EquipmentRequired)
{checkFields.push(`EquipmentRequired = ?`);
 checkValues.push(`${EquipmentRequired}` );
}
const query =`Select * from activities where ${checkFields.join(" and ")} and (ActivityName like ?  or Location like ?  or AgeRestriction like ? )` 
checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);
 try{
 conn.query(query, checkValues,(err , results) =>    { 
if(err)
 console.error("Failed to applyFilterSearchactivities",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the applyFilterSearchactivities",err);
 res.status(500).send({error:err});
}
};


// addactivities


//activitiesid might not be auto generate in that case you need to manually insert activitiesId or activitiesID

const addactivities= (req ,res) => {
if(!conn)
 console.log("conn not properly linked to routes");
 console.log("addactivities Called");
//activitiesid might not be auto generate in that case you need to manually insert activitiesId or activitiesID

const {ActivityName,Description,ActivityType,HostEntityType,HostEntityID,Location,StartDateTime,EndDateTime,MaxParticipants,CurrentParticipants,Price,DifficultyLevel,EquipmentRequired,AgeRestriction,IsActive,UpdatedAt}=req.body;console.log(req.body);
    conn.query("Insert into activities(ActivityName ,Description ,ActivityType ,HostEntityType ,HostEntityID ,Location ,StartDateTime ,EndDateTime ,MaxParticipants ,CurrentParticipants ,Price ,DifficultyLevel ,EquipmentRequired ,AgeRestriction ,IsActive ,UpdatedAt) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [ActivityName,Description,ActivityType,HostEntityType,HostEntityID,Location,StartDateTime,EndDateTime,MaxParticipants,CurrentParticipants,Price,DifficultyLevel,EquipmentRequired,AgeRestriction,IsActive,UpdatedAt], (err , result) =>
 {
 if(err)
 console.error("Failed to add activities");
else
{console.log("Successfully created activities");

res.status(201).json(result);
 }
});
};

// deleteactivities


const deleteactivities= async (req , res)=>{
console.log("deleteactivities() called");
if(!conn)
console.error("conn was not routed properly");
 console.log("deleteactivities called");

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query("Delete from activities where ActivityID =?",[req.params.id], (err, result)=>
{
if(!err)
res.status(200).send("User deleted successfully");
else
{

console.error("An error occured", err);
}
});
};

// updateactivities




const updateactivities =async (req , res) => { 
console.log("updateactivities() called");
if(!conn)
 console.error("conn not linked to routes"); 

const activitiesId= req.params.id

const {
ActivityIDActivityNameDescriptionActivityTypeHostEntityTypeHostEntityIDLocationStartDateTimeEndDateTimeMaxParticipantsCurrentParticipantsPriceDifficultyLevelEquipmentRequiredAgeRestrictionIsActiveCreatedAtUpdatedAt}= req.body;

if(!activitiesId||isNaN(activitiesId))
{
console.error("Invalid activitiesId sent");
 res.status(404).send("Invalid activitiesId");
}
let updateFields= [];
 let updateValues=[];

if(ActivityName){

updateFields.push('ActivityName=?');
updateValues.push(ActivityName);
}
if(Description){

updateFields.push('Description=?');
updateValues.push(Description);
}
if(ActivityType){

updateFields.push('ActivityType=?');
updateValues.push(ActivityType);
}
if(HostEntityType){

updateFields.push('HostEntityType=?');
updateValues.push(HostEntityType);
}
if(HostEntityID){

updateFields.push('HostEntityID=?');
updateValues.push(HostEntityID);
}
if(Location){

updateFields.push('Location=?');
updateValues.push(Location);
}
if(StartDateTime){

updateFields.push('StartDateTime=?');
updateValues.push(StartDateTime);
}
if(EndDateTime){

updateFields.push('EndDateTime=?');
updateValues.push(EndDateTime);
}
if(MaxParticipants){

updateFields.push('MaxParticipants=?');
updateValues.push(MaxParticipants);
}
if(CurrentParticipants){

updateFields.push('CurrentParticipants=?');
updateValues.push(CurrentParticipants);
}
if(Price){

updateFields.push('Price=?');
updateValues.push(Price);
}
if(DifficultyLevel){

updateFields.push('DifficultyLevel=?');
updateValues.push(DifficultyLevel);
}
if(EquipmentRequired){

updateFields.push('EquipmentRequired=?');
updateValues.push(EquipmentRequired);
}
if(AgeRestriction){

updateFields.push('AgeRestriction=?');
updateValues.push(AgeRestriction);
}
if(IsActive){

updateFields.push('IsActive=?');
updateValues.push(IsActive);
}
if(CreatedAt){

updateFields.push('CreatedAt=?');
updateValues.push(CreatedAt);
}
if(UpdatedAt){

updateFields.push('UpdatedAt=?');
updateValues.push(UpdatedAt);
}
updateValues.push(ActivityID)
if(updateFields.length==0)
 console.error("NO field value specified for update")

const query  = `update activities set ${userFields.join(',')} where ActivityID= '?'`;
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query( query , updateValues, (err , result)=>{
if(err)
 {console.error("Failed to update activities");
 res.status(400).send("An error occured", err);
}
res.status(200).send(result);
 });
 } 

module.exports={getactivities ,addactivities ,deleteactivities , updateactivities ,getactivitiesBy, getactivitiesLike ,applyFilterSearchactivities};





// controllers/itineraries.js





const {conn} = require('../db.js');
const mysql = require('mysql2');


const axios=require('axios');

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
// getitineraries


const getitineraries = (req,res)=> {

console.log("getitineraries() called");
 try{
 conn.query("Select * from itineraries" ,(err , results) =>    { 
if(err)
 console.error("Failed to get itineraries",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the itineraries",err);
 res.status(500).send({error:err});
}
};
// getitinerariesBy


// getitinerariesBy


const getitinerariesBy = (req,res)=> {

console.log("getitineraries() called");
 try{
 conn.query("Select * from itineraries where ItineraryID = ?" ,[req.params.id] ,(err , results) =>    { 
//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
if(err)
 console.error("Failed to get itineraries",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the itineraries",err);
 res.status(500).send({error:err});
}
};
// getitinerariesLike


const getitinerariesLike = (req,res)=> {

console.log("getitineraries() called");
 try{
 conn.query("Select * from itineraries where  EndLocation like ? or StartLocation like ? or Title like ? ",[`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`],(err , results) =>    { 
if(err)
 console.error("Failed to get itineraries",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the itineraries",err);
 res.status(500).send({error:err});
}
};
// applyFilterSearchitineraries


const applyFilterSearchitineraries = (req,res)=> {

console.log("applyFilterSearchitineraries() called");
console.log("params received is",req.query);

const { id ,Category,ItineraryID,UpdatedAt }= req.query;

let checkFields =[];
let checkValues=[];

checkFields.push("true");
 
if(Category)
{checkFields.push(`Category = ?`);
 checkValues.push(`${Category}` );
}
const query =`Select * from itineraries where ${checkFields.join(" and ")} and (EndLocation like ?  or StartLocation like ?  or Title like ? )` 
checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);


 try{
 conn.query(query, checkValues,(err , results) =>    { 
if(err)
 console.error("Failed to applyFilterSearchitineraries",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the applyFilterSearchitineraries",err);
 res.status(500).send({error:err});
}
};


// additineraries


//itinerariesid might not be auto generate in that case you need to manually insert itinerariesId or itinerariesID

const additineraries= (req ,res) => {
if(!conn)
 console.log("conn not properly linked to routes");
 console.log("additineraries Called");
//itinerariesid might not be auto generate in that case you need to manually insert itinerariesId or itinerariesID

const {Category,Description,Duration,EndLocation,StartLocation,Title,UpdatedAt}=req.body;console.log(req.body);
    conn.query("Insert into itineraries(Category ,Description ,Duration ,EndLocation ,StartLocation ,Title ,UpdatedAt) values (?,?,?,?,?,?,?)", [Category,Description,Duration,EndLocation,StartLocation,Title,UpdatedAt], (err , result) =>
 {
 if(err)
 console.error("Failed to add itineraries");
else
{console.log("Successfully created itineraries");

res.status(201).json(result);
 }
});
};

// deleteitineraries


const deleteitineraries= async (req , res)=>{
console.log("deleteitineraries() called");
if(!conn)
console.error("conn was not routed properly");
 console.log("deleteitineraries called");

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query("Delete from itineraries where ItineraryID =?",[req.params.id], (err, result)=>
{
if(!err)
res.status(200).send("User deleted successfully");
else
{

console.error("An error occured", err);
}
});
};

// updateitineraries




const updateitineraries =async (req , res) => { 
console.log("updateitineraries() called");
if(!conn)
 console.error("conn not linked to routes"); 

const itinerariesId= req.params.id

const {
CategoryCreatedAtDescriptionDurationEndLocationItineraryIDStartLocationTitleUpdatedAt}= req.body;

if(!itinerariesId||isNaN(itinerariesId))
{
console.error("Invalid itinerariesId sent");
 res.status(404).send("Invalid itinerariesId");
}
let updateFields= [];
 let updateValues=[];

if(CreatedAt){

updateFields.push('CreatedAt=?');
updateValues.push(CreatedAt);
}
if(Description){

updateFields.push('Description=?');
updateValues.push(Description);
}
if(Duration){

updateFields.push('Duration=?');
updateValues.push(Duration);
}
if(EndLocation){

updateFields.push('EndLocation=?');
updateValues.push(EndLocation);
}
if(ItineraryID){

updateFields.push('ItineraryID=?');
updateValues.push(ItineraryID);
}
if(StartLocation){

updateFields.push('StartLocation=?');
updateValues.push(StartLocation);
}
if(Title){

updateFields.push('Title=?');
updateValues.push(Title);
}
if(UpdatedAt){

updateFields.push('UpdatedAt=?');
updateValues.push(UpdatedAt);
}
updateValues.push(Category)
if(updateFields.length==0)
 console.error("NO field value specified for update")

const query  = `update itineraries set ${userFields.join(',')} where ItineraryID= '?'`;
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query( query , updateValues, (err , result)=>{
if(err)
 {console.error("Failed to update itineraries");
 res.status(400).send("An error occured", err);
}
res.status(200).send(result);
 });
 } 

module.exports={getitineraries ,additineraries ,deleteitineraries , updateitineraries ,getitinerariesBy, getitinerariesLike ,applyFilterSearchitineraries};



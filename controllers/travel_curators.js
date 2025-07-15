

// controllers/travel_curators.js





const {conn} = require('../db.js');
const mysql = require('mysql2');


const axios=require('axios');

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
// gettravel_curators


const gettravel_curators = (req,res)=> {

console.log("gettravel_curators() called");
 try{
 conn.query("Select * from travel_curators" ,(err , results) =>    { 
if(err)
 console.error("Failed to get travel_curators",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the travel_curators",err);
 res.status(500).send({error:err});
}
};
// gettravel_curatorsBy


// gettravel_curatorsBy


const gettravel_curatorsBy = (req,res)=> {

console.log("gettravel_curators() called");
 try{
 conn.query("Select * from travel_curators where CuratorID = ?" ,[req.params.id] ,(err , results) =>    { 
//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
if(err)
 console.error("Failed to get travel_curators",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the travel_curators",err);
 res.status(500).send({error:err});
}
};
// gettravel_curatorsLike


const gettravel_curatorsLike = (req,res)=> {

console.log("gettravel_curators() called");
 try{
 conn.query("Select * from travel_curators where  Languages like ? or Specializations like ? ",[`${req.params.id}%`,`${req.params.id}%`],(err , results) =>    { 
if(err)
 console.error("Failed to get travel_curators",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the travel_curators",err);
 res.status(500).send({error:err});
}
};
// applyFilterSearchtravel_curators


const applyFilterSearchtravel_curators = (req,res)=> {

console.log("applyFilterSearchtravel_curators() called");
console.log("params received is",req.query);

const { id ,CuratorID,Expertise,IsAvailable,UpdatedAt }= req.query;

let checkFields =[];
let checkValues=[];

checkFields.push("true");
 
if(Expertise)
{checkFields.push(`Expertise = ?`);
 checkValues.push(`${Expertise}` );
}
if(IsAvailable)
{checkFields.push(`IsAvailable = ?`);
 checkValues.push(`${IsAvailable}` );
}
const query =`Select * from travel_curators where ${checkFields.join(" and ")} and (Languages like ?  or Specializations like ? )` 
checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);


 try{
 conn.query(query, checkValues,(err , results) =>    { 
if(err)
 console.error("Failed to applyFilterSearchtravel_curators",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the applyFilterSearchtravel_curators",err);
 res.status(500).send({error:err});
}
};


// addtravel_curators


//travel_curatorsid might not be auto generate in that case you need to manually insert travel_curatorsId or travel_curatorsID

const addtravel_curators= (req ,res) => {
if(!conn)
 console.log("conn not properly linked to routes");
 console.log("addtravel_curators Called");
//travel_curatorsid might not be auto generate in that case you need to manually insert travel_curatorsId or travel_curatorsID

const {Bio,ExperienceYears,Expertise,IsAvailable,Languages,Rating,Specializations,UpdatedAt}=req.body;console.log(req.body);
    conn.query("Insert into travel_curators(Bio ,ExperienceYears ,Expertise ,IsAvailable ,Languages ,Rating ,Specializations ,UpdatedAt) values (?,?,?,?,?,?,?,?)", [Bio,ExperienceYears,Expertise,IsAvailable,Languages,Rating,Specializations,UpdatedAt], (err , result) =>
 {
 if(err)
 console.error("Failed to add travel_curators");
else
{console.log("Successfully created travel_curators");

res.status(201).json(result);
 }
});
};

// deletetravel_curators


const deletetravel_curators= async (req , res)=>{
console.log("deletetravel_curators() called");
if(!conn)
console.error("conn was not routed properly");
 console.log("deletetravel_curators called");

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query("Delete from travel_curators where CuratorID =?",[req.params.id], (err, result)=>
{
if(!err)
res.status(200).send("User deleted successfully");
else
{

console.error("An error occured", err);
}
});
};

// updatetravel_curators




const updatetravel_curators =async (req , res) => { 
console.log("updatetravel_curators() called");
if(!conn)
 console.error("conn not linked to routes"); 

const travel_curatorsId= req.params.id

const {
BioCreatedAtCuratorIDExperienceYearsExpertiseIsAvailableLanguagesRatingSpecializationsUpdatedAt}= req.body;

if(!travel_curatorsId||isNaN(travel_curatorsId))
{
console.error("Invalid travel_curatorsId sent");
 res.status(404).send("Invalid travel_curatorsId");
}
let updateFields= [];
 let updateValues=[];

if(CreatedAt){

updateFields.push('CreatedAt=?');
updateValues.push(CreatedAt);
}
if(CuratorID){

updateFields.push('CuratorID=?');
updateValues.push(CuratorID);
}
if(ExperienceYears){

updateFields.push('ExperienceYears=?');
updateValues.push(ExperienceYears);
}
if(Expertise){

updateFields.push('Expertise=?');
updateValues.push(Expertise);
}
if(IsAvailable){

updateFields.push('IsAvailable=?');
updateValues.push(IsAvailable);
}
if(Languages){

updateFields.push('Languages=?');
updateValues.push(Languages);
}
if(Rating){

updateFields.push('Rating=?');
updateValues.push(Rating);
}
if(Specializations){

updateFields.push('Specializations=?');
updateValues.push(Specializations);
}
if(UpdatedAt){

updateFields.push('UpdatedAt=?');
updateValues.push(UpdatedAt);
}
updateValues.push(Bio)
if(updateFields.length==0)
 console.error("NO field value specified for update")

const query  = `update travel_curators set ${userFields.join(',')} where CuratorID= '?'`;
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query( query , updateValues, (err , result)=>{
if(err)
 {console.error("Failed to update travel_curators");
 res.status(400).send("An error occured", err);
}
res.status(200).send(result);
 });
 } 

module.exports={gettravel_curators ,addtravel_curators ,deletetravel_curators , updatetravel_curators ,gettravel_curatorsBy, gettravel_curatorsLike ,applyFilterSearchtravel_curators};



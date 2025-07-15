

// controllers/languages.js





const {conn} = require('../db.js');
const mysql = require('mysql2');


const axios=require('axios');

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
// getlanguages


const getlanguages = (req,res)=> {

console.log("getlanguages() called");
 try{
 conn.query("Select * from languages" ,(err , results) =>    { 
if(err)
 console.error("Failed to get languages",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the languages",err);
 res.status(500).send({error:err});
}
};
// getlanguagesBy


// getlanguagesBy


const getlanguagesBy = (req,res)=> {

console.log("getlanguages() called");
 try{
 conn.query("Select * from languages where LanguageID = ?" ,[req.params.id] ,(err , results) =>    { 
//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
if(err)
 console.error("Failed to get languages",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the languages",err);
 res.status(500).send({error:err});
}
};
// getlanguagesLike


const getlanguagesLike = (req,res)=> {

console.log("getlanguages() called");
 try{
 conn.query("Select * from languages where  LanguageCode like ? or LanguageName like ? ",[`${req.params.id}%`,`${req.params.id}%`],(err , results) =>    { 
if(err)
 console.error("Failed to get languages",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the languages",err);
 res.status(500).send({error:err});
}
};
// applyFilterSearchlanguages


const applyFilterSearchlanguages = (req,res)=> {

console.log("applyFilterSearchlanguages() called");
console.log("params received is",req.query);

const { id ,IsDefault,LanguageID,UpdatedAt }= req.query;

let checkFields =[];
let checkValues=[];

checkFields.push("true");
 
if(IsDefault)
{checkFields.push(`IsDefault = ?`);
 checkValues.push(`${IsDefault}` );
}
const query =`Select * from languages where ${checkFields.join(" and ")} and (LanguageCode like ?  or LanguageName like ? )` 
checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);


 try{
 conn.query(query, checkValues,(err , results) =>    { 
if(err)
 console.error("Failed to applyFilterSearchlanguages",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the applyFilterSearchlanguages",err);
 res.status(500).send({error:err});
}
};


// addlanguages


//languagesid might not be auto generate in that case you need to manually insert languagesId or languagesID

const addlanguages= (req ,res) => {
if(!conn)
 console.log("conn not properly linked to routes");
 console.log("addlanguages Called");
//languagesid might not be auto generate in that case you need to manually insert languagesId or languagesID

const {IsDefault,LanguageCode,LanguageName,UpdatedAt}=req.body;console.log(req.body);
    conn.query("Insert into languages(IsDefault ,LanguageCode ,LanguageName ,UpdatedAt) values (?,?,?,?)", [IsDefault,LanguageCode,LanguageName,UpdatedAt], (err , result) =>
 {
 if(err)
 console.error("Failed to add languages");
else
{console.log("Successfully created languages");

res.status(201).json(result);
 }
});
};

// deletelanguages


const deletelanguages= async (req , res)=>{
console.log("deletelanguages() called");
if(!conn)
console.error("conn was not routed properly");
 console.log("deletelanguages called");

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query("Delete from languages where LanguageID =?",[req.params.id], (err, result)=>
{
if(!err)
res.status(200).send("User deleted successfully");
else
{

console.error("An error occured", err);
}
});
};

// updatelanguages




const updatelanguages =async (req , res) => { 
console.log("updatelanguages() called");
if(!conn)
 console.error("conn not linked to routes"); 

const languagesId= req.params.id

const {
CreatedAtIsDefaultLanguageCodeLanguageIDLanguageNameUpdatedAt}= req.body;

if(!languagesId||isNaN(languagesId))
{
console.error("Invalid languagesId sent");
 res.status(404).send("Invalid languagesId");
}
let updateFields= [];
 let updateValues=[];

if(IsDefault){

updateFields.push('IsDefault=?');
updateValues.push(IsDefault);
}
if(LanguageCode){

updateFields.push('LanguageCode=?');
updateValues.push(LanguageCode);
}
if(LanguageID){

updateFields.push('LanguageID=?');
updateValues.push(LanguageID);
}
if(LanguageName){

updateFields.push('LanguageName=?');
updateValues.push(LanguageName);
}
if(UpdatedAt){

updateFields.push('UpdatedAt=?');
updateValues.push(UpdatedAt);
}
updateValues.push(CreatedAt)
if(updateFields.length==0)
 console.error("NO field value specified for update")

const query  = `update languages set ${userFields.join(',')} where LanguageID= '?'`;
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query( query , updateValues, (err , result)=>{
if(err)
 {console.error("Failed to update languages");
 res.status(400).send("An error occured", err);
}
res.status(200).send(result);
 });
 } 

module.exports={getlanguages ,addlanguages ,deletelanguages , updatelanguages ,getlanguagesBy, getlanguagesLike ,applyFilterSearchlanguages};





// controllers/places.js





const {conn} = require('../db.js');
const mysql = require('mysql2');


const axios=require('axios');

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
// getplaces


const getplaces = (req,res)=> {

console.log("getplaces() called");
 try{
 conn.query("Select * from places" ,(err , results) =>    { 
if(err)
 console.error("Failed to get places",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the places",err);
 res.status(500).send({error:err});
}
};
// getplacesBy


// getplacesBy


const getplacesBy = (req,res)=> {

console.log("getplaces() called");
 try{
 conn.query("Select * from places where PlaceID = ?" ,[req.params.id] ,(err , results) =>    { 
//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
if(err)
 console.error("Failed to get places",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the places",err);
 res.status(500).send({error:err});
}
};
// getplacesLike


const getplacesLike = (req,res)=> {

console.log("getplaces() called");
 try{
 conn.query("Select * from places where  ImageURL like ? or Location like ? or OpeningHours like ? or PlaceName like ? ",[`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`],(err , results) =>    { 
if(err)
 console.error("Failed to get places",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the places",err);
 res.status(500).send({error:err});
}
};
// applyFilterSearchplaces


const applyFilterSearchplaces = (req,res)=> {

console.log("applyFilterSearchplaces() called");
console.log("params received is",req.query);

const { id ,Category,PlaceID,UpdatedAt }= req.query;

let checkFields =[];
let checkValues=[];

checkFields.push("true");
 
if(Category)
{checkFields.push(`Category = ?`);
 checkValues.push(`${Category}` );
}
const query =`Select * from places where ${checkFields.join(" and ")} and (Location like ?  or OpeningHours like ?  or PlaceName like ? )` 
checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);


 try{
 conn.query(query, checkValues,(err , results) =>    { 
if(err)
 console.error("Failed to applyFilterSearchplaces",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the applyFilterSearchplaces",err);
 res.status(500).send({error:err});
}
};


// addplaces


//placesid might not be auto generate in that case you need to manually insert placesId or placesID

const addplaces= (req ,res) => {
if(!conn)
 console.log("conn not properly linked to routes");
 console.log("addplaces Called");
//placesid might not be auto generate in that case you need to manually insert placesId or placesID

const {Category,Description,EntryFee,ImageURL,Location,OpeningHours,PlaceName,Rating,UpdatedAt}=req.body;console.log(req.body);
    conn.query("Insert into places(Category ,Description ,EntryFee ,ImageURL ,Location ,OpeningHours ,PlaceName ,Rating ,UpdatedAt) values (?,?,?,?,?,?,?,?,?)", [Category,Description,EntryFee,ImageURL,Location,OpeningHours,PlaceName,Rating,UpdatedAt], (err , result) =>
 {
 if(err)
 console.error("Failed to add places");
else
{console.log("Successfully created places");

res.status(201).json(result);
 }
});
};

// deleteplaces


const deleteplaces= async (req , res)=>{
console.log("deleteplaces() called");
if(!conn)
console.error("conn was not routed properly");
 console.log("deleteplaces called");

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query("Delete from places where PlaceID =?",[req.params.id], (err, result)=>
{
if(!err)
res.status(200).send("User deleted successfully");
else
{

console.error("An error occured", err);
}
});
};

// updateplaces




const updateplaces =async (req , res) => { 
console.log("updateplaces() called");
if(!conn)
 console.error("conn not linked to routes"); 

const placesId= req.params.id

const {
CategoryCreatedAtDescriptionEntryFeeImageURLLocationOpeningHoursPlaceIDPlaceNameRatingUpdatedAt}= req.body;

if(!placesId||isNaN(placesId))
{
console.error("Invalid placesId sent");
 res.status(404).send("Invalid placesId");
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
if(EntryFee){

updateFields.push('EntryFee=?');
updateValues.push(EntryFee);
}
if(ImageURL){

updateFields.push('ImageURL=?');
updateValues.push(ImageURL);
}
if(Location){

updateFields.push('Location=?');
updateValues.push(Location);
}
if(OpeningHours){

updateFields.push('OpeningHours=?');
updateValues.push(OpeningHours);
}
if(PlaceID){

updateFields.push('PlaceID=?');
updateValues.push(PlaceID);
}
if(PlaceName){

updateFields.push('PlaceName=?');
updateValues.push(PlaceName);
}
if(Rating){

updateFields.push('Rating=?');
updateValues.push(Rating);
}
if(UpdatedAt){

updateFields.push('UpdatedAt=?');
updateValues.push(UpdatedAt);
}
updateValues.push(Category)
if(updateFields.length==0)
 console.error("NO field value specified for update")

const query  = `update places set ${userFields.join(',')} where PlaceID= '?'`;
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query( query , updateValues, (err , result)=>{
if(err)
 {console.error("Failed to update places");
 res.status(400).send("An error occured", err);
}
res.status(200).send(result);
 });
 } 

module.exports={getplaces ,addplaces ,deleteplaces , updateplaces ,getplacesBy, getplacesLike ,applyFilterSearchplaces};



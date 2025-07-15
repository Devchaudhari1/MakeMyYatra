

// controllers/itinerary_places.js





const {conn} = require('../db.js');
const mysql = require('mysql2');


const axios=require('axios');

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
// getitinerary_places


const getitinerary_places = (req,res)=> {

console.log("getitinerary_places() called");
 try{
 conn.query("Select * from itinerary_places" ,(err , results) =>    { 
if(err)
 console.error("Failed to get itinerary_places",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the itinerary_places",err);
 res.status(500).send({error:err});
}
};
// getitinerary_placesBy


// getitinerary_placesBy


const getitinerary_placesBy = (req,res)=> {

console.log("getitinerary_places() called");
 try{
 conn.query("Select * from itinerary_places where ItineraryPlaceID = ?" ,[req.params.id] ,(err , results) =>    { 
//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
if(err)
 console.error("Failed to get itinerary_places",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the itinerary_places",err);
 res.status(500).send({error:err});
}
};
// getitinerary_placesLike


const getitinerary_placesLike = (req,res)=> {

console.log("getitinerary_places() called");
 try{
 conn.query("Select * from itinerary_places where ",[`${req.params.id}%`],(err , results) =>    { 
if(err)
 console.error("Failed to get itinerary_places",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the itinerary_places",err);
 res.status(500).send({error:err});
}
};
// applyFilterSearchitinerary_places


const applyFilterSearchitinerary_places = (req,res)=> {

console.log("applyFilterSearchitinerary_places() called");
console.log("params received is",req.query);

const { id ,ItineraryID,ItineraryPlaceID,PlaceID,VisitOrder }= req.query;

let checkFields =[];
let checkValues=[];

checkFields.push("true");
 
const query =`Select * from itinerary_places where ${checkFields.join(" and ")} ` 

 try{
 conn.query(query, checkValues,(err , results) =>    { 
if(err)
 console.error("Failed to applyFilterSearchitinerary_places",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the applyFilterSearchitinerary_places",err);
 res.status(500).send({error:err});
}
};


// additinerary_places


//itinerary_placesid might not be auto generate in that case you need to manually insert itinerary_placesId or itinerary_placesID

const additinerary_places= (req ,res) => {
if(!conn)
 console.log("conn not properly linked to routes");
 console.log("additinerary_places Called");
//itinerary_placesid might not be auto generate in that case you need to manually insert itinerary_placesId or itinerary_placesID

const {Day,ItineraryID,Notes,PlaceID,VisitOrder}=req.body;console.log(req.body);
    conn.query("Insert into itinerary_places(Day ,ItineraryID ,Notes ,PlaceID ,VisitOrder) values (?,?,?,?,?)", [Day,ItineraryID,Notes,PlaceID,VisitOrder], (err , result) =>
 {
 if(err)
 console.error("Failed to add itinerary_places");
else
{console.log("Successfully created itinerary_places");

res.status(201).json(result);
 }
});
};

// deleteitinerary_places


const deleteitinerary_places= async (req , res)=>{
console.log("deleteitinerary_places() called");
if(!conn)
console.error("conn was not routed properly");
 console.log("deleteitinerary_places called");

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query("Delete from itinerary_places where ItineraryPlaceID =?",[req.params.id], (err, result)=>
{
if(!err)
res.status(200).send("User deleted successfully");
else
{

console.error("An error occured", err);
}
});
};

// updateitinerary_places




const updateitinerary_places =async (req , res) => { 
console.log("updateitinerary_places() called");
if(!conn)
 console.error("conn not linked to routes"); 

const itinerary_placesId= req.params.id

const {
DayItineraryIDItineraryPlaceIDNotesPlaceIDVisitOrder}= req.body;

if(!itinerary_placesId||isNaN(itinerary_placesId))
{
console.error("Invalid itinerary_placesId sent");
 res.status(404).send("Invalid itinerary_placesId");
}
let updateFields= [];
 let updateValues=[];

if(ItineraryID){

updateFields.push('ItineraryID=?');
updateValues.push(ItineraryID);
}
if(ItineraryPlaceID){

updateFields.push('ItineraryPlaceID=?');
updateValues.push(ItineraryPlaceID);
}
if(Notes){

updateFields.push('Notes=?');
updateValues.push(Notes);
}
if(PlaceID){

updateFields.push('PlaceID=?');
updateValues.push(PlaceID);
}
if(VisitOrder){

updateFields.push('VisitOrder=?');
updateValues.push(VisitOrder);
}
updateValues.push(Day)
if(updateFields.length==0)
 console.error("NO field value specified for update")

const query  = `update itinerary_places set ${userFields.join(',')} where ItineraryPlaceID= '?'`;
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query( query , updateValues, (err , result)=>{
if(err)
 {console.error("Failed to update itinerary_places");
 res.status(400).send("An error occured", err);
}
res.status(200).send(result);
 });
 } 

module.exports={getitinerary_places ,additinerary_places ,deleteitinerary_places , updateitinerary_places ,getitinerary_placesBy, getitinerary_placesLike ,applyFilterSearchitinerary_places};



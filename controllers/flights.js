

// controllers/flights.js





const {conn} = require('../db.js');
const mysql = require('mysql2');


const axios=require('axios');

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
// getflights


const getflights = (req,res)=> {

console.log("getflights() called");
 try{
 conn.query("Select * from flights" ,(err , results) =>    { 
if(err)
 console.error("Failed to get flights",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the flights",err);
 res.status(500).send({error:err});
}
};
// getflightsBy


// getflightsBy


const getflightsBy = (req,res)=> {

console.log("getflights() called");
 try{
 conn.query("Select * from flights where flight_no = ?" ,[req.params.id] ,(err , results) =>    { 
//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
if(err)
 console.error("Failed to get flights",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the flights",err);
 res.status(500).send({error:err});
}
};
// getflightsLike


const getflightsLike = (req,res)=> {

console.log("getflights() called");
 try{
 conn.query("Select * from flights where  destination like ? or destination_code like ? or flight_no like ? or operator like ? or origin like ? or origin_code like ? ",[`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`],(err , results) =>    { 
if(err)
 console.error("Failed to get flights",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the flights",err);
 res.status(500).send({error:err});
}
};
// applyFilterSearchflights


const applyFilterSearchflights = (req,res)=> {

console.log("applyFilterSearchflights() called");
console.log("params received is",req.query);

const { id ,classy,refundable,seats_available }= req.query;

let checkFields =[];
let checkValues=[];

checkFields.push("true");
 
if(classy)
{checkFields.push(`class = ?`);
 checkValues.push(`${classy}` );
}
if(refundable)
{checkFields.push(`refundable = ?`);
 checkValues.push(`${refundable}` );
}
const query =`Select * from flights where ${checkFields.join(" and ")} and (destination like ?  or destination_code like ?  or flight_no like ?  or operator like ?  or origin like ?  or origin_code like ? )` 
checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);
 try{
 conn.query(query, checkValues,(err , results) =>    { 
if(err)
 console.error("Failed to applyFilterSearchflights",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the applyFilterSearchflights",err);
 res.status(500).send({error:err});
}
};


// addflights


//flightsid might not be auto generate in that case you need to manually insert flightsId or flightsID

const addflights= (req ,res) => {
if(!conn)
 console.log("conn not properly linked to routes");
 console.log("addflights Called");
//flightsid might not be auto generate in that case you need to manually insert flightsId or flightsID

const {arrival_time,classy,departure_time,destination,destination_code,distance,fare,flight_no,noofbookings,operator,origin,origin_code,refundable,seats_available}=req.body;console.log(req.body);
    conn.query("Insert into flights(arrival_time ,classy ,departure_time ,destination ,destination_code ,distance ,fare ,flight_no ,noofbookings ,operator ,origin ,origin_code ,refundable ,seats_available) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [arrival_time,classy,departure_time,destination,destination_code,distance,fare,flight_no,noofbookings,operator,origin,origin_code,refundable,seats_available], (err , result) =>
 {
 if(err)
 console.error("Failed to add flights");
else
{console.log("Successfully created flights");

res.status(201).json(result);
 }
});
};

// deleteflights


const deleteflights= async (req , res)=>{
console.log("deleteflights() called");
if(!conn)
console.error("conn was not routed properly");
 console.log("deleteflights called");

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query("Delete from flights where flight_no =?",[req.params.id], (err, result)=>
{
if(!err)
res.status(200).send("User deleted successfully");
else
{

console.error("An error occured", err);
}
});
};

// updateflights




const updateflights =async (req , res) => { 
console.log("updateflights() called");
if(!conn)
 console.error("conn not linked to routes"); 

const flightsId= req.params.id

const {
arrival_timeclassydeparture_timedestinationdestination_codedistancefareflight_nonoofbookingsoperatororiginorigin_coderefundableseats_available}= req.body;

if(!flightsId||isNaN(flightsId))
{
console.error("Invalid flightsId sent");
 res.status(404).send("Invalid flightsId");
}
let updateFields= [];
 let updateValues=[];

if(classy){

updateFields.push('classy=?');
updateValues.push(classy);
}
if(departure_time){

updateFields.push('departure_time=?');
updateValues.push(departure_time);
}
if(destination){

updateFields.push('destination=?');
updateValues.push(destination);
}
if(destination_code){

updateFields.push('destination_code=?');
updateValues.push(destination_code);
}
if(distance){

updateFields.push('distance=?');
updateValues.push(distance);
}
if(fare){

updateFields.push('fare=?');
updateValues.push(fare);
}
if(flight_no){

updateFields.push('flight_no=?');
updateValues.push(flight_no);
}
if(noofbookings){

updateFields.push('noofbookings=?');
updateValues.push(noofbookings);
}
if(operator){

updateFields.push('operator=?');
updateValues.push(operator);
}
if(origin){

updateFields.push('origin=?');
updateValues.push(origin);
}
if(origin_code){

updateFields.push('origin_code=?');
updateValues.push(origin_code);
}
if(refundable){

updateFields.push('refundable=?');
updateValues.push(refundable);
}
if(seats_available){

updateFields.push('seats_available=?');
updateValues.push(seats_available);
}
updateValues.push(arrival_time)
if(updateFields.length==0)
 console.error("NO field value specified for update")

const query  = `update flights set ${userFields.join(',')} where flight_no= '?'`;
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query( query , updateValues, (err , result)=>{
if(err)
 {console.error("Failed to update flights");
 res.status(400).send("An error occured", err);
}
res.status(200).send(result);
 });
 } 

module.exports={getflights ,addflights ,deleteflights , updateflights ,getflightsBy, getflightsLike ,applyFilterSearchflights};



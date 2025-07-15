

// controllers/trains.js





const {conn} = require('../db.js');
const mysql = require('mysql2');


const axios=require('axios');

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
// gettrains


const gettrains = (req,res)=> {

console.log("gettrains() called");
 try{
 conn.query("Select * from trains" ,(err , results) =>    { 
if(err)
 console.error("Failed to get trains",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the trains",err);
 res.status(500).send({error:err});
}
};
// gettrainsBy


// gettrainsBy


const gettrainsBy = (req,res)=> {

console.log("gettrains() called");
 try{
 conn.query("Select * from trains where trainNo = ?" ,[req.params.id] ,(err , results) =>    { 
//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
if(err)
 console.error("Failed to get trains",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the trains",err);
 res.status(500).send({error:err});
}
};
// gettrainsLike


const gettrainsLike = (req,res)=> {

console.log("gettrains() called");
 try{
 conn.query("Select * from trains where  classes like ? or destination like ? or destinationCode like ? or destinationPlatform like ? or origin like ? or originCode like ? or originPlatform like ? or region like ? or runsOn like ? or trainName like ? ",[`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`],(err , results) =>    { 
if(err)
 console.error("Failed to get trains",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the trains",err);
 res.status(500).send({error:err});
}
};
// applyFilterSearchtrains


const applyFilterSearchtrains = (req,res)=> {

console.log("applyFilterSearchtrains() called");
console.log("params received is",req.query);

const { id ,trainNo }= req.query;

let checkFields =[];
let checkValues=[];

checkFields.push("true");
 
const query =`Select * from trains where ${checkFields.join(" and ")} and (classes like ?  or destination like ?  or destinationCode like ?  or destinationPlatform like ?  or origin like ?  or originCode like ?  or originPlatform like ?  or region like ?  or runsOn like ?  or trainName like ? )` 
checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);
 try{
 conn.query(query, checkValues,(err , results) =>    { 
if(err)
 console.error("Failed to applyFilterSearchtrains",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the applyFilterSearchtrains",err);
 res.status(500).send({error:err});
}
};


// addtrains


//trainsid might not be auto generate in that case you need to manually insert trainsId or trainsID

const addtrains= (req ,res) => {
if(!conn)
 console.log("conn not properly linked to routes");
 console.log("addtrains Called");
//trainsid might not be auto generate in that case you need to manually insert trainsId or trainsID

const {classes,destination,destinationCode,destinationPlatform,destinationTime,duration,noOfBookings,origin,originCode,originPlatform,originTime,price1AC,price2AC,price3AC,priceChairCar,priceChairCarAC,priceSL,region,returnTrainNo,runsOn,seats1AC,seats2AC,seats3AC,seatsChairCar,seatsChairCarAC,seatsSL,trainName,trainNo}=req.body;console.log(req.body);
    conn.query("Insert into trains(classes ,destination ,destinationCode ,destinationPlatform ,destinationTime ,duration ,noOfBookings ,origin ,originCode ,originPlatform ,originTime ,price1AC ,price2AC ,price3AC ,priceChairCar ,priceChairCarAC ,priceSL ,region ,returnTrainNo ,runsOn ,seats1AC ,seats2AC ,seats3AC ,seatsChairCar ,seatsChairCarAC ,seatsSL ,trainName ,trainNo) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [classes,destination,destinationCode,destinationPlatform,destinationTime,duration,noOfBookings,origin,originCode,originPlatform,originTime,price1AC,price2AC,price3AC,priceChairCar,priceChairCarAC,priceSL,region,returnTrainNo,runsOn,seats1AC,seats2AC,seats3AC,seatsChairCar,seatsChairCarAC,seatsSL,trainName,trainNo], (err , result) =>
 {
 if(err)
 console.error("Failed to add trains");
else
{console.log("Successfully created trains");

res.status(201).json(result);
 }
});
};

// deletetrains


const deletetrains= async (req , res)=>{
console.log("deletetrains() called");
if(!conn)
console.error("conn was not routed properly");
 console.log("deletetrains called");

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query("Delete from trains where trainNo =?",[req.params.id], (err, result)=>
{
if(!err)
res.status(200).send("User deleted successfully");
else
{

console.error("An error occured", err);
}
});
};

// updatetrains




const updatetrains =async (req , res) => { 
console.log("updatetrains() called");
if(!conn)
 console.error("conn not linked to routes"); 

const trainsId= req.params.id

const {
classesdestinationdestinationCodedestinationPlatformdestinationTimedurationnoOfBookingsoriginoriginCodeoriginPlatformoriginTimeprice1ACprice2ACprice3ACpriceChairCarpriceChairCarACpriceSLregionreturnTrainNorunsOnseats1ACseats2ACseats3ACseatsChairCarseatsChairCarACseatsSLtrainNametrainNo}= req.body;

if(!trainsId||isNaN(trainsId))
{
console.error("Invalid trainsId sent");
 res.status(404).send("Invalid trainsId");
}
let updateFields= [];
 let updateValues=[];

if(destination){

updateFields.push('destination=?');
updateValues.push(destination);
}
if(destinationCode){

updateFields.push('destinationCode=?');
updateValues.push(destinationCode);
}
if(destinationPlatform){

updateFields.push('destinationPlatform=?');
updateValues.push(destinationPlatform);
}
if(destinationTime){

updateFields.push('destinationTime=?');
updateValues.push(destinationTime);
}
if(duration){

updateFields.push('duration=?');
updateValues.push(duration);
}
if(noOfBookings){

updateFields.push('noOfBookings=?');
updateValues.push(noOfBookings);
}
if(origin){

updateFields.push('origin=?');
updateValues.push(origin);
}
if(originCode){

updateFields.push('originCode=?');
updateValues.push(originCode);
}
if(originPlatform){

updateFields.push('originPlatform=?');
updateValues.push(originPlatform);
}
if(originTime){

updateFields.push('originTime=?');
updateValues.push(originTime);
}
if(price1AC){

updateFields.push('price1AC=?');
updateValues.push(price1AC);
}
if(price2AC){

updateFields.push('price2AC=?');
updateValues.push(price2AC);
}
if(price3AC){

updateFields.push('price3AC=?');
updateValues.push(price3AC);
}
if(priceChairCar){

updateFields.push('priceChairCar=?');
updateValues.push(priceChairCar);
}
if(priceChairCarAC){

updateFields.push('priceChairCarAC=?');
updateValues.push(priceChairCarAC);
}
if(priceSL){

updateFields.push('priceSL=?');
updateValues.push(priceSL);
}
if(region){

updateFields.push('region=?');
updateValues.push(region);
}
if(returnTrainNo){

updateFields.push('returnTrainNo=?');
updateValues.push(returnTrainNo);
}
if(runsOn){

updateFields.push('runsOn=?');
updateValues.push(runsOn);
}
if(seats1AC){

updateFields.push('seats1AC=?');
updateValues.push(seats1AC);
}
if(seats2AC){

updateFields.push('seats2AC=?');
updateValues.push(seats2AC);
}
if(seats3AC){

updateFields.push('seats3AC=?');
updateValues.push(seats3AC);
}
if(seatsChairCar){

updateFields.push('seatsChairCar=?');
updateValues.push(seatsChairCar);
}
if(seatsChairCarAC){

updateFields.push('seatsChairCarAC=?');
updateValues.push(seatsChairCarAC);
}
if(seatsSL){

updateFields.push('seatsSL=?');
updateValues.push(seatsSL);
}
if(trainName){

updateFields.push('trainName=?');
updateValues.push(trainName);
}
if(trainNo){

updateFields.push('trainNo=?');
updateValues.push(trainNo);
}
updateValues.push(classes)
if(updateFields.length==0)
 console.error("NO field value specified for update")

const query  = `update trains set ${userFields.join(',')} where trainNo= '?'`;
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query( query , updateValues, (err , result)=>{
if(err)
 {console.error("Failed to update trains");
 res.status(400).send("An error occured", err);
}
res.status(200).send(result);
 });
 } 

module.exports={gettrains ,addtrains ,deletetrains , updatetrains ,gettrainsBy, gettrainsLike ,applyFilterSearchtrains};





// controllers/weather_info.js





const {conn} = require('../db.js');
const mysql = require('mysql2');


const axios=require('axios');

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
// getweather_info


const getweather_info = (req,res)=> {

console.log("getweather_info() called");
 try{
 conn.query("Select * from weather_info" ,(err , results) =>    { 
if(err)
 console.error("Failed to get weather_info",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the weather_info",err);
 res.status(500).send({error:err});
}
};
// getweather_infoBy


// getweather_infoBy


const getweather_infoBy = (req,res)=> {

console.log("getweather_info() called");
 try{
 conn.query("Select * from weather_info where WeatherID = ?" ,[req.params.id] ,(err , results) =>    { 
//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
if(err)
 console.error("Failed to get weather_info",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the weather_info",err);
 res.status(500).send({error:err});
}
};
// getweather_infoLike


const getweather_infoLike = (req,res)=> {

console.log("getweather_info() called");
 try{
 conn.query("Select * from weather_info where  WeatherCondition like ? ",[`${req.params.id}%`],(err , results) =>    { 
if(err)
 console.error("Failed to get weather_info",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the weather_info",err);
 res.status(500).send({error:err});
}
};
// applyFilterSearchweather_info


const applyFilterSearchweather_info = (req,res)=> {

console.log("applyFilterSearchweather_info() called");
console.log("params received is",req.query);

const { id ,Humidity,PlaceID,WeatherID,WindSpeed }= req.query;

let checkFields =[];
let checkValues=[];

checkFields.push("true");
 
const query =`Select * from weather_info where ${checkFields.join(" and ")} and (WeatherCondition like ? ` 
checkValues.push(`${req.query.id}%`);


 try{
 conn.query(query, checkValues,(err , results) =>    { 
if(err)
 console.error("Failed to applyFilterSearchweather_info",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the applyFilterSearchweather_info",err);
 res.status(500).send({error:err});
}
};


// addweather_info


//weather_infoid might not be auto generate in that case you need to manually insert weather_infoId or weather_infoID

const addweather_info= (req ,res) => {
if(!conn)
 console.log("conn not properly linked to routes");
 console.log("addweather_info Called");
//weather_infoid might not be auto generate in that case you need to manually insert weather_infoId or weather_infoID

const {Date,Humidity,PlaceID,Temperature,WeatherCondition,WindSpeed}=req.body;console.log(req.body);
    conn.query("Insert into weather_info(Date ,Humidity ,PlaceID ,Temperature ,WeatherCondition ,WindSpeed) values (?,?,?,?,?,?)", [Date,Humidity,PlaceID,Temperature,WeatherCondition,WindSpeed], (err , result) =>
 {
 if(err)
 console.error("Failed to add weather_info");
else
{console.log("Successfully created weather_info");

res.status(201).json(result);
 }
});
};

// deleteweather_info


const deleteweather_info= async (req , res)=>{
console.log("deleteweather_info() called");
if(!conn)
console.error("conn was not routed properly");
 console.log("deleteweather_info called");

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query("Delete from weather_info where WeatherID =?",[req.params.id], (err, result)=>
{
if(!err)
res.status(200).send("User deleted successfully");
else
{

console.error("An error occured", err);
}
});
};

// updateweather_info




const updateweather_info =async (req , res) => { 
console.log("updateweather_info() called");
if(!conn)
 console.error("conn not linked to routes"); 

const weather_infoId= req.params.id

const {
CreatedAtDateHumidityPlaceIDTemperatureUpdatedAtWeatherConditionWeatherIDWindSpeed}= req.body;

if(!weather_infoId||isNaN(weather_infoId))
{
console.error("Invalid weather_infoId sent");
 res.status(404).send("Invalid weather_infoId");
}
let updateFields= [];
 let updateValues=[];

if(Date){

updateFields.push('Date=?');
updateValues.push(Date);
}
if(Humidity){

updateFields.push('Humidity=?');
updateValues.push(Humidity);
}
if(PlaceID){

updateFields.push('PlaceID=?');
updateValues.push(PlaceID);
}
if(Temperature){

updateFields.push('Temperature=?');
updateValues.push(Temperature);
}
if(UpdatedAt){

updateFields.push('UpdatedAt=?');
updateValues.push(UpdatedAt);
}
if(WeatherCondition){

updateFields.push('WeatherCondition=?');
updateValues.push(WeatherCondition);
}
if(WeatherID){

updateFields.push('WeatherID=?');
updateValues.push(WeatherID);
}
if(WindSpeed){

updateFields.push('WindSpeed=?');
updateValues.push(WindSpeed);
}
updateValues.push(CreatedAt)
if(updateFields.length==0)
 console.error("NO field value specified for update")

const query  = `update weather_info set ${userFields.join(',')} where WeatherID= '?'`;
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query( query , updateValues, (err , result)=>{
if(err)
 {console.error("Failed to update weather_info");
 res.status(400).send("An error occured", err);
}
res.status(200).send(result);
 });
 } 

module.exports={getweather_info ,addweather_info ,deleteweather_info , updateweather_info ,getweather_infoBy, getweather_infoLike ,applyFilterSearchweather_info};



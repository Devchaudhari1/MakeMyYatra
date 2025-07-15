

// controllers/cabdrivers.js





const {conn} = require('../db.js');
const mysql = require('mysql2');


const axios=require('axios');

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
// getcabdrivers


const getcabdrivers = (req,res)=> {

console.log("getcabdrivers() called");
 try{
 conn.query("Select * from cabdrivers" ,(err , results) =>    { 
if(err)
 console.error("Failed to get cabdrivers",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the cabdrivers",err);
 res.status(500).send({error:err});
}
};
// getcabdriversBy


// getcabdriversBy


const getcabdriversBy = (req,res)=> {

console.log("getcabdrivers() called");
 try{
 conn.query("Select * from cabdrivers where carID = ?" ,[req.params.id] ,(err , results) =>    { 
//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
if(err)
 console.error("Failed to get cabdrivers",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the cabdrivers",err);
 res.status(500).send({error:err});
}
};
// getcabdriversLike


const getcabdriversLike = (req,res)=> {

console.log("getcabdrivers() called");
 try{
 conn.query("Select * from cabdrivers where  carModel like ? or carNo like ? or carType like ? or driverName like ? or driverPhone like ? or licenseNumber like ? ",[`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`],(err , results) =>    { 
if(err)
 console.error("Failed to get cabdrivers",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the cabdrivers",err);
 res.status(500).send({error:err});
}
};
// applyFilterSearchcabdrivers


const applyFilterSearchcabdrivers = (req,res)=> {

console.log("applyFilterSearchcabdrivers() called");
console.log("params received is",req.query);

const { id ,availability,carID,totalTrips }= req.query;

let checkFields =[];
let checkValues=[];

checkFields.push("true");
 
if(availability)
{checkFields.push(`availability = ?`);
 checkValues.push(`${availability}` );
}
const query =`Select * from cabdrivers where ${checkFields.join(" and ")} and (carModel like ?  or carNo like ?  or carType like ?  or driverName like ?  or driverPhone like ?  or licenseNumber like ? )` 
checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);


 try{
 conn.query(query, checkValues,(err , results) =>    { 
if(err)
 console.error("Failed to applyFilterSearchcabdrivers",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the applyFilterSearchcabdrivers",err);
 res.status(500).send({error:err});
}
};


// addcabdrivers


//cabdriversid might not be auto generate in that case you need to manually insert cabdriversId or cabdriversID

const addcabdrivers= (req ,res) => {
if(!conn)
 console.log("conn not properly linked to routes");
 console.log("addcabdrivers Called");
//cabdriversid might not be auto generate in that case you need to manually insert cabdriversId or cabdriversID

const {availability,carModel,carNo,carType,driverName,driverPhone,driverRating,earnings,joinDate,lastTripDate,licenseNumber,notes,totalTrips}=req.body;console.log(req.body);
    conn.query("Insert into cabdrivers(availability ,carModel ,carNo ,carType ,driverName ,driverPhone ,driverRating ,earnings ,joinDate ,lastTripDate ,licenseNumber ,notes ,totalTrips) values (?,?,?,?,?,?,?,?,?,?,?,?,?)", [availability,carModel,carNo,carType,driverName,driverPhone,driverRating,earnings,joinDate,lastTripDate,licenseNumber,notes,totalTrips], (err , result) =>
 {
 if(err)
 console.error("Failed to add cabdrivers");
else
{console.log("Successfully created cabdrivers");

res.status(201).json(result);
 }
});
};

// deletecabdrivers


const deletecabdrivers= async (req , res)=>{
console.log("deletecabdrivers() called");
if(!conn)
console.error("conn was not routed properly");
 console.log("deletecabdrivers called");

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query("Delete from cabdrivers where carID =?",[req.params.id], (err, result)=>
{
if(!err)
res.status(200).send("User deleted successfully");
else
{

console.error("An error occured", err);
}
});
};

// updatecabdrivers




const updatecabdrivers =async (req , res) => { 
console.log("updatecabdrivers() called");
if(!conn)
 console.error("conn not linked to routes"); 

const cabdriversId= req.params.id

const {
availabilitycarIDcarModelcarNocarTypedriverNamedriverPhonedriverRatingearningsjoinDatelastTripDatelicenseNumbernotestotalTrips}= req.body;

if(!cabdriversId||isNaN(cabdriversId))
{
console.error("Invalid cabdriversId sent");
 res.status(404).send("Invalid cabdriversId");
}
let updateFields= [];
 let updateValues=[];

if(carID){

updateFields.push('carID=?');
updateValues.push(carID);
}
if(carModel){

updateFields.push('carModel=?');
updateValues.push(carModel);
}
if(carNo){

updateFields.push('carNo=?');
updateValues.push(carNo);
}
if(carType){

updateFields.push('carType=?');
updateValues.push(carType);
}
if(driverName){

updateFields.push('driverName=?');
updateValues.push(driverName);
}
if(driverPhone){

updateFields.push('driverPhone=?');
updateValues.push(driverPhone);
}
if(driverRating){

updateFields.push('driverRating=?');
updateValues.push(driverRating);
}
if(earnings){

updateFields.push('earnings=?');
updateValues.push(earnings);
}
if(joinDate){

updateFields.push('joinDate=?');
updateValues.push(joinDate);
}
if(lastTripDate){

updateFields.push('lastTripDate=?');
updateValues.push(lastTripDate);
}
if(licenseNumber){

updateFields.push('licenseNumber=?');
updateValues.push(licenseNumber);
}
if(notes){

updateFields.push('notes=?');
updateValues.push(notes);
}
if(totalTrips){

updateFields.push('totalTrips=?');
updateValues.push(totalTrips);
}
updateValues.push(availability)
if(updateFields.length==0)
 console.error("NO field value specified for update")

const query  = `update cabdrivers set ${userFields.join(',')} where carID= '?'`;
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query( query , updateValues, (err , result)=>{
if(err)
 {console.error("Failed to update cabdrivers");
 res.status(400).send("An error occured", err);
}
res.status(200).send(result);
 });
 } 

module.exports={getcabdrivers ,addcabdrivers ,deletecabdrivers , updatecabdrivers ,getcabdriversBy, getcabdriversLike ,applyFilterSearchcabdrivers};



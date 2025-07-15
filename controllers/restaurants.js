

// controllers/restaurants.js





const {conn} = require('../db.js');
const mysql = require('mysql2');


const axios=require('axios');

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
// getrestaurants


const getrestaurants = (req,res)=> {

console.log("getrestaurants() called");
 try{
 conn.query("Select * from restaurants" ,(err , results) =>    { 
if(err)
 console.error("Failed to get restaurants",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the restaurants",err);
 res.status(500).send({error:err});
}
};
// getrestaurantsBy


// getrestaurantsBy


const getrestaurantsBy = (req,res)=> {

console.log("getrestaurants() called");
 try{
 conn.query("Select * from restaurants where RestaurantID = ?" ,[req.params.id] ,(err , results) =>    { 
//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
if(err)
 console.error("Failed to get restaurants",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the restaurants",err);
 res.status(500).send({error:err});
}
};
// getrestaurantsLike


const getrestaurantsLike = (req,res)=> {

console.log("getrestaurants() called");
 try{
 conn.query("Select * from restaurants where  City like ? or Cuisine like ? or ImageURL like ? or Location like ? or OpeningHours like ? or RestaurantName like ? or State like ? ",[`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`],(err , results) =>    { 
if(err)
 console.error("Failed to get restaurants",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the restaurants",err);
 res.status(500).send({error:err});
}
};
// applyFilterSearchrestaurants


const applyFilterSearchrestaurants = (req,res)=> {

console.log("applyFilterSearchrestaurants() called");
console.log("params received is",req.query);

const { id ,PriceRange,RestaurantID,UpdatedAt }= req.query;

let checkFields =[];
let checkValues=[];

checkFields.push("true");
 
if(PriceRange)
{checkFields.push(`PriceRange = ?`);
 checkValues.push(`${PriceRange}` );
}
const query =`Select * from restaurants where ${checkFields.join(" and ")} and (City like ?  or Cuisine like ?  or Location like ?  or OpeningHours like ?  or RestaurantName like ?  or State like ? )` 
checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);


 try{
 conn.query(query, checkValues,(err , results) =>    { 
if(err)
 console.error("Failed to applyFilterSearchrestaurants",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the applyFilterSearchrestaurants",err);
 res.status(500).send({error:err});
}
};


// addrestaurants


//restaurantsid might not be auto generate in that case you need to manually insert restaurantsId or restaurantsID

const addrestaurants= (req ,res) => {
if(!conn)
 console.log("conn not properly linked to routes");
 console.log("addrestaurants Called");
//restaurantsid might not be auto generate in that case you need to manually insert restaurantsId or restaurantsID

const {City,Cuisine,ImageURL,Location,OpeningHours,PriceRange,Rating,RestaurantName,State,UpdatedAt}=req.body;console.log(req.body);
    conn.query("Insert into restaurants(City ,Cuisine ,ImageURL ,Location ,OpeningHours ,PriceRange ,Rating ,RestaurantName ,State ,UpdatedAt) values (?,?,?,?,?,?,?,?,?,?)", [City,Cuisine,ImageURL,Location,OpeningHours,PriceRange,Rating,RestaurantName,State,UpdatedAt], (err , result) =>
 {
 if(err)
 console.error("Failed to add restaurants");
else
{console.log("Successfully created restaurants");

res.status(201).json(result);
 }
});
};

// deleterestaurants


const deleterestaurants= async (req , res)=>{
console.log("deleterestaurants() called");
if(!conn)
console.error("conn was not routed properly");
 console.log("deleterestaurants called");

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query("Delete from restaurants where RestaurantID =?",[req.params.id], (err, result)=>
{
if(!err)
res.status(200).send("User deleted successfully");
else
{

console.error("An error occured", err);
}
});
};

// updaterestaurants




const updaterestaurants =async (req , res) => { 
console.log("updaterestaurants() called");
if(!conn)
 console.error("conn not linked to routes"); 

const restaurantsId= req.params.id

const {
CityCreatedAtCuisineImageURLLocationOpeningHoursPriceRangeRatingRestaurantIDRestaurantNameStateUpdatedAt}= req.body;

if(!restaurantsId||isNaN(restaurantsId))
{
console.error("Invalid restaurantsId sent");
 res.status(404).send("Invalid restaurantsId");
}
let updateFields= [];
 let updateValues=[];

if(CreatedAt){

updateFields.push('CreatedAt=?');
updateValues.push(CreatedAt);
}
if(Cuisine){

updateFields.push('Cuisine=?');
updateValues.push(Cuisine);
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
if(PriceRange){

updateFields.push('PriceRange=?');
updateValues.push(PriceRange);
}
if(Rating){

updateFields.push('Rating=?');
updateValues.push(Rating);
}
if(RestaurantID){

updateFields.push('RestaurantID=?');
updateValues.push(RestaurantID);
}
if(RestaurantName){

updateFields.push('RestaurantName=?');
updateValues.push(RestaurantName);
}
if(State){

updateFields.push('State=?');
updateValues.push(State);
}
if(UpdatedAt){

updateFields.push('UpdatedAt=?');
updateValues.push(UpdatedAt);
}
updateValues.push(City)
if(updateFields.length==0)
 console.error("NO field value specified for update")

const query  = `update restaurants set ${userFields.join(',')} where RestaurantID= '?'`;
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query( query , updateValues, (err , result)=>{
if(err)
 {console.error("Failed to update restaurants");
 res.status(400).send("An error occured", err);
}
res.status(200).send(result);
 });
 } 

module.exports={getrestaurants ,addrestaurants ,deleterestaurants , updaterestaurants ,getrestaurantsBy, getrestaurantsLike ,applyFilterSearchrestaurants};



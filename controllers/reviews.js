

// controllers/reviews.js





const {conn} = require('../db.js');
const mysql = require('mysql2');


const axios=require('axios');

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
// getreviews


const getreviews = (req,res)=> {

console.log("getreviews() called");
 try{
 conn.query("Select * from reviews" ,(err , results) =>    { 
if(err)
 console.error("Failed to get reviews",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the reviews",err);
 res.status(500).send({error:err});
}
};
// getreviewsBy


// getreviewsBy


const getreviewsBy = (req,res)=> {

console.log("getreviews() called");
 try{
 conn.query("Select * from reviews where ReviewID = ?" ,[req.params.id] ,(err , results) =>    { 
//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
if(err)
 console.error("Failed to get reviews",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the reviews",err);
 res.status(500).send({error:err});
}
};
// getreviewsLike


const getreviewsLike = (req,res)=> {

console.log("getreviews() called");
 try{
 conn.query("Select * from reviews where ",[`${req.params.id}%`],(err , results) =>    { 
if(err)
 console.error("Failed to get reviews",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the reviews",err);
 res.status(500).send({error:err});
}
};
// applyFilterSearchreviews


const applyFilterSearchreviews = (req,res)=> {

console.log("applyFilterSearchreviews() called");
console.log("params received is",req.query);

const { id ,EntityID,EntityType,ReviewID,UserID }= req.query;

let checkFields =[];
let checkValues=[];

checkFields.push("true");
 
if(EntityType)
{checkFields.push(`EntityType = ?`);
 checkValues.push(`${EntityType}` );
}
const query =`Select * from reviews where ${checkFields.join(" and ")} ` 

 try{
 conn.query(query, checkValues,(err , results) =>    { 
if(err)
 console.error("Failed to applyFilterSearchreviews",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the applyFilterSearchreviews",err);
 res.status(500).send({error:err});
}
};


// addreviews


//reviewsid might not be auto generate in that case you need to manually insert reviewsId or reviewsID

const addreviews= (req ,res) => {
if(!conn)
 console.log("conn not properly linked to routes");
 console.log("addreviews Called");
//reviewsid might not be auto generate in that case you need to manually insert reviewsId or reviewsID

const {Comment,EntityID,EntityType,Rating,UserID}=req.body;console.log(req.body);
    conn.query("Insert into reviews(Comment ,EntityID ,EntityType ,Rating ,UserID) values (?,?,?,?,?)", [Comment,EntityID,EntityType,Rating,UserID], (err , result) =>
 {
 if(err)
 console.error("Failed to add reviews");
else
{console.log("Successfully created reviews");

res.status(201).json(result);
 }
});
};

// deletereviews


const deletereviews= async (req , res)=>{
console.log("deletereviews() called");
if(!conn)
console.error("conn was not routed properly");
 console.log("deletereviews called");

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query("Delete from reviews where ReviewID =?",[req.params.id], (err, result)=>
{
if(!err)
res.status(200).send("User deleted successfully");
else
{

console.error("An error occured", err);
}
});
};

// updatereviews




const updatereviews =async (req , res) => { 
console.log("updatereviews() called");
if(!conn)
 console.error("conn not linked to routes"); 

const reviewsId= req.params.id

const {
CommentEntityIDEntityTypeRatingReviewDateReviewIDUserID}= req.body;

if(!reviewsId||isNaN(reviewsId))
{
console.error("Invalid reviewsId sent");
 res.status(404).send("Invalid reviewsId");
}
let updateFields= [];
 let updateValues=[];

if(EntityID){

updateFields.push('EntityID=?');
updateValues.push(EntityID);
}
if(EntityType){

updateFields.push('EntityType=?');
updateValues.push(EntityType);
}
if(Rating){

updateFields.push('Rating=?');
updateValues.push(Rating);
}
if(ReviewDate){

updateFields.push('ReviewDate=?');
updateValues.push(ReviewDate);
}
if(ReviewID){

updateFields.push('ReviewID=?');
updateValues.push(ReviewID);
}
if(UserID){

updateFields.push('UserID=?');
updateValues.push(UserID);
}
updateValues.push(Comment)
if(updateFields.length==0)
 console.error("NO field value specified for update")

const query  = `update reviews set ${userFields.join(',')} where ReviewID= '?'`;
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query( query , updateValues, (err , result)=>{
if(err)
 {console.error("Failed to update reviews");
 res.status(400).send("An error occured", err);
}
res.status(200).send(result);
 });
 } 

module.exports={getreviews ,addreviews ,deletereviews , updatereviews ,getreviewsBy, getreviewsLike ,applyFilterSearchreviews};



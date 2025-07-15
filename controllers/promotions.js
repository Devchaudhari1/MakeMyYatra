

// controllers/promotions.js





const {conn} = require('../db.js');
const mysql = require('mysql2');


const axios=require('axios');

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
// getpromotions


const getpromotions = (req,res)=> {

console.log("getpromotions() called");
 try{
 conn.query("Select * from promotions" ,(err , results) =>    { 
if(err)
 console.error("Failed to get promotions",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the promotions",err);
 res.status(500).send({error:err});
}
};
// getpromotionsBy


// getpromotionsBy


const getpromotionsBy = (req,res)=> {

console.log("getpromotions() called");
 try{
 conn.query("Select * from promotions where PromotionID = ?" ,[req.params.id] ,(err , results) =>    { 
//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
if(err)
 console.error("Failed to get promotions",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the promotions",err);
 res.status(500).send({error:err});
}
};
// getpromotionsLike


const getpromotionsLike = (req,res)=> {

console.log("getpromotions() called");
 try{
 conn.query("Select * from promotions where  PromotionCode like ? ",[`${req.params.id}%`],(err , results) =>    { 
if(err)
 console.error("Failed to get promotions",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the promotions",err);
 res.status(500).send({error:err});
}
};
// applyFilterSearchpromotions


const applyFilterSearchpromotions = (req,res)=> {

console.log("applyFilterSearchpromotions() called");
console.log("params received is",req.query);

const { id ,ApplicableEntityID,ApplicableEntityType,DiscountType,PromotionID,UpdatedAt }= req.query;

let checkFields =[];
let checkValues=[];

checkFields.push("true");
 
if(ApplicableEntityType)
{checkFields.push(`ApplicableEntityType = ?`);
 checkValues.push(`${ApplicableEntityType}` );
}
if(DiscountType)
{checkFields.push(`DiscountType = ?`);
 checkValues.push(`${DiscountType}` );
}
const query =`Select * from promotions where ${checkFields.join(" and ")} and (PromotionCode like ? ` 
checkValues.push(`${req.query.id}%`);


 try{
 conn.query(query, checkValues,(err , results) =>    { 
if(err)
 console.error("Failed to applyFilterSearchpromotions",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the applyFilterSearchpromotions",err);
 res.status(500).send({error:err});
}
};


// addpromotions


//promotionsid might not be auto generate in that case you need to manually insert promotionsId or promotionsID

const addpromotions= (req ,res) => {
if(!conn)
 console.log("conn not properly linked to routes");
 console.log("addpromotions Called");
//promotionsid might not be auto generate in that case you need to manually insert promotionsId or promotionsID

const {ApplicableEntityID,ApplicableEntityType,CurrentUsage,Description,DiscountType,DiscountValue,EndDate,IsActive,MaxUsage,MinOrderAmount,PromotionCode,StartDate,UpdatedAt}=req.body;console.log(req.body);
    conn.query("Insert into promotions(ApplicableEntityID ,ApplicableEntityType ,CurrentUsage ,Description ,DiscountType ,DiscountValue ,EndDate ,IsActive ,MaxUsage ,MinOrderAmount ,PromotionCode ,StartDate ,UpdatedAt) values (?,?,?,?,?,?,?,?,?,?,?,?,?)", [ApplicableEntityID,ApplicableEntityType,CurrentUsage,Description,DiscountType,DiscountValue,EndDate,IsActive,MaxUsage,MinOrderAmount,PromotionCode,StartDate,UpdatedAt], (err , result) =>
 {
 if(err)
 console.error("Failed to add promotions");
else
{console.log("Successfully created promotions");

res.status(201).json(result);
 }
});
};

// deletepromotions


const deletepromotions= async (req , res)=>{
console.log("deletepromotions() called");
if(!conn)
console.error("conn was not routed properly");
 console.log("deletepromotions called");

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query("Delete from promotions where PromotionID =?",[req.params.id], (err, result)=>
{
if(!err)
res.status(200).send("User deleted successfully");
else
{

console.error("An error occured", err);
}
});
};

// updatepromotions




const updatepromotions =async (req , res) => { 
console.log("updatepromotions() called");
if(!conn)
 console.error("conn not linked to routes"); 

const promotionsId= req.params.id

const {
ApplicableEntityIDApplicableEntityTypeCreatedAtCurrentUsageDescriptionDiscountTypeDiscountValueEndDateIsActiveMaxUsageMinOrderAmountPromotionCodePromotionIDStartDateUpdatedAt}= req.body;

if(!promotionsId||isNaN(promotionsId))
{
console.error("Invalid promotionsId sent");
 res.status(404).send("Invalid promotionsId");
}
let updateFields= [];
 let updateValues=[];

if(ApplicableEntityType){

updateFields.push('ApplicableEntityType=?');
updateValues.push(ApplicableEntityType);
}
if(CreatedAt){

updateFields.push('CreatedAt=?');
updateValues.push(CreatedAt);
}
if(CurrentUsage){

updateFields.push('CurrentUsage=?');
updateValues.push(CurrentUsage);
}
if(Description){

updateFields.push('Description=?');
updateValues.push(Description);
}
if(DiscountType){

updateFields.push('DiscountType=?');
updateValues.push(DiscountType);
}
if(DiscountValue){

updateFields.push('DiscountValue=?');
updateValues.push(DiscountValue);
}
if(EndDate){

updateFields.push('EndDate=?');
updateValues.push(EndDate);
}
if(IsActive){

updateFields.push('IsActive=?');
updateValues.push(IsActive);
}
if(MaxUsage){

updateFields.push('MaxUsage=?');
updateValues.push(MaxUsage);
}
if(MinOrderAmount){

updateFields.push('MinOrderAmount=?');
updateValues.push(MinOrderAmount);
}
if(PromotionCode){

updateFields.push('PromotionCode=?');
updateValues.push(PromotionCode);
}
if(PromotionID){

updateFields.push('PromotionID=?');
updateValues.push(PromotionID);
}
if(StartDate){

updateFields.push('StartDate=?');
updateValues.push(StartDate);
}
if(UpdatedAt){

updateFields.push('UpdatedAt=?');
updateValues.push(UpdatedAt);
}
updateValues.push(ApplicableEntityID)
if(updateFields.length==0)
 console.error("NO field value specified for update")

const query  = `update promotions set ${userFields.join(',')} where PromotionID= '?'`;
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query( query , updateValues, (err , result)=>{
if(err)
 {console.error("Failed to update promotions");
 res.status(400).send("An error occured", err);
}
res.status(200).send(result);
 });
 } 

module.exports={getpromotions ,addpromotions ,deletepromotions , updatepromotions ,getpromotionsBy, getpromotionsLike ,applyFilterSearchpromotions};



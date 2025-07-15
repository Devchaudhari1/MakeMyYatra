

// controllers/payments.js





const {conn} = require('../db.js');
const mysql = require('mysql2');


const axios=require('axios');

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
// getpayments


const getpayments = (req,res)=> {

console.log("getpayments() called");
 try{
 conn.query("Select * from payments" ,(err , results) =>    { 
if(err)
 console.error("Failed to get payments",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the payments",err);
 res.status(500).send({error:err});
}
};
// getpaymentsBy


// getpaymentsBy


const getpaymentsBy = (req,res)=> {

console.log("getpayments() called");
 try{
 conn.query("Select * from payments where PaymentID = ?" ,[req.params.id] ,(err , results) =>    { 
//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
if(err)
 console.error("Failed to get payments",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the payments",err);
 res.status(500).send({error:err});
}
};
// getpaymentsLike


const getpaymentsLike = (req,res)=> {

console.log("getpayments() called");
 try{
 conn.query("Select * from payments where  Coupons like ? or TransactionID like ? ",[`${req.params.id}%`,`${req.params.id}%`],(err , results) =>    { 
if(err)
 console.error("Failed to get payments",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the payments",err);
 res.status(500).send({error:err});
}
};
// applyFilterSearchpayments


const applyFilterSearchpayments = (req,res)=> {

console.log("applyFilterSearchpayments() called");
console.log("params received is",req.query);

const { id ,EntityID,EntityType,PaymentID,PaymentMethod,PaymentStatus,PromotionID,TransactionID,UserID }= req.query;

let checkFields =[];
let checkValues=[];

checkFields.push("true");
 
if(EntityType)
{checkFields.push(`EntityType = ?`);
 checkValues.push(`${EntityType}` );
}
if(PaymentMethod)
{checkFields.push(`PaymentMethod = ?`);
 checkValues.push(`${PaymentMethod}` );
}
if(PaymentStatus)
{checkFields.push(`PaymentStatus = ?`);
 checkValues.push(`${PaymentStatus}` );
}
const query =`Select * from payments where ${checkFields.join(" and ")} and (Coupons like ? ` 
checkValues.push(`${req.query.id}%`);


 try{
 conn.query(query, checkValues,(err , results) =>    { 
if(err)
 console.error("Failed to applyFilterSearchpayments",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the applyFilterSearchpayments",err);
 res.status(500).send({error:err});
}
};


// addpayments


//paymentsid might not be auto generate in that case you need to manually insert paymentsId or paymentsID

const addpayments= (req ,res) => {
if(!conn)
 console.log("conn not properly linked to routes");
 console.log("addpayments Called");
//paymentsid might not be auto generate in that case you need to manually insert paymentsId or paymentsID

const {Amount,Coupons,Discounts,EntityID,EntityType,Notes,PaymentMethod,PaymentStatus,PromotionID,TransactionID,UserID}=req.body;console.log(req.body);
    conn.query("Insert into payments(Amount ,Coupons ,Discounts ,EntityID ,EntityType ,Notes ,PaymentMethod ,PaymentStatus ,PromotionID ,TransactionID ,UserID) values (?,?,?,?,?,?,?,?,?,?,?)", [Amount,Coupons,Discounts,EntityID,EntityType,Notes,PaymentMethod,PaymentStatus,PromotionID,TransactionID,UserID], (err , result) =>
 {
 if(err)
 console.error("Failed to add payments");
else
{console.log("Successfully created payments");

res.status(201).json(result);
 }
});
};

// deletepayments


const deletepayments= async (req , res)=>{
console.log("deletepayments() called");
if(!conn)
console.error("conn was not routed properly");
 console.log("deletepayments called");

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query("Delete from payments where PaymentID =?",[req.params.id], (err, result)=>
{
if(!err)
res.status(200).send("User deleted successfully");
else
{

console.error("An error occured", err);
}
});
};

// updatepayments




const updatepayments =async (req , res) => { 
console.log("updatepayments() called");
if(!conn)
 console.error("conn not linked to routes"); 

const paymentsId= req.params.id

const {
AmountCouponsDiscountsEntityIDEntityTypeNotesPaymentDatePaymentIDPaymentMethodPaymentStatusPromotionIDTransactionIDUserID}= req.body;

if(!paymentsId||isNaN(paymentsId))
{
console.error("Invalid paymentsId sent");
 res.status(404).send("Invalid paymentsId");
}
let updateFields= [];
 let updateValues=[];

if(Coupons){

updateFields.push('Coupons=?');
updateValues.push(Coupons);
}
if(Discounts){

updateFields.push('Discounts=?');
updateValues.push(Discounts);
}
if(EntityID){

updateFields.push('EntityID=?');
updateValues.push(EntityID);
}
if(EntityType){

updateFields.push('EntityType=?');
updateValues.push(EntityType);
}
if(Notes){

updateFields.push('Notes=?');
updateValues.push(Notes);
}
if(PaymentDate){

updateFields.push('PaymentDate=?');
updateValues.push(PaymentDate);
}
if(PaymentID){

updateFields.push('PaymentID=?');
updateValues.push(PaymentID);
}
if(PaymentMethod){

updateFields.push('PaymentMethod=?');
updateValues.push(PaymentMethod);
}
if(PaymentStatus){

updateFields.push('PaymentStatus=?');
updateValues.push(PaymentStatus);
}
if(PromotionID){

updateFields.push('PromotionID=?');
updateValues.push(PromotionID);
}
if(TransactionID){

updateFields.push('TransactionID=?');
updateValues.push(TransactionID);
}
if(UserID){

updateFields.push('UserID=?');
updateValues.push(UserID);
}
updateValues.push(Amount)
if(updateFields.length==0)
 console.error("NO field value specified for update")

const query  = `update payments set ${userFields.join(',')} where PaymentID= '?'`;
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query( query , updateValues, (err , result)=>{
if(err)
 {console.error("Failed to update payments");
 res.status(400).send("An error occured", err);
}
res.status(200).send(result);
 });
 } 

module.exports={getpayments ,addpayments ,deletepayments , updatepayments ,getpaymentsBy, getpaymentsLike ,applyFilterSearchpayments};





// controllers/payment_gateway_fees.js





const {conn} = require('../db.js');
const mysql = require('mysql2');


const axios=require('axios');

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
// getpayment_gateway_fees


const getpayment_gateway_fees = (req,res)=> {

console.log("getpayment_gateway_fees() called");
 try{
 conn.query("Select * from payment_gateway_fees" ,(err , results) =>    { 
if(err)
 console.error("Failed to get payment_gateway_fees",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the payment_gateway_fees",err);
 res.status(500).send({error:err});
}
};
// getpayment_gateway_feesBy


// getpayment_gateway_feesBy


const getpayment_gateway_feesBy = (req,res)=> {

console.log("getpayment_gateway_fees() called");
 try{
 conn.query("Select * from payment_gateway_fees where FeeID = ?" ,[req.params.id] ,(err , results) =>    { 
//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
if(err)
 console.error("Failed to get payment_gateway_fees",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the payment_gateway_fees",err);
 res.status(500).send({error:err});
}
};
// getpayment_gateway_feesLike


const getpayment_gateway_feesLike = (req,res)=> {

console.log("getpayment_gateway_fees() called");
 try{
 conn.query("Select * from payment_gateway_fees where  Currency like ? TransactionID like ?",[`${req.params.id}%`],(err , results) =>    { 
if(err)
 console.error("Failed to get payment_gateway_fees",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the payment_gateway_fees",err);
 res.status(500).send({error:err});
}
};
// applyFilterSearchpayment_gateway_fees


const applyFilterSearchpayment_gateway_fees = (req,res)=> {

console.log("applyFilterSearchpayment_gateway_fees() called");
console.log("params received is",req.query);

const { id ,FeeID,FeeType,TransactionID }= req.query;

let checkFields =[];
let checkValues=[];

checkFields.push("true");
 
if(FeeType)
{checkFields.push(`FeeType = ?`);
 checkValues.push(`${FeeType}` );
}
const query =`Select * from payment_gateway_fees where ${checkFields.join(" and ")} and (Currency like ? ` 
checkValues.push(`${req.query.id}%`);


 try{
 conn.query(query, checkValues,(err , results) =>    { 
if(err)
 console.error("Failed to applyFilterSearchpayment_gateway_fees",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the applyFilterSearchpayment_gateway_fees",err);
 res.status(500).send({error:err});
}
};


// addpayment_gateway_fees


//payment_gateway_feesid might not be auto generate in that case you need to manually insert payment_gateway_feesId or payment_gateway_feesID

const addpayment_gateway_fees= (req ,res) => {
if(!conn)
 console.log("conn not properly linked to routes");
 console.log("addpayment_gateway_fees Called");
//payment_gateway_feesid might not be auto generate in that case you need to manually insert payment_gateway_feesId or payment_gateway_feesID

const {Currency,FeeAmount,FeeDescription,FeeType,GatewayResponse,Notes,TransactionID}=req.body;console.log(req.body);
    conn.query("Insert into payment_gateway_fees(Currency ,FeeAmount ,FeeDescription ,FeeType ,GatewayResponse ,Notes ,TransactionID) values (?,?,?,?,?,?,?)", [Currency,FeeAmount,FeeDescription,FeeType,GatewayResponse,Notes,TransactionID], (err , result) =>
 {
 if(err)
 console.error("Failed to add payment_gateway_fees");
else
{console.log("Successfully created payment_gateway_fees");

res.status(201).json(result);
 }
});
};

// deletepayment_gateway_fees


const deletepayment_gateway_fees= async (req , res)=>{
console.log("deletepayment_gateway_fees() called");
if(!conn)
console.error("conn was not routed properly");
 console.log("deletepayment_gateway_fees called");

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query("Delete from payment_gateway_fees where FeeID =?",[req.params.id], (err, result)=>
{
if(!err)
res.status(200).send("User deleted successfully");
else
{

console.error("An error occured", err);
}
});
};

// updatepayment_gateway_fees




const updatepayment_gateway_fees =async (req , res) => { 
console.log("updatepayment_gateway_fees() called");
if(!conn)
 console.error("conn not linked to routes"); 

const payment_gateway_feesId= req.params.id

const {
CurrencyFeeAmountFeeDateFeeDescriptionFeeIDFeeTypeGatewayResponseNotesTransactionID}= req.body;

if(!payment_gateway_feesId||isNaN(payment_gateway_feesId))
{
console.error("Invalid payment_gateway_feesId sent");
 res.status(404).send("Invalid payment_gateway_feesId");
}
let updateFields= [];
 let updateValues=[];

if(FeeAmount){

updateFields.push('FeeAmount=?');
updateValues.push(FeeAmount);
}
if(FeeDate){

updateFields.push('FeeDate=?');
updateValues.push(FeeDate);
}
if(FeeDescription){

updateFields.push('FeeDescription=?');
updateValues.push(FeeDescription);
}
if(FeeID){

updateFields.push('FeeID=?');
updateValues.push(FeeID);
}
if(FeeType){

updateFields.push('FeeType=?');
updateValues.push(FeeType);
}
if(GatewayResponse){

updateFields.push('GatewayResponse=?');
updateValues.push(GatewayResponse);
}
if(Notes){

updateFields.push('Notes=?');
updateValues.push(Notes);
}
if(TransactionID){

updateFields.push('TransactionID=?');
updateValues.push(TransactionID);
}
updateValues.push(Currency)
if(updateFields.length==0)
 console.error("NO field value specified for update")

const query  = `update payment_gateway_fees set ${userFields.join(',')} where FeeID= '?'`;
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query( query , updateValues, (err , result)=>{
if(err)
 {console.error("Failed to update payment_gateway_fees");
 res.status(400).send("An error occured", err);
}
res.status(200).send(result);
 });
 } 

module.exports={getpayment_gateway_fees ,addpayment_gateway_fees ,deletepayment_gateway_fees , updatepayment_gateway_fees ,getpayment_gateway_feesBy, getpayment_gateway_feesLike ,applyFilterSearchpayment_gateway_fees};





// controllers/payment_gateway_transactions.js





const {conn} = require('../db.js');
const mysql = require('mysql2');


const axios=require('axios');

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
// getpayment_gateway_transactions


const getpayment_gateway_transactions = (req,res)=> {

console.log("getpayment_gateway_transactions() called");
 try{
 conn.query("Select * from payment_gateway_transactions" ,(err , results) =>    { 
if(err)
 console.error("Failed to get payment_gateway_transactions",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the payment_gateway_transactions",err);
 res.status(500).send({error:err});
}
};
// getpayment_gateway_transactionsBy


// getpayment_gateway_transactionsBy


const getpayment_gateway_transactionsBy = (req,res)=> {

console.log("getpayment_gateway_transactions() called");
 try{
 conn.query("Select * from payment_gateway_transactions where TransactionID = ?" ,[req.params.id] ,(err , results) =>    { 
//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
if(err)
 console.error("Failed to get payment_gateway_transactions",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the payment_gateway_transactions",err);
 res.status(500).send({error:err});
}
};
// getpayment_gateway_transactionsLike


const getpayment_gateway_transactionsLike = (req,res)=> {

console.log("getpayment_gateway_transactions() called");
 try{
 conn.query("Select * from payment_gateway_transactions where  Currency like ? or GatewayTransactionID like ? or TransactionID like ? ",[`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`],(err , results) =>    { 
if(err)
 console.error("Failed to get payment_gateway_transactions",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the payment_gateway_transactions",err);
 res.status(500).send({error:err});
}
};
// applyFilterSearchpayment_gateway_transactions


const applyFilterSearchpayment_gateway_transactions = (req,res)=> {

console.log("applyFilterSearchpayment_gateway_transactions() called");
console.log("params received is",req.query);

const { id ,GatewayTransactionID,PaymentGateway,PaymentStatus,TransactionID,UserID }= req.query;

let checkFields =[];
let checkValues=[];

checkFields.push("true");
 
if(PaymentGateway)
{checkFields.push(`PaymentGateway = ?`);
 checkValues.push(`${PaymentGateway}` );
}
if(PaymentStatus)
{checkFields.push(`PaymentStatus = ?`);
 checkValues.push(`${PaymentStatus}` );
}
const query =`Select * from payment_gateway_transactions where ${checkFields.join(" and ")} and (Currency like ? ` 
checkValues.push(`${req.query.id}%`);
 try{
 conn.query(query, checkValues,(err , results) =>    { 
if(err)
 console.error("Failed to applyFilterSearchpayment_gateway_transactions",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the applyFilterSearchpayment_gateway_transactions",err);
 res.status(500).send({error:err});
}
};


// addpayment_gateway_transactions


//payment_gateway_transactionsid might not be auto generate in that case you need to manually insert payment_gateway_transactionsId or payment_gateway_transactionsID

const addpayment_gateway_transactions= (req ,res) => {
if(!conn)
 console.log("conn not properly linked to routes");
 console.log("addpayment_gateway_transactions Called");
//payment_gateway_transactionsid might not be auto generate in that case you need to manually insert payment_gateway_transactionsId or payment_gateway_transactionsID

const {Amount,Currency,GatewayResponse,GatewayTransactionID,Notes,PaymentGateway,PaymentStatus,RefundAmount,TransactionID,UserID}=req.body;console.log(req.body);
    conn.query("Insert into payment_gateway_transactions(Amount ,Currency ,GatewayResponse ,GatewayTransactionID ,Notes ,PaymentGateway ,PaymentStatus ,RefundAmount ,TransactionID ,UserID) values (?,?,?,?,?,?,?,?,?,?)", [Amount,Currency,GatewayResponse,GatewayTransactionID,Notes,PaymentGateway,PaymentStatus,RefundAmount,TransactionID,UserID], (err , result) =>
 {
 if(err)
 console.error("Failed to add payment_gateway_transactions");
else
{console.log("Successfully created payment_gateway_transactions");

res.status(201).json(result);
 }
});
};

// deletepayment_gateway_transactions


const deletepayment_gateway_transactions= async (req , res)=>{
console.log("deletepayment_gateway_transactions() called");
if(!conn)
console.error("conn was not routed properly");
 console.log("deletepayment_gateway_transactions called");

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query("Delete from payment_gateway_transactions where TransactionID =?",[req.params.id], (err, result)=>
{
if(!err)
res.status(200).send("User deleted successfully");
else
{

console.error("An error occured", err);
}
});
};

// updatepayment_gateway_transactions




const updatepayment_gateway_transactions =async (req , res) => { 
console.log("updatepayment_gateway_transactions() called");
if(!conn)
 console.error("conn not linked to routes"); 

const payment_gateway_transactionsId= req.params.id

const {
AmountCurrencyGatewayResponseGatewayTransactionIDNotesPaymentDatePaymentGatewayPaymentStatusRefundAmountRefundDateTransactionIDUserID}= req.body;

if(!payment_gateway_transactionsId||isNaN(payment_gateway_transactionsId))
{
console.error("Invalid payment_gateway_transactionsId sent");
 res.status(404).send("Invalid payment_gateway_transactionsId");
}
let updateFields= [];
 let updateValues=[];

if(Currency){

updateFields.push('Currency=?');
updateValues.push(Currency);
}
if(GatewayResponse){

updateFields.push('GatewayResponse=?');
updateValues.push(GatewayResponse);
}
if(GatewayTransactionID){

updateFields.push('GatewayTransactionID=?');
updateValues.push(GatewayTransactionID);
}
if(Notes){

updateFields.push('Notes=?');
updateValues.push(Notes);
}
if(PaymentDate){

updateFields.push('PaymentDate=?');
updateValues.push(PaymentDate);
}
if(PaymentGateway){

updateFields.push('PaymentGateway=?');
updateValues.push(PaymentGateway);
}
if(PaymentStatus){

updateFields.push('PaymentStatus=?');
updateValues.push(PaymentStatus);
}
if(RefundAmount){

updateFields.push('RefundAmount=?');
updateValues.push(RefundAmount);
}
if(RefundDate){

updateFields.push('RefundDate=?');
updateValues.push(RefundDate);
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

const query  = `update payment_gateway_transactions set ${userFields.join(',')} where TransactionID= '?'`;
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query( query , updateValues, (err , result)=>{
if(err)
 {console.error("Failed to update payment_gateway_transactions");
 res.status(400).send("An error occured", err);
}
res.status(200).send(result);
 });
 } 

module.exports={getpayment_gateway_transactions ,addpayment_gateway_transactions ,deletepayment_gateway_transactions , updatepayment_gateway_transactions ,getpayment_gateway_transactionsBy, getpayment_gateway_transactionsLike ,applyFilterSearchpayment_gateway_transactions};



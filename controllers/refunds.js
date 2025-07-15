

// controllers/refunds.js





const {conn} = require('../db.js');
const mysql = require('mysql2');


const axios=require('axios');

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
// getrefunds


const getrefunds = (req,res)=> {

console.log("getrefunds() called");
 try{
 conn.query("Select * from refunds" ,(err , results) =>    { 
if(err)
 console.error("Failed to get refunds",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the refunds",err);
 res.status(500).send({error:err});
}
};
// getrefundsBy


// getrefundsBy


const getrefundsBy = (req,res)=> {

console.log("getrefunds() called");
 try{
 conn.query("Select * from refunds where RefundID = ?" ,[req.params.id] ,(err , results) =>    { 
//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
if(err)
 console.error("Failed to get refunds",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the refunds",err);
 res.status(500).send({error:err});
}
};
// getrefundsLike


const getrefundsLike = (req,res)=> {

console.log("getrefunds() called");
 try{
 conn.query("Select * from refunds where  Currency like ? or GatewayRefundID like ? TransactionID like ?",[`${req.params.id}%`,`${req.params.id}%`],(err , results) =>    { 
if(err)
 console.error("Failed to get refunds",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the refunds",err);
 res.status(500).send({error:err});
}
};
// applyFilterSearchrefunds


const applyFilterSearchrefunds = (req,res)=> {

console.log("applyFilterSearchrefunds() called");
console.log("params received is",req.query);

const { id ,GatewayRefundID,RefundID,RefundReason,RefundStatus,TransactionID }= req.query;

let checkFields =[];
let checkValues=[];

checkFields.push("true");
 
if(RefundReason)
{checkFields.push(`RefundReason = ?`);
 checkValues.push(`${RefundReason}` );
}
if(RefundStatus)
{checkFields.push(`RefundStatus = ?`);
 checkValues.push(`${RefundStatus}` );
}
const query =`Select * from refunds where ${checkFields.join(" and ")} and (Currency like ? ` 
checkValues.push(`${req.query.id}%`);


 try{
 conn.query(query, checkValues,(err , results) =>    { 
if(err)
 console.error("Failed to applyFilterSearchrefunds",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the applyFilterSearchrefunds",err);
 res.status(500).send({error:err});
}
};


// addrefunds


//refundsid might not be auto generate in that case you need to manually insert refundsId or refundsID

const addrefunds= (req ,res) => {
if(!conn)
 console.log("conn not properly linked to routes");
 console.log("addrefunds Called");
//refundsid might not be auto generate in that case you need to manually insert refundsId or refundsID

const {Currency,GatewayRefundID,GatewayResponse,Notes,RefundAmount,RefundReason,RefundStatus,TransactionID}=req.body;console.log(req.body);
    conn.query("Insert into refunds(Currency ,GatewayRefundID ,GatewayResponse ,Notes ,RefundAmount ,RefundReason ,RefundStatus ,TransactionID) values (?,?,?,?,?,?,?,?)", [Currency,GatewayRefundID,GatewayResponse,Notes,RefundAmount,RefundReason,RefundStatus,TransactionID], (err , result) =>
 {
 if(err)
 console.error("Failed to add refunds");
else
{console.log("Successfully created refunds");

res.status(201).json(result);
 }
});
};

// deleterefunds


const deleterefunds= async (req , res)=>{
console.log("deleterefunds() called");
if(!conn)
console.error("conn was not routed properly");
 console.log("deleterefunds called");

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query("Delete from refunds where RefundID =?",[req.params.id], (err, result)=>
{
if(!err)
res.status(200).send("User deleted successfully");
else
{

console.error("An error occured", err);
}
});
};

// updaterefunds




const updaterefunds =async (req , res) => { 
console.log("updaterefunds() called");
if(!conn)
 console.error("conn not linked to routes"); 

const refundsId= req.params.id

const {
CurrencyGatewayRefundIDGatewayResponseNotesRefundAmountRefundDateRefundIDRefundReasonRefundStatusTransactionID}= req.body;

if(!refundsId||isNaN(refundsId))
{
console.error("Invalid refundsId sent");
 res.status(404).send("Invalid refundsId");
}
let updateFields= [];
 let updateValues=[];

if(GatewayRefundID){

updateFields.push('GatewayRefundID=?');
updateValues.push(GatewayRefundID);
}
if(GatewayResponse){

updateFields.push('GatewayResponse=?');
updateValues.push(GatewayResponse);
}
if(Notes){

updateFields.push('Notes=?');
updateValues.push(Notes);
}
if(RefundAmount){

updateFields.push('RefundAmount=?');
updateValues.push(RefundAmount);
}
if(RefundDate){

updateFields.push('RefundDate=?');
updateValues.push(RefundDate);
}
if(RefundID){

updateFields.push('RefundID=?');
updateValues.push(RefundID);
}
if(RefundReason){

updateFields.push('RefundReason=?');
updateValues.push(RefundReason);
}
if(RefundStatus){

updateFields.push('RefundStatus=?');
updateValues.push(RefundStatus);
}
if(TransactionID){

updateFields.push('TransactionID=?');
updateValues.push(TransactionID);
}
updateValues.push(Currency)
if(updateFields.length==0)
 console.error("NO field value specified for update")

const query  = `update refunds set ${userFields.join(',')} where RefundID= '?'`;
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query( query , updateValues, (err , result)=>{
if(err)
 {console.error("Failed to update refunds");
 res.status(400).send("An error occured", err);
}
res.status(200).send(result);
 });
 } 

module.exports={getrefunds ,addrefunds ,deleterefunds , updaterefunds ,getrefundsBy, getrefundsLike ,applyFilterSearchrefunds};





// controllers/currency_conversion_rates.js





const {conn} = require('../db.js');
const mysql = require('mysql2');


const axios=require('axios');

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
// getcurrency_conversion_rates


const getcurrency_conversion_rates = (req,res)=> {

console.log("getcurrency_conversion_rates() called");
 try{
 conn.query("Select * from currency_conversion_rates" ,(err , results) =>    { 
if(err)
 console.error("Failed to get currency_conversion_rates",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the currency_conversion_rates",err);
 res.status(500).send({error:err});
}
};
// getcurrency_conversion_ratesBy


// getcurrency_conversion_ratesBy


const getcurrency_conversion_ratesBy = (req,res)=> {

console.log("getcurrency_conversion_rates() called");
 try{
 conn.query("Select * from currency_conversion_rates where ConversionID = ?" ,[req.params.id] ,(err , results) =>    { 
//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
if(err)
 console.error("Failed to get currency_conversion_rates",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the currency_conversion_rates",err);
 res.status(500).send({error:err});
}
};
// getcurrency_conversion_ratesLike


const getcurrency_conversion_ratesLike = (req,res)=> {

console.log("getcurrency_conversion_rates() called");
 try{
 conn.query("Select * from currency_conversion_rates where  FromCurrency like ? ToCurrency like ?",[`${req.params.id}%`],(err , results) =>    { 
if(err)
 console.error("Failed to get currency_conversion_rates",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the currency_conversion_rates",err);
 res.status(500).send({error:err});
}
};
// applyFilterSearchcurrency_conversion_rates


const applyFilterSearchcurrency_conversion_rates = (req,res)=> {

console.log("applyFilterSearchcurrency_conversion_rates() called");
console.log("params received is",req.query);

const { id ,ConversionID,ToCurrency }= req.query;

let checkFields =[];
let checkValues=[];

checkFields.push("true");
 
const query =`Select * from currency_conversion_rates where ${checkFields.join(" and ")} and (FromCurrency like ? ToCurrency like ?
` 
checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);


 try{
 conn.query(query, checkValues,(err , results) =>    { 
if(err)
 console.error("Failed to applyFilterSearchcurrency_conversion_rates",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the applyFilterSearchcurrency_conversion_rates",err);
 res.status(500).send({error:err});
}
};


// addcurrency_conversion_rates


//currency_conversion_ratesid might not be auto generate in that case you need to manually insert currency_conversion_ratesId or currency_conversion_ratesID

const addcurrency_conversion_rates= (req ,res) => {
if(!conn)
 console.log("conn not properly linked to routes");
 console.log("addcurrency_conversion_rates Called");
//currency_conversion_ratesid might not be auto generate in that case you need to manually insert currency_conversion_ratesId or currency_conversion_ratesID

const {ConversionRate,FromCurrency,ToCurrency}=req.body;console.log(req.body);
    conn.query("Insert into currency_conversion_rates(ConversionRate ,FromCurrency ,ToCurrency) values (?,?,?)", [ConversionRate,FromCurrency,ToCurrency], (err , result) =>
 {
 if(err)
 console.error("Failed to add currency_conversion_rates");
else
{console.log("Successfully created currency_conversion_rates");

res.status(201).json(result);
 }
});
};

// deletecurrency_conversion_rates


const deletecurrency_conversion_rates= async (req , res)=>{
console.log("deletecurrency_conversion_rates() called");
if(!conn)
console.error("conn was not routed properly");
 console.log("deletecurrency_conversion_rates called");

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query("Delete from currency_conversion_rates where ConversionID =?",[req.params.id], (err, result)=>
{
if(!err)
res.status(200).send("User deleted successfully");
else
{

console.error("An error occured", err);
}
});
};

// updatecurrency_conversion_rates




const updatecurrency_conversion_rates =async (req , res) => { 
console.log("updatecurrency_conversion_rates() called");
if(!conn)
 console.error("conn not linked to routes"); 

const currency_conversion_ratesId= req.params.id

const {
ConversionIDConversionRateFromCurrencyLastUpdatedToCurrency}= req.body;

if(!currency_conversion_ratesId||isNaN(currency_conversion_ratesId))
{
console.error("Invalid currency_conversion_ratesId sent");
 res.status(404).send("Invalid currency_conversion_ratesId");
}
let updateFields= [];
 let updateValues=[];

if(ConversionRate){

updateFields.push('ConversionRate=?');
updateValues.push(ConversionRate);
}
if(FromCurrency){

updateFields.push('FromCurrency=?');
updateValues.push(FromCurrency);
}
if(LastUpdated){

updateFields.push('LastUpdated=?');
updateValues.push(LastUpdated);
}
if(ToCurrency){

updateFields.push('ToCurrency=?');
updateValues.push(ToCurrency);
}
updateValues.push(ConversionID)
if(updateFields.length==0)
 console.error("NO field value specified for update")

const query  = `update currency_conversion_rates set ${userFields.join(',')} where ConversionID= '?'`;
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query( query , updateValues, (err , result)=>{
if(err)
 {console.error("Failed to update currency_conversion_rates");
 res.status(400).send("An error occured", err);
}
res.status(200).send(result);
 });
 } 

module.exports={getcurrency_conversion_rates ,addcurrency_conversion_rates ,deletecurrency_conversion_rates , updatecurrency_conversion_rates ,getcurrency_conversion_ratesBy, getcurrency_conversion_ratesLike ,applyFilterSearchcurrency_conversion_rates};



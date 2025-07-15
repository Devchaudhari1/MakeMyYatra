

// controllers/currencies.js





const {conn} = require('../db.js');
const mysql = require('mysql2');


const axios=require('axios');

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
// getcurrencies


const getcurrencies = (req,res)=> {

console.log("getcurrencies() called");
 try{
 conn.query("Select * from currencies" ,(err , results) =>    { 
if(err)
 console.error("Failed to get currencies",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the currencies",err);
 res.status(500).send({error:err});
}
};
// getcurrenciesBy


// getcurrenciesBy


const getcurrenciesBy = (req,res)=> {

console.log("getcurrencies() called");
 try{
 conn.query("Select * from currencies where CurrencyCode = ?" ,[req.params.id] ,(err , results) =>    { 
//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
if(err)
 console.error("Failed to get currencies",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the currencies",err);
 res.status(500).send({error:err});
}
};
// getcurrenciesLike


const getcurrenciesLike = (req,res)=> {

console.log("getcurrencies() called");
 try{
 conn.query("Select * from currencies where  CurrencyCode like ? or CurrencyName like ? Symbol like ?",[`${req.params.id}%`,`${req.params.id}%`],(err , results) =>    { 
if(err)
 console.error("Failed to get currencies",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the currencies",err);
 res.status(500).send({error:err});
}
};
// applyFilterSearchcurrencies


const applyFilterSearchcurrencies = (req,res)=> {

console.log("applyFilterSearchcurrencies() called");
console.log("params received is",req.query);

const { id ,IsDefault,Symbol }= req.query;

let checkFields =[];
let checkValues=[];

checkFields.push("true");
 
if(IsDefault)
{checkFields.push(`IsDefault = ?`);
 checkValues.push(`${IsDefault}` );
}
const query =`Select * from currencies where ${checkFields.join(" and ")} and (CurrencyCode like ?  or CurrencyName like ? Symbol like ?
)` 
checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);
 try{
 conn.query(query, checkValues,(err , results) =>    { 
if(err)
 console.error("Failed to applyFilterSearchcurrencies",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the applyFilterSearchcurrencies",err);
 res.status(500).send({error:err});
}
};


// addcurrencies


//currenciesid might not be auto generate in that case you need to manually insert currenciesId or currenciesID

const addcurrencies= (req ,res) => {
if(!conn)
 console.log("conn not properly linked to routes");
 console.log("addcurrencies Called");
//currenciesid might not be auto generate in that case you need to manually insert currenciesId or currenciesID

const {CurrencyCode,CurrencyName,IsDefault,Symbol}=req.body;console.log(req.body);
    conn.query("Insert into currencies(CurrencyCode ,CurrencyName ,IsDefault ,Symbol) values (?,?,?,?)", [CurrencyCode,CurrencyName,IsDefault,Symbol], (err , result) =>
 {
 if(err)
 console.error("Failed to add currencies");
else
{console.log("Successfully created currencies");

res.status(201).json(result);
 }
});
};

// deletecurrencies


const deletecurrencies= async (req , res)=>{
console.log("deletecurrencies() called");
if(!conn)
console.error("conn was not routed properly");
 console.log("deletecurrencies called");

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query("Delete from currencies where CurrencyCode =?",[req.params.id], (err, result)=>
{
if(!err)
res.status(200).send("User deleted successfully");
else
{

console.error("An error occured", err);
}
});
};

// updatecurrencies




const updatecurrencies =async (req , res) => { 
console.log("updatecurrencies() called");
if(!conn)
 console.error("conn not linked to routes"); 

const currenciesId= req.params.id

const {
CurrencyCodeCurrencyNameIsDefaultSymbol}= req.body;

if(!currenciesId||isNaN(currenciesId))
{
console.error("Invalid currenciesId sent");
 res.status(404).send("Invalid currenciesId");
}
let updateFields= [];
 let updateValues=[];

if(CurrencyName){

updateFields.push('CurrencyName=?');
updateValues.push(CurrencyName);
}
if(IsDefault){

updateFields.push('IsDefault=?');
updateValues.push(IsDefault);
}
if(Symbol){

updateFields.push('Symbol=?');
updateValues.push(Symbol);
}
updateValues.push(CurrencyCode)
if(updateFields.length==0)
 console.error("NO field value specified for update")

const query  = `update currencies set ${userFields.join(',')} where CurrencyCode= '?'`;
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query( query , updateValues, (err , result)=>{
if(err)
 {console.error("Failed to update currencies");
 res.status(400).send("An error occured", err);
}
res.status(200).send(result);
 });
 } 

module.exports={getcurrencies ,addcurrencies ,deletecurrencies , updatecurrencies ,getcurrenciesBy, getcurrenciesLike ,applyFilterSearchcurrencies};



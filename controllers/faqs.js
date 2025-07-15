

// controllers/faqs.js





const {conn} = require('../db.js');
const mysql = require('mysql2');


const axios=require('axios');

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
// getfaqs


const getfaqs = (req,res)=> {

console.log("getfaqs() called");
 try{
 conn.query("Select * from faqs" ,(err , results) =>    { 
if(err)
 console.error("Failed to get faqs",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the faqs",err);
 res.status(500).send({error:err});
}
};
// getfaqsBy


// getfaqsBy


const getfaqsBy = (req,res)=> {

console.log("getfaqs() called");
 try{
 conn.query("Select * from faqs where FAQID = ?" ,[req.params.id] ,(err , results) =>    { 
//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
if(err)
 console.error("Failed to get faqs",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the faqs",err);
 res.status(500).send({error:err});
}
};
// getfaqsLike


const getfaqsLike = (req,res)=> {

console.log("getfaqs() called");
 try{
 conn.query("Select * from faqs where ",[`${req.params.id}%`],(err , results) =>    { 
if(err)
 console.error("Failed to get faqs",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the faqs",err);
 res.status(500).send({error:err});
}
};
// applyFilterSearchfaqs


const applyFilterSearchfaqs = (req,res)=> {

console.log("applyFilterSearchfaqs() called");
console.log("params received is",req.query);

const { id ,EntityID,EntityType,FAQID,UpdatedAt }= req.query;

let checkFields =[];
let checkValues=[];

checkFields.push("true");
 
if(EntityType)
{checkFields.push(`EntityType = ?`);
 checkValues.push(`${EntityType}` );
}
const query =`Select * from faqs where ${checkFields.join(" and ")} ` 

 try{
 conn.query(query, checkValues,(err , results) =>    { 
if(err)
 console.error("Failed to applyFilterSearchfaqs",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the applyFilterSearchfaqs",err);
 res.status(500).send({error:err});
}
};


// addfaqs


//faqsid might not be auto generate in that case you need to manually insert faqsId or faqsID

const addfaqs= (req ,res) => {
if(!conn)
 console.log("conn not properly linked to routes");
 console.log("addfaqs Called");
//faqsid might not be auto generate in that case you need to manually insert faqsId or faqsID

const {Answer,EntityID,EntityType,Question,UpdatedAt}=req.body;console.log(req.body);
    conn.query("Insert into faqs(Answer ,EntityID ,EntityType ,Question ,UpdatedAt) values (?,?,?,?,?)", [Answer,EntityID,EntityType,Question,UpdatedAt], (err , result) =>
 {
 if(err)
 console.error("Failed to add faqs");
else
{console.log("Successfully created faqs");

res.status(201).json(result);
 }
});
};

// deletefaqs


const deletefaqs= async (req , res)=>{
console.log("deletefaqs() called");
if(!conn)
console.error("conn was not routed properly");
 console.log("deletefaqs called");

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query("Delete from faqs where FAQID =?",[req.params.id], (err, result)=>
{
if(!err)
res.status(200).send("User deleted successfully");
else
{

console.error("An error occured", err);
}
});
};

// updatefaqs




const updatefaqs =async (req , res) => { 
console.log("updatefaqs() called");
if(!conn)
 console.error("conn not linked to routes"); 

const faqsId= req.params.id

const {
AnswerCreatedAtEntityIDEntityTypeFAQIDQuestionUpdatedAt}= req.body;

if(!faqsId||isNaN(faqsId))
{
console.error("Invalid faqsId sent");
 res.status(404).send("Invalid faqsId");
}
let updateFields= [];
 let updateValues=[];

if(CreatedAt){

updateFields.push('CreatedAt=?');
updateValues.push(CreatedAt);
}
if(EntityID){

updateFields.push('EntityID=?');
updateValues.push(EntityID);
}
if(EntityType){

updateFields.push('EntityType=?');
updateValues.push(EntityType);
}
if(FAQID){

updateFields.push('FAQID=?');
updateValues.push(FAQID);
}
if(Question){

updateFields.push('Question=?');
updateValues.push(Question);
}
if(UpdatedAt){

updateFields.push('UpdatedAt=?');
updateValues.push(UpdatedAt);
}
updateValues.push(Answer)
if(updateFields.length==0)
 console.error("NO field value specified for update")

const query  = `update faqs set ${userFields.join(',')} where FAQID= '?'`;
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query( query , updateValues, (err , result)=>{
if(err)
 {console.error("Failed to update faqs");
 res.status(400).send("An error occured", err);
}
res.status(200).send(result);
 });
 } 

module.exports={getfaqs ,addfaqs ,deletefaqs , updatefaqs ,getfaqsBy, getfaqsLike ,applyFilterSearchfaqs};



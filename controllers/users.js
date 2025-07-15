

// controllers/users.js





const {conn} = require('../db.js');
const mysql = require('mysql2');


const axios=require('axios');

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
// getusers


const getusers = (req,res)=> {

console.log("getusers() called");
 try{
 conn.query("Select * from users" ,(err , results) =>    { 
if(err)
 console.error("Failed to get users",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the users",err);
 res.status(500).send({error:err});
}
};
// getusersBy


// getusersBy


const getusersBy = (req,res)=> {

console.log("getusers() called");
 try{
 conn.query("Select * from users where UserID = ?" ,[req.params.id] ,(err , results) =>    { 
//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
if(err)
 console.error("Failed to get users",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the users",err);
 res.status(500).send({error:err});
}
};
// getusersLike


const getusersLike = (req,res)=> {

console.log("getusers() called");
 try{
 conn.query("Select * from users where  AddressLine1 like ? or AddressLine2 like ? or City like ? or Country like ? or Email like ? or FullName like ? or PasswordHash like ? or Phone like ? or PostalCode like ? or ProfileImage like ? or State like ? Username like ?",[`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`,`${req.params.id}%`],(err , results) =>    { 
if(err)
 console.error("Failed to get users",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the users",err);
 res.status(500).send({error:err});
}
};
// applyFilterSearchusers


const applyFilterSearchusers = (req,res)=> {

console.log("applyFilterSearchusers() called");
console.log("params received is",req.query);

const { id ,AccountStatus,Gender,UserID,Username }= req.query;

let checkFields =[];
let checkValues=[];

checkFields.push("true");
 
if(AccountStatus)
{checkFields.push(`AccountStatus = ?`);
 checkValues.push(`${AccountStatus}` );
}
if(Gender)
{checkFields.push(`Gender = ?`);
 checkValues.push(`${Gender}` );
}
const query =`Select * from users where ${checkFields.join(" and ")} and (AddressLine1 like ?  or AddressLine2 like ?  or City like ?  or Country like ?  or Email like ?  or FullName like ?  or PasswordHash like ?  or Phone like ?  or PostalCode like ?  or State like ? Username like ?
)` 
checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);

checkValues.push(`${req.query.id}%`);


 try{
 conn.query(query, checkValues,(err , results) =>    { 
if(err)
 console.error("Failed to applyFilterSearchusers",err);
else
 res.status(200).json(results);
 });
} catch(err)
{

console.error("Cannot send the applyFilterSearchusers",err);
 res.status(500).send({error:err});
}
};


// addusers


//usersid might not be auto generate in that case you need to manually insert usersId or usersID

const addusers= (req ,res) => {
if(!conn)
 console.log("conn not properly linked to routes");
 console.log("addusers Called");
//usersid might not be auto generate in that case you need to manually insert usersId or usersID

const {AccountStatus,AddressLine1,AddressLine2,City,Country,DateOfBirth,Email,FullName,Gender,Notes,PasswordHash,Phone,PostalCode,ProfileImage,State,Username}=req.body;console.log(req.body);
    conn.query("Insert into users(AccountStatus ,AddressLine1 ,AddressLine2 ,City ,Country ,DateOfBirth ,Email ,FullName ,Gender ,Notes ,PasswordHash ,Phone ,PostalCode ,ProfileImage ,State ,Username) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [AccountStatus,AddressLine1,AddressLine2,City,Country,DateOfBirth,Email,FullName,Gender,Notes,PasswordHash,Phone,PostalCode,ProfileImage,State,Username], (err , result) =>
 {
 if(err)
 console.error("Failed to add users");
else
{console.log("Successfully created users");

res.status(201).json(result);
 }
});
};

// deleteusers


const deleteusers= async (req , res)=>{
console.log("deleteusers() called");
if(!conn)
console.error("conn was not routed properly");
 console.log("deleteusers called");

//IMP :Recheck if Id matches once again from table
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query("Delete from users where UserID =?",[req.params.id], (err, result)=>
{
if(!err)
res.status(200).send("User deleted successfully");
else
{

console.error("An error occured", err);
}
});
};

// updateusers




const updateusers =async (req , res) => { 
console.log("updateusers() called");
if(!conn)
 console.error("conn not linked to routes"); 

const usersId= req.params.id

const {
AccountCreatedAccountStatusAddressLine1AddressLine2CityCountryDateOfBirthEmailFullNameGenderLastLoginNotesPasswordHashPhonePostalCodeProfileImageStateUserIDUsername}= req.body;

if(!usersId||isNaN(usersId))
{
console.error("Invalid usersId sent");
 res.status(404).send("Invalid usersId");
}
let updateFields= [];
 let updateValues=[];

if(AccountStatus){

updateFields.push('AccountStatus=?');
updateValues.push(AccountStatus);
}
if(AddressLine1){

updateFields.push('AddressLine1=?');
updateValues.push(AddressLine1);
}
if(AddressLine2){

updateFields.push('AddressLine2=?');
updateValues.push(AddressLine2);
}
if(City){

updateFields.push('City=?');
updateValues.push(City);
}
if(Country){

updateFields.push('Country=?');
updateValues.push(Country);
}
if(DateOfBirth){

updateFields.push('DateOfBirth=?');
updateValues.push(DateOfBirth);
}
if(Email){

updateFields.push('Email=?');
updateValues.push(Email);
}
if(FullName){

updateFields.push('FullName=?');
updateValues.push(FullName);
}
if(Gender){

updateFields.push('Gender=?');
updateValues.push(Gender);
}
if(LastLogin){

updateFields.push('LastLogin=?');
updateValues.push(LastLogin);
}
if(Notes){

updateFields.push('Notes=?');
updateValues.push(Notes);
}
if(PasswordHash){

updateFields.push('PasswordHash=?');
updateValues.push(PasswordHash);
}
if(Phone){

updateFields.push('Phone=?');
updateValues.push(Phone);
}
if(PostalCode){

updateFields.push('PostalCode=?');
updateValues.push(PostalCode);
}
if(ProfileImage){

updateFields.push('ProfileImage=?');
updateValues.push(ProfileImage);
}
if(State){

updateFields.push('State=?');
updateValues.push(State);
}
if(UserID){

updateFields.push('UserID=?');
updateValues.push(UserID);
}
if(Username){

updateFields.push('Username=?');
updateValues.push(Username);
}
updateValues.push(AccountCreated)
if(updateFields.length==0)
 console.error("NO field value specified for update")

const query  = `update users set ${userFields.join(',')} where UserID= '?'`;
//Since mysql is case insensitive case might not be that necessary at all but changes like ActivityId instead of activitiesId cause problem
conn.query( query , updateValues, (err , result)=>{
if(err)
 {console.error("Failed to update users");
 res.status(400).send("An error occured", err);
}
res.status(200).send(result);
 });
 } 

module.exports={getusers ,addusers ,deleteusers , updateusers ,getusersBy, getusersLike ,applyFilterSearchusers};



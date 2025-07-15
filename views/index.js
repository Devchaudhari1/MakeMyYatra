// views/users.js



const users=document.getElementById('users') ;

getusers();

 //addusers

users.addEventListener('submit' , (e)=>

{e.preventDefault();

const UserID= document.getElementById('UserID').value.trim()

const FullName= document.getElementById('FullName').value.trim()

const Email= document.getElementById('Email').value.trim()

const Phone= document.getElementById('Phone').value.trim()

const Username= document.getElementById('Username').value.trim()

const PasswordHash= document.getElementById('PasswordHash').value.trim()

const AddressLine1= document.getElementById('AddressLine1').value.trim()

const AddressLine2= document.getElementById('AddressLine2').value.trim()

const City= document.getElementById('City').value.trim()

const State= document.getElementById('State').value.trim()

const Country= document.getElementById('Country').value.trim()

const PostalCode= document.getElementById('PostalCode').value.trim()

const DateOfBirth= document.getElementById('DateOfBirth').value.trim()

const Gender= document.getElementById('Gender').value.trim()

const ProfileImage= document.getElementById('ProfileImage').value.trim()

const AccountStatus= document.getElementById('AccountStatus').value.trim()

const Notes= document.getElementById('Notes').value.trim()

const formData=new FormData()
formData.append('UserID',UserID)
formData.append('FullName',FullName)
formData.append('Email',Email)
formData.append('Phone',Phone)
formData.append('Username',Username)
formData.append('PasswordHash',PasswordHash)
formData.append('AddressLine1',AddressLine1)
formData.append('AddressLine2',AddressLine2)
formData.append('City',City)
formData.append('State',State)
formData.append('Country',Country)
formData.append('PostalCode',PostalCode)
formData.append('DateOfBirth',DateOfBirth)
formData.append('Gender',Gender)
formData.append('ProfileImage',ProfileImage)
formData.append('AccountStatus',AccountStatus)
formData.append('Notes',Notes)
const usersData= {
UserID  ,FullName  ,Email  ,Phone  ,Username  ,PasswordHash  ,AddressLine1  ,AddressLine2  ,City  ,State  ,Country  ,PostalCode  ,DateOfBirth  ,Gender  ,ProfileImage  ,AccountStatus  ,Notes };

const res =fetch('/users',{method:'POST',body:formData}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
const response =fetch('/users',{method:'POST',headers :{'Content-Type':'application/json'},body:JSON.stringify(usersData)}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
if(response.ok)
 getusers();
});


//getusersLike




 let searchWindow= document.getElementById("searchWindow");


 let searchBar = document.getElementById("searchBar");


const searchBtn = document.getElementById("searchBtn");
searchWindow.addEventListener('input',async (e)=>{
e.preventDefault();



let choice =[];


const searchList = document.getElementById("searchList");

searchList.innerHTML=``;
let input=searchBar.value.trim();
choice.push(["id",`${input}`]);


const GenderChoice = document.querySelector('input[name="GenderChoice"]:checked');
if(GenderChoice)
choice.push(["Gender",GenderChoice.value]);

console.log(GenderChoice.value);


const AccountStatusChoice = document.querySelector('input[name="AccountStatusChoice"]:checked');
if(AccountStatusChoice)
choice.push(["AccountStatus",AccountStatusChoice.value]);


let obj=Object.fromEntries(choice);
console.log(obj);
let JSONstring=JSON.stringify(obj);
console.log(JSONstring);
 const response = await axios(`/usersSearch`, {params:obj});
const data =await response.data;

 try{ if(response.status ==200)
 {;
data.forEach( item => {
const t= document.createElement('li');
 t.innerHTML=`${item.FullName}`;
 searchList.appendChild(t);

});
}else
 console.error("An error occurred while searching"); } catch(err){
console.error("Error occured while searching",err);
}
});



//getusers()

getusers();

async function getusers(){
const usersList= document.getElementById('usersList');
usersList.innerHTML='';
let data;
const response = await fetch('users' , {method:'GET'});
if(response.ok)
{
data = await response.json();
data.forEach(item =>{
const t0 = document.createElement('p');
t0.innerHTML=`${item.UserID}`;
usersList.appendChild(t0);
const t1 = document.createElement('p');
t1.innerHTML=`${item.FullName}`;
usersList.appendChild(t1);
const t2 = document.createElement('p');
t2.innerHTML=`${item.Email}`;
usersList.appendChild(t2);
const t3 = document.createElement('p');
t3.innerHTML=`${item.Phone}`;
usersList.appendChild(t3);
const t4 = document.createElement('p');
t4.innerHTML=`${item.Username}`;
usersList.appendChild(t4);
const t5 = document.createElement('p');
t5.innerHTML=`${item.PasswordHash}`;
usersList.appendChild(t5);
const t6 = document.createElement('p');
t6.innerHTML=`${item.AddressLine1}`;
usersList.appendChild(t6);
const t7 = document.createElement('p');
t7.innerHTML=`${item.AddressLine2}`;
usersList.appendChild(t7);
const t8 = document.createElement('p');
t8.innerHTML=`${item.City}`;
usersList.appendChild(t8);
const t9 = document.createElement('p');
t9.innerHTML=`${item.State}`;
usersList.appendChild(t9);
const t10 = document.createElement('p');
t10.innerHTML=`${item.Country}`;
usersList.appendChild(t10);
const t11 = document.createElement('p');
t11.innerHTML=`${item.PostalCode}`;
usersList.appendChild(t11);
const t12 = document.createElement('p');
t12.innerHTML=`${item.DateOfBirth}`;
usersList.appendChild(t12);
const t13 = document.createElement('p');
t13.innerHTML=`${item.Gender}`;
usersList.appendChild(t13);
const t14 = document.createElement('p');
t14.innerHTML=`${item.ProfileImage}`;
usersList.appendChild(t14);
const t15 = document.createElement('p');
t15.innerHTML=`${item.AccountCreated}`;
usersList.appendChild(t15);
const t16 = document.createElement('p');
t16.innerHTML=`${item.LastLogin}`;
usersList.appendChild(t16);
const t17 = document.createElement('p');
t17.innerHTML=`${item.AccountStatus}`;
usersList.appendChild(t17);
const t18 = document.createElement('p');
t18.innerHTML=`${item.Notes}`;
usersList.appendChild(t18);
const del = document.createElement('button');
del.innerHTML=`DELETE`
del.onclick= () =>{
console.log("deleteusers called");
deleteusers(item.UserID);
}
usersList.appendChild(del)
});
}
else
console.error("An error occured",response)
}


 //deleteusers()


async function deleteusers(id){
const response = await fetch(`/users/${id}`, {method:'DELETE'});
let res;
if(response.ok)
 {res=response.json();
 console.log("users deleted successfully ",res);
 getusers()}
else
 console.error("Failed to delete users");
}
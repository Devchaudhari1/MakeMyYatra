

// views/email_notifications.js



const email_notifications=document.getElementById('email_notifications') ;


getemail_notifications()// Do not delete this it must be called at the start


 //addemail_notifications


email_notifications.addEventListener('submit' , (e)=>
 
{e.preventDefault();

const NotificationID= document.getElementById('NotificationID').value.trim()

const Status= document.getElementById('Status').value.trim()

const TemplateID= document.getElementById('TemplateID').value.trim()

const UserID= document.getElementById('UserID').value.trim()

const formData=new FormData()
formData.append('NotificationID',NotificationID)
formData.append('Status',Status)
formData.append('TemplateID',TemplateID)
formData.append('UserID',UserID)
const email_notificationsData= {
NotificationID ,Status ,TemplateID ,UserID};

const res =fetch('/email_notifications',{method:'POST',body:formData}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
const response =fetch('/email_notifications',{method:'POST',headers :{'Content-Type':'application/json'},body:JSON.stringify(email_notificationsData)}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
if(response.ok)
 getemail_notifications();
});


//getemail_notificationsLike


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


const StatusChoice = document.querySelector('input[name="StatusChoice"]:checked');
  
if(Status)
choice.push(["Status",StatusChoice.value]);


let obj=Object.fromEntries(choice);
console.log(obj);
let JSONstring=JSON.stringify(obj);
console.log(JSONstring);
 const response = await axios(`/email_notificationsSearch`, {params: obj});
const data =await response.data;//axios automatically parses also .json() does not work here

 try{ if(response.status==200) //response.ok does not work here
 {;
data.forEach( item => {
const t= document.createElement('li');
 t.innerHTML=`${item.SentAt}`;
 searchList.appendChild(t);
 
});
}else 
 console.error("An error occurred while searching"); } catch(err){
console.error("Error occured while searching",err);
}
});


//getemail_notifications()


async function getemail_notifications(){
const email_notificationsList= document.getElementById('email_notificationsList');
email_notificationsList.innerHTML='';
let data;
const response = await fetch('email_notifications' , {method:'GET'});
if(response.ok)
{
data = await response.json();
data.forEach(item =>{
const t0 = document.createElement('p');
t0.innerHTML=`${item.NotificationID}`;
email_notificationsList.appendChild(t0);
const t1 = document.createElement('p');
t1.innerHTML=`${item.SentAt}`;
email_notificationsList.appendChild(t1);
const t2 = document.createElement('p');
t2.innerHTML=`${item.Status}`;
email_notificationsList.appendChild(t2);
const t3 = document.createElement('p');
t3.innerHTML=`${item.TemplateID}`;
email_notificationsList.appendChild(t3);
const t4 = document.createElement('p');
t4.innerHTML=`${item.UserID}`;
email_notificationsList.appendChild(t4);
const del = document.createElement('button');
del.innerHTML=`DELETE`
del.onclick= () =>{
console.log("deleteemail_notifications called");
deleteemail_notifications(item.NotificationID);
}
email_notificationsList.appendChild(del)
});
}
else
console.error("An error occured",response)
}


// deleteemail_notifications()


async function deleteemail_notifications(id){
const response = await fetch(`/email_notifications/${id}`, {method:'DELETE'});
let res;
if(response.ok)
 {res=response.json();
 console.log("email_notifications deleted successfully ",res);
 getemail_notifications()}
else
 console.error("Failed to delete email_notifications");
}



// views/notifications.js



const notifications=document.getElementById('notifications') ;


getnotifications()// Do not delete this it must be called at the start


 //addnotifications


notifications.addEventListener('submit' , (e)=>
 
{e.preventDefault();

const Message= document.getElementById('Message').value.trim()

const Notes= document.getElementById('Notes').value.trim()

const NotificationID= document.getElementById('NotificationID').value.trim()

const NotificationType= document.getElementById('NotificationType').value.trim()

const Status= document.getElementById('Status').value.trim()

const UserID= document.getElementById('UserID').value.trim()

const formData=new FormData()
formData.append('Message',Message)
formData.append('Notes',Notes)
formData.append('NotificationID',NotificationID)
formData.append('NotificationType',NotificationType)
formData.append('Status',Status)
formData.append('UserID',UserID)
const notificationsData= {
Message ,Notes ,NotificationID ,NotificationType ,Status ,UserID};

const res =fetch('/notifications',{method:'POST',body:formData}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
const response =fetch('/notifications',{method:'POST',headers :{'Content-Type':'application/json'},body:JSON.stringify(notificationsData)}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
if(response.ok)
 getnotifications();
});


//getnotificationsLike


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


const NotificationTypeChoice = document.querySelector('input[name="NotificationTypeChoice"]:checked');
  
if(NotificationType)
choice.push(["NotificationType",NotificationTypeChoice.value]);




const StatusChoice = document.querySelector('input[name="StatusChoice"]:checked');
  
if(Status)
choice.push(["Status",StatusChoice.value]);


let obj=Object.fromEntries(choice);
console.log(obj);
let JSONstring=JSON.stringify(obj);
console.log(JSONstring);
 const response = await axios(`/notificationsSearch`, {params: obj});
const data =await response.data;//axios automatically parses also .json() does not work here

 try{ if(response.status==200) //response.ok does not work here
 {;
data.forEach( item => {
const t= document.createElement('li');
 t.innerHTML=`${item.Notes}`;
 searchList.appendChild(t);
 
});
}else 
 console.error("An error occurred while searching"); } catch(err){
console.error("Error occured while searching",err);
}
});


//getnotifications()


async function getnotifications(){
const notificationsList= document.getElementById('notificationsList');
notificationsList.innerHTML='';
let data;
const response = await fetch('notifications' , {method:'GET'});
if(response.ok)
{
data = await response.json();
data.forEach(item =>{
const t0 = document.createElement('p');
t0.innerHTML=`${item.Message}`;
notificationsList.appendChild(t0);
const t1 = document.createElement('p');
t1.innerHTML=`${item.Notes}`;
notificationsList.appendChild(t1);
const t2 = document.createElement('p');
t2.innerHTML=`${item.NotificationID}`;
notificationsList.appendChild(t2);
const t3 = document.createElement('p');
t3.innerHTML=`${item.NotificationType}`;
notificationsList.appendChild(t3);
const t4 = document.createElement('p');
t4.innerHTML=`${item.ReadDate}`;
notificationsList.appendChild(t4);
const t5 = document.createElement('p');
t5.innerHTML=`${item.SentDate}`;
notificationsList.appendChild(t5);
const t6 = document.createElement('p');
t6.innerHTML=`${item.Status}`;
notificationsList.appendChild(t6);
const t7 = document.createElement('p');
t7.innerHTML=`${item.UserID}`;
notificationsList.appendChild(t7);
const del = document.createElement('button');
del.innerHTML=`DELETE`
del.onclick= () =>{
console.log("deletenotifications called");
deletenotifications(item.Message);
}
notificationsList.appendChild(del)
});
}
else
console.error("An error occured",response)
}


// deletenotifications()


async function deletenotifications(id){
const response = await fetch(`/notifications/${id}`, {method:'DELETE'});
let res;
if(response.ok)
 {res=response.json();
 console.log("notifications deleted successfully ",res);
 getnotifications()}
else
 console.error("Failed to delete notifications");
}

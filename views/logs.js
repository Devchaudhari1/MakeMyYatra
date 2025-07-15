

// views/logs.js



const logs=document.getElementById('logs') ;


getlogs()// Do not delete this it must be called at the start


 //addlogs


logs.addEventListener('submit' , (e)=>
 
{e.preventDefault();

const EntityID= document.getElementById('EntityID').value.trim()

const EntityType= document.getElementById('EntityType').value.trim()

const IPAddress= document.getElementById('IPAddress').value.trim()

const LogID= document.getElementById('LogID').value.trim()

const LogType= document.getElementById('LogType').value.trim()

const Message= document.getElementById('Message').value.trim()

const SessionID= document.getElementById('SessionID').value.trim()

const UserID= document.getElementById('UserID').value.trim()

const formData=new FormData()
formData.append('EntityID',EntityID)
formData.append('EntityType',EntityType)
formData.append('IPAddress',IPAddress)
formData.append('LogID',LogID)
formData.append('LogType',LogType)
formData.append('Message',Message)
formData.append('SessionID',SessionID)
formData.append('UserID',UserID)
const logsData= {
EntityID ,EntityType ,IPAddress ,LogID ,LogType ,Message ,SessionID ,UserID};

const res =fetch('/logs',{method:'POST',body:formData}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
const response =fetch('/logs',{method:'POST',headers :{'Content-Type':'application/json'},body:JSON.stringify(logsData)}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
if(response.ok)
 getlogs();
});


//getlogsLike


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


const LogTypeChoice = document.querySelector('input[name="LogTypeChoice"]:checked');
  
if(LogType)
choice.push(["LogType",LogTypeChoice.value]);


let obj=Object.fromEntries(choice);
console.log(obj);
let JSONstring=JSON.stringify(obj);
console.log(JSONstring);
 const response = await axios(`/logsSearch`, {params: obj});
const data =await response.data;//axios automatically parses also .json() does not work here

 try{ if(response.status==200) //response.ok does not work here
 {;
data.forEach( item => {
const t= document.createElement('li');
 t.innerHTML=`${item.EntityID}`;
 searchList.appendChild(t);
 
});
}else 
 console.error("An error occurred while searching"); } catch(err){
console.error("Error occured while searching",err);
}
});


//getlogs()


async function getlogs(){
const logsList= document.getElementById('logsList');
logsList.innerHTML='';
let data;
const response = await fetch('logs' , {method:'GET'});
if(response.ok)
{
data = await response.json();
data.forEach(item =>{
const t0 = document.createElement('p');
t0.innerHTML=`${item.CreatedAt}`;
logsList.appendChild(t0);
const t1 = document.createElement('p');
t1.innerHTML=`${item.EntityID}`;
logsList.appendChild(t1);
const t2 = document.createElement('p');
t2.innerHTML=`${item.EntityType}`;
logsList.appendChild(t2);
const t3 = document.createElement('p');
t3.innerHTML=`${item.IPAddress}`;
logsList.appendChild(t3);
const t4 = document.createElement('p');
t4.innerHTML=`${item.LogID}`;
logsList.appendChild(t4);
const t5 = document.createElement('p');
t5.innerHTML=`${item.LogType}`;
logsList.appendChild(t5);
const t6 = document.createElement('p');
t6.innerHTML=`${item.Message}`;
logsList.appendChild(t6);
const t7 = document.createElement('p');
t7.innerHTML=`${item.SessionID}`;
logsList.appendChild(t7);
const t8 = document.createElement('p');
t8.innerHTML=`${item.UserID}`;
logsList.appendChild(t8);
const del = document.createElement('button');
del.innerHTML=`DELETE`
del.onclick= () =>{
console.log("deletelogs called");
deletelogs(item.CreatedAt);
}
logsList.appendChild(del)
});
}
else
console.error("An error occured",response)
}


// deletelogs()


async function deletelogs(id){
const response = await fetch(`/logs/${id}`, {method:'DELETE'});
let res;
if(response.ok)
 {res=response.json();
 console.log("logs deleted successfully ",res);
 getlogs()}
else
 console.error("Failed to delete logs");
}

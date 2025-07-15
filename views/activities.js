

// views/activities.js



const activities=document.getElementById('activities') ;


getactivities()// Do not delete this it must be called at the start


 //addactivities


activities.addEventListener('submit' , (e)=>
 
{e.preventDefault();

const ActivityID= document.getElementById('ActivityID').value.trim()

const ActivityName= document.getElementById('ActivityName').value.trim()

const Description= document.getElementById('Description').value.trim()

const ActivityType= document.getElementById('ActivityType').value.trim()

const HostEntityType= document.getElementById('HostEntityType').value.trim()

const HostEntityID= document.getElementById('HostEntityID').value.trim()

const Location= document.getElementById('Location').value.trim()

const StartDateTime= document.getElementById('StartDateTime').value.trim()

const EndDateTime= document.getElementById('EndDateTime').value.trim()

const MaxParticipants= document.getElementById('MaxParticipants').value.trim()

const CurrentParticipants= document.getElementById('CurrentParticipants').value.trim()

const Price= document.getElementById('Price').value.trim()

const DifficultyLevel= document.getElementById('DifficultyLevel').value.trim()

const EquipmentRequired= document.getElementById('EquipmentRequired').value.trim()

const AgeRestriction= document.getElementById('AgeRestriction').value.trim()

const IsActive= document.getElementById('IsActive').value.trim()

const formData=new FormData()
formData.append('ActivityID',ActivityID)
formData.append('ActivityName',ActivityName)
formData.append('Description',Description)
formData.append('ActivityType',ActivityType)
formData.append('HostEntityType',HostEntityType)
formData.append('HostEntityID',HostEntityID)
formData.append('Location',Location)
formData.append('StartDateTime',StartDateTime)
formData.append('EndDateTime',EndDateTime)
formData.append('MaxParticipants',MaxParticipants)
formData.append('CurrentParticipants',CurrentParticipants)
formData.append('Price',Price)
formData.append('DifficultyLevel',DifficultyLevel)
formData.append('EquipmentRequired',EquipmentRequired)
formData.append('AgeRestriction',AgeRestriction)
formData.append('IsActive',IsActive)
const activitiesData= {
ActivityID ,ActivityName ,Description ,ActivityType ,HostEntityType ,HostEntityID ,Location ,StartDateTime ,EndDateTime ,MaxParticipants ,CurrentParticipants ,Price ,DifficultyLevel ,EquipmentRequired ,AgeRestriction ,IsActive ,};

const res =fetch('/activities',{method:'POST',body:formData}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
const response =fetch('/activities',{method:'POST',headers :{'Content-Type':'application/json'},body:JSON.stringify(activitiesData)}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
if(response.ok)
 getactivities();
});


//getactivitiesLike


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


const ActivityTypeChoice = document.querySelector('input[name="ActivityTypeChoice"]:checked');
  
if(ActivityType)
choice.push(["ActivityType",ActivityTypeChoice.value]);




const HostEntityTypeChoice = document.querySelector('input[name="HostEntityTypeChoice"]:checked');
  
if(HostEntityType)
choice.push(["HostEntityType",HostEntityTypeChoice.value]);




const DifficultyLevelChoice = document.querySelector('input[name="DifficultyLevelChoice"]:checked');
  
if(DifficultyLevel)
choice.push(["DifficultyLevel",DifficultyLevelChoice.value]);




const EquipmentRequiredChoice = document.querySelector('input[name="EquipmentRequiredChoice"]:checked');
  
if(EquipmentRequired)
choice.push(["EquipmentRequired",EquipmentRequiredChoice.value]);


let obj=Object.fromEntries(choice);
console.log(obj);
let JSONstring=JSON.stringify(obj);
console.log(JSONstring);
 const response = await axios(`/activitiesSearch`, {params: obj});
const data =await response.data;//axios automatically parses also .json() does not work here

 try{ if(response.status==200) //response.ok does not work here
 {;
data.forEach( item => {
const t= document.createElement('li');
 t.innerHTML=`${item.ActivityName}`;
 searchList.appendChild(t);
 
});
}else 
 console.error("An error occurred while searching"); } catch(err){
console.error("Error occured while searching",err);
}
});


//getactivities()


async function getactivities(){
const activitiesList= document.getElementById('activitiesList');
activitiesList.innerHTML='';
let data;
const response = await fetch('activities' , {method:'GET'});
if(response.ok)
{
data = await response.json();
data.forEach(item =>{
const t0 = document.createElement('p');
t0.innerHTML=`${item.ActivityID}`;
activitiesList.appendChild(t0);
const t1 = document.createElement('p');
t1.innerHTML=`${item.ActivityName}`;
activitiesList.appendChild(t1);
const t2 = document.createElement('p');
t2.innerHTML=`${item.Description}`;
activitiesList.appendChild(t2);
const t3 = document.createElement('p');
t3.innerHTML=`${item.ActivityType}`;
activitiesList.appendChild(t3);
const t4 = document.createElement('p');
t4.innerHTML=`${item.HostEntityType}`;
activitiesList.appendChild(t4);
const t5 = document.createElement('p');
t5.innerHTML=`${item.HostEntityID}`;
activitiesList.appendChild(t5);
const t6 = document.createElement('p');
t6.innerHTML=`${item.Location}`;
activitiesList.appendChild(t6);
const t7 = document.createElement('p');
t7.innerHTML=`${item.StartDateTime}`;
activitiesList.appendChild(t7);
const t8 = document.createElement('p');
t8.innerHTML=`${item.EndDateTime}`;
activitiesList.appendChild(t8);
const t9 = document.createElement('p');
t9.innerHTML=`${item.MaxParticipants}`;
activitiesList.appendChild(t9);
const t10 = document.createElement('p');
t10.innerHTML=`${item.CurrentParticipants}`;
activitiesList.appendChild(t10);
const t11 = document.createElement('p');
t11.innerHTML=`${item.Price}`;
activitiesList.appendChild(t11);
const t12 = document.createElement('p');
t12.innerHTML=`${item.DifficultyLevel}`;
activitiesList.appendChild(t12);
const t13 = document.createElement('p');
t13.innerHTML=`${item.EquipmentRequired}`;
activitiesList.appendChild(t13);
const t14 = document.createElement('p');
t14.innerHTML=`${item.AgeRestriction}`;
activitiesList.appendChild(t14);
const t15 = document.createElement('p');
t15.innerHTML=`${item.IsActive}`;
activitiesList.appendChild(t15);
const t16 = document.createElement('p');
t16.innerHTML=`${item.CreatedAt}`;
activitiesList.appendChild(t16);
const t17 = document.createElement('p');
t17.innerHTML=`${item.UpdatedAt}`;
activitiesList.appendChild(t17);
const del = document.createElement('button');
del.innerHTML=`DELETE`
del.onclick= () =>{
console.log("deleteactivities called");
deleteactivities(item.ActivityID);
}
activitiesList.appendChild(del)
});
}
else
console.error("An error occured",response)
}


// deleteactivities()


async function deleteactivities(id){
const response = await fetch(`/activities/${id}`, {method:'DELETE'});
let res;
if(response.ok)
 {res=response.json();
 console.log("activities deleted successfully ",res);
 getactivities()}
else
 console.error("Failed to delete activities");
}

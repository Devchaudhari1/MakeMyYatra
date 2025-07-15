

// views/user_preferences.js



const user_preferences=document.getElementById('user_preferences') ;


getuser_preferences()// Do not delete this it must be called at the start


 //adduser_preferences


user_preferences.addEventListener('submit' , (e)=>
 
{e.preventDefault();

const BudgetRange= document.getElementById('BudgetRange').value.trim()

const LanguageID= document.getElementById('LanguageID').value.trim()

const PreferenceID= document.getElementById('PreferenceID').value.trim()

const PreferredAccommodationType= document.getElementById('PreferredAccommodationType').value.trim()

const PreferredActivities= document.getElementById('PreferredActivities').value.trim()

const PreferredCuisine= document.getElementById('PreferredCuisine').value.trim()

const PreferredTransportation= document.getElementById('PreferredTransportation').value.trim()

const TravelGroupSize= document.getElementById('TravelGroupSize').value.trim()

const UserID= document.getElementById('UserID').value.trim()

const formData=new FormData()
formData.append('BudgetRange',BudgetRange)
formData.append('LanguageID',LanguageID)
formData.append('PreferenceID',PreferenceID)
formData.append('PreferredAccommodationType',PreferredAccommodationType)
formData.append('PreferredActivities',PreferredActivities)
formData.append('PreferredCuisine',PreferredCuisine)
formData.append('PreferredTransportation',PreferredTransportation)
formData.append('TravelGroupSize',TravelGroupSize)
formData.append('UserID',UserID)
const user_preferencesData= {
BudgetRange ,LanguageID ,PreferenceID ,PreferredAccommodationType ,PreferredActivities ,PreferredCuisine ,PreferredTransportation ,TravelGroupSize ,UserID};

const res =fetch('/user_preferences',{method:'POST',body:formData}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
const response =fetch('/user_preferences',{method:'POST',headers :{'Content-Type':'application/json'},body:JSON.stringify(user_preferencesData)}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
if(response.ok)
 getuser_preferences();
});


//getuser_preferencesLike


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


const BudgetRangeChoice = document.querySelector('input[name="BudgetRangeChoice"]:checked');
  
if(BudgetRange)
choice.push(["BudgetRange",BudgetRangeChoice.value]);




const PreferredAccommodationTypeChoice = document.querySelector('input[name="PreferredAccommodationTypeChoice"]:checked');
  
if(PreferredAccommodationType)
choice.push(["PreferredAccommodationType",PreferredAccommodationTypeChoice.value]);




const PreferredActivitiesChoice = document.querySelector('input[name="PreferredActivitiesChoice"]:checked');
  
if(PreferredActivities)
choice.push(["PreferredActivities",PreferredActivitiesChoice.value]);




const PreferredCuisineChoice = document.querySelector('input[name="PreferredCuisineChoice"]:checked');
  
if(PreferredCuisine)
choice.push(["PreferredCuisine",PreferredCuisineChoice.value]);




const PreferredTransportationChoice = document.querySelector('input[name="PreferredTransportationChoice"]:checked');
  
if(PreferredTransportation)
choice.push(["PreferredTransportation",PreferredTransportationChoice.value]);




const TravelGroupSizeChoice = document.querySelector('input[name="TravelGroupSizeChoice"]:checked');
  
if(TravelGroupSize)
choice.push(["TravelGroupSize",TravelGroupSizeChoice.value]);


let obj=Object.fromEntries(choice);
console.log(obj);
let JSONstring=JSON.stringify(obj);
console.log(JSONstring);
 const response = await axios(`/user_preferencesSearch`, {params: obj});
const data =await response.data;//axios automatically parses also .json() does not work here

 try{ if(response.status==200) //response.ok does not work here
 {;
data.forEach( item => {
const t= document.createElement('li');
 t.innerHTML=`${item.CreatedAt}`;
 searchList.appendChild(t);
 
});
}else 
 console.error("An error occurred while searching"); } catch(err){
console.error("Error occured while searching",err);
}
});


//getuser_preferences()


async function getuser_preferences(){
const user_preferencesList= document.getElementById('user_preferencesList');
user_preferencesList.innerHTML='';
let data;
const response = await fetch('user_preferences' , {method:'GET'});
if(response.ok)
{
data = await response.json();
data.forEach(item =>{
const t0 = document.createElement('p');
t0.innerHTML=`${item.BudgetRange}`;
user_preferencesList.appendChild(t0);
const t1 = document.createElement('p');
t1.innerHTML=`${item.CreatedAt}`;
user_preferencesList.appendChild(t1);
const t2 = document.createElement('p');
t2.innerHTML=`${item.LanguageID}`;
user_preferencesList.appendChild(t2);
const t3 = document.createElement('p');
t3.innerHTML=`${item.PreferenceID}`;
user_preferencesList.appendChild(t3);
const t4 = document.createElement('p');
t4.innerHTML=`${item.PreferredAccommodationType}`;
user_preferencesList.appendChild(t4);
const t5 = document.createElement('p');
t5.innerHTML=`${item.PreferredActivities}`;
user_preferencesList.appendChild(t5);
const t6 = document.createElement('p');
t6.innerHTML=`${item.PreferredCuisine}`;
user_preferencesList.appendChild(t6);
const t7 = document.createElement('p');
t7.innerHTML=`${item.PreferredTransportation}`;
user_preferencesList.appendChild(t7);
const t8 = document.createElement('p');
t8.innerHTML=`${item.TravelGroupSize}`;
user_preferencesList.appendChild(t8);
const t9 = document.createElement('p');
t9.innerHTML=`${item.UpdatedAt}`;
user_preferencesList.appendChild(t9);
const t10 = document.createElement('p');
t10.innerHTML=`${item.UserID}`;
user_preferencesList.appendChild(t10);
const del = document.createElement('button');
del.innerHTML=`DELETE`
del.onclick= () =>{
console.log("deleteuser_preferences called");
deleteuser_preferences(item.BudgetRange);
}
user_preferencesList.appendChild(del)
});
}
else
console.error("An error occured",response)
}


// deleteuser_preferences()


async function deleteuser_preferences(id){
const response = await fetch(`/user_preferences/${id}`, {method:'DELETE'});
let res;
if(response.ok)
 {res=response.json();
 console.log("user_preferences deleted successfully ",res);
 getuser_preferences()}
else
 console.error("Failed to delete user_preferences");
}

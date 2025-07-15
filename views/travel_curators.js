

// views/travel_curators.js



const travel_curators=document.getElementById('travel_curators') ;


gettravel_curators()// Do not delete this it must be called at the start


 //addtravel_curators


travel_curators.addEventListener('submit' , (e)=>
 
{e.preventDefault();

const Bio= document.getElementById('Bio').value.trim()

const CuratorID= document.getElementById('CuratorID').value.trim()

const ExperienceYears= document.getElementById('ExperienceYears').value.trim()

const Expertise= document.getElementById('Expertise').value.trim()

const IsAvailable= document.getElementById('IsAvailable').value.trim()

const Languages= document.getElementById('Languages').value.trim()

const Rating= document.getElementById('Rating').value.trim()

const Specializations= document.getElementById('Specializations').value.trim()

const formData=new FormData()
formData.append('Bio',Bio)
formData.append('CuratorID',CuratorID)
formData.append('ExperienceYears',ExperienceYears)
formData.append('Expertise',Expertise)
formData.append('IsAvailable',IsAvailable)
formData.append('Languages',Languages)
formData.append('Rating',Rating)
formData.append('Specializations',Specializations)
const travel_curatorsData= {
Bio ,CuratorID ,ExperienceYears ,Expertise ,IsAvailable ,Languages ,Rating ,Specializations ,};

const res =fetch('/travel_curators',{method:'POST',body:formData}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
const response =fetch('/travel_curators',{method:'POST',headers :{'Content-Type':'application/json'},body:JSON.stringify(travel_curatorsData)}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
if(response.ok)
 gettravel_curators();
});


//gettravel_curatorsLike


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


const ExpertiseChoice = document.querySelector('input[name="ExpertiseChoice"]:checked');
  
if(Expertise)
choice.push(["Expertise",ExpertiseChoice.value]);




const IsAvailableChoice = document.querySelector('input[name="IsAvailableChoice"]:checked');
  
if(IsAvailable)
choice.push(["IsAvailable",IsAvailableChoice.value]);


let obj=Object.fromEntries(choice);
console.log(obj);
let JSONstring=JSON.stringify(obj);
console.log(JSONstring);
 const response = await axios(`/travel_curatorsSearch`, {params: obj});
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


//gettravel_curators()


async function gettravel_curators(){
const travel_curatorsList= document.getElementById('travel_curatorsList');
travel_curatorsList.innerHTML='';
let data;
const response = await fetch('travel_curators' , {method:'GET'});
if(response.ok)
{
data = await response.json();
data.forEach(item =>{
const t0 = document.createElement('p');
t0.innerHTML=`${item.Bio}`;
travel_curatorsList.appendChild(t0);
const t1 = document.createElement('p');
t1.innerHTML=`${item.CreatedAt}`;
travel_curatorsList.appendChild(t1);
const t2 = document.createElement('p');
t2.innerHTML=`${item.CuratorID}`;
travel_curatorsList.appendChild(t2);
const t3 = document.createElement('p');
t3.innerHTML=`${item.ExperienceYears}`;
travel_curatorsList.appendChild(t3);
const t4 = document.createElement('p');
t4.innerHTML=`${item.Expertise}`;
travel_curatorsList.appendChild(t4);
const t5 = document.createElement('p');
t5.innerHTML=`${item.IsAvailable}`;
travel_curatorsList.appendChild(t5);
const t6 = document.createElement('p');
t6.innerHTML=`${item.Languages}`;
travel_curatorsList.appendChild(t6);
const t7 = document.createElement('p');
t7.innerHTML=`${item.Rating}`;
travel_curatorsList.appendChild(t7);
const t8 = document.createElement('p');
t8.innerHTML=`${item.Specializations}`;
travel_curatorsList.appendChild(t8);
const t9 = document.createElement('p');
t9.innerHTML=`${item.UpdatedAt}`;
travel_curatorsList.appendChild(t9);
const del = document.createElement('button');
del.innerHTML=`DELETE`
del.onclick= () =>{
console.log("deletetravel_curators called");
deletetravel_curators(item.Bio);
}
travel_curatorsList.appendChild(del)
});
}
else
console.error("An error occured",response)
}


// deletetravel_curators()


async function deletetravel_curators(id){
const response = await fetch(`/travel_curators/${id}`, {method:'DELETE'});
let res;
if(response.ok)
 {res=response.json();
 console.log("travel_curators deleted successfully ",res);
 gettravel_curators()}
else
 console.error("Failed to delete travel_curators");
}

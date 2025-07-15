

// views/itineraries.js



const itineraries=document.getElementById('itineraries') ;


getitineraries()// Do not delete this it must be called at the start


 //additineraries


itineraries.addEventListener('submit' , (e)=>
 
{e.preventDefault();

const Category= document.getElementById('Category').value.trim()

const Description= document.getElementById('Description').value.trim()

const Duration= document.getElementById('Duration').value.trim()

const EndLocation= document.getElementById('EndLocation').value.trim()

const ItineraryID= document.getElementById('ItineraryID').value.trim()

const StartLocation= document.getElementById('StartLocation').value.trim()

const Title= document.getElementById('Title').value.trim()

const formData=new FormData()
formData.append('Category',Category)
formData.append('Description',Description)
formData.append('Duration',Duration)
formData.append('EndLocation',EndLocation)
formData.append('ItineraryID',ItineraryID)
formData.append('StartLocation',StartLocation)
formData.append('Title',Title)
const itinerariesData= {
Category ,Description ,Duration ,EndLocation ,ItineraryID ,StartLocation ,Title ,};

const res =fetch('/itineraries',{method:'POST',body:formData}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
const response =fetch('/itineraries',{method:'POST',headers :{'Content-Type':'application/json'},body:JSON.stringify(itinerariesData)}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
if(response.ok)
 getitineraries();
});


//getitinerariesLike


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


const CategoryChoice = document.querySelector('input[name="CategoryChoice"]:checked');
  
if(Category)
choice.push(["Category",CategoryChoice.value]);


let obj=Object.fromEntries(choice);
console.log(obj);
let JSONstring=JSON.stringify(obj);
console.log(JSONstring);
 const response = await axios(`/itinerariesSearch`, {params: obj});
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


//getitineraries()


async function getitineraries(){
const itinerariesList= document.getElementById('itinerariesList');
itinerariesList.innerHTML='';
let data;
const response = await fetch('itineraries' , {method:'GET'});
if(response.ok)
{
data = await response.json();
data.forEach(item =>{
const t0 = document.createElement('p');
t0.innerHTML=`${item.Category}`;
itinerariesList.appendChild(t0);
const t1 = document.createElement('p');
t1.innerHTML=`${item.CreatedAt}`;
itinerariesList.appendChild(t1);
const t2 = document.createElement('p');
t2.innerHTML=`${item.Description}`;
itinerariesList.appendChild(t2);
const t3 = document.createElement('p');
t3.innerHTML=`${item.Duration}`;
itinerariesList.appendChild(t3);
const t4 = document.createElement('p');
t4.innerHTML=`${item.EndLocation}`;
itinerariesList.appendChild(t4);
const t5 = document.createElement('p');
t5.innerHTML=`${item.ItineraryID}`;
itinerariesList.appendChild(t5);
const t6 = document.createElement('p');
t6.innerHTML=`${item.StartLocation}`;
itinerariesList.appendChild(t6);
const t7 = document.createElement('p');
t7.innerHTML=`${item.Title}`;
itinerariesList.appendChild(t7);
const t8 = document.createElement('p');
t8.innerHTML=`${item.UpdatedAt}`;
itinerariesList.appendChild(t8);
const del = document.createElement('button');
del.innerHTML=`DELETE`
del.onclick= () =>{
console.log("deleteitineraries called");
deleteitineraries(item.Category);
}
itinerariesList.appendChild(del)
});
}
else
console.error("An error occured",response)
}


// deleteitineraries()


async function deleteitineraries(id){
const response = await fetch(`/itineraries/${id}`, {method:'DELETE'});
let res;
if(response.ok)
 {res=response.json();
 console.log("itineraries deleted successfully ",res);
 getitineraries()}
else
 console.error("Failed to delete itineraries");
}

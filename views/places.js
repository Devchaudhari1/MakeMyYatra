

// views/places.js



const places=document.getElementById('places') ;


getplaces()// Do not delete this it must be called at the start


 //addplaces


places.addEventListener('submit' , (e)=>
 
{e.preventDefault();

const Category= document.getElementById('Category').value.trim()

const Description= document.getElementById('Description').value.trim()

const EntryFee= document.getElementById('EntryFee').value.trim()

const ImageURL= document.getElementById('ImageURL').value.trim()

const Location= document.getElementById('Location').value.trim()

const OpeningHours= document.getElementById('OpeningHours').value.trim()

const PlaceID= document.getElementById('PlaceID').value.trim()

const PlaceName= document.getElementById('PlaceName').value.trim()

const Rating= document.getElementById('Rating').value.trim()

const formData=new FormData()
formData.append('Category',Category)
formData.append('Description',Description)
formData.append('EntryFee',EntryFee)
formData.append('ImageURL',ImageURL)
formData.append('Location',Location)
formData.append('OpeningHours',OpeningHours)
formData.append('PlaceID',PlaceID)
formData.append('PlaceName',PlaceName)
formData.append('Rating',Rating)
const placesData= {
Category ,Description ,EntryFee ,ImageURL ,Location ,OpeningHours ,PlaceID ,PlaceName ,Rating ,};

const res =fetch('/places',{method:'POST',body:formData}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
const response =fetch('/places',{method:'POST',headers :{'Content-Type':'application/json'},body:JSON.stringify(placesData)}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
if(response.ok)
 getplaces();
});


//getplacesLike


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
 const response = await axios(`/placesSearch`, {params: obj});
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


//getplaces()


async function getplaces(){
const placesList= document.getElementById('placesList');
placesList.innerHTML='';
let data;
const response = await fetch('places' , {method:'GET'});
if(response.ok)
{
data = await response.json();
data.forEach(item =>{
const t0 = document.createElement('p');
t0.innerHTML=`${item.Category}`;
placesList.appendChild(t0);
const t1 = document.createElement('p');
t1.innerHTML=`${item.CreatedAt}`;
placesList.appendChild(t1);
const t2 = document.createElement('p');
t2.innerHTML=`${item.Description}`;
placesList.appendChild(t2);
const t3 = document.createElement('p');
t3.innerHTML=`${item.EntryFee}`;
placesList.appendChild(t3);
const t4 = document.createElement('p');
t4.innerHTML=`${item.ImageURL}`;
placesList.appendChild(t4);
const t5 = document.createElement('p');
t5.innerHTML=`${item.Location}`;
placesList.appendChild(t5);
const t6 = document.createElement('p');
t6.innerHTML=`${item.OpeningHours}`;
placesList.appendChild(t6);
const t7 = document.createElement('p');
t7.innerHTML=`${item.PlaceID}`;
placesList.appendChild(t7);
const t8 = document.createElement('p');
t8.innerHTML=`${item.PlaceName}`;
placesList.appendChild(t8);
const t9 = document.createElement('p');
t9.innerHTML=`${item.Rating}`;
placesList.appendChild(t9);
const t10 = document.createElement('p');
t10.innerHTML=`${item.UpdatedAt}`;
placesList.appendChild(t10);
const del = document.createElement('button');
del.innerHTML=`DELETE`
del.onclick= () =>{
console.log("deleteplaces called");
deleteplaces(item.Category);
}
placesList.appendChild(del)
});
}
else
console.error("An error occured",response)
}


// deleteplaces()


async function deleteplaces(id){
const response = await fetch(`/places/${id}`, {method:'DELETE'});
let res;
if(response.ok)
 {res=response.json();
 console.log("places deleted successfully ",res);
 getplaces()}
else
 console.error("Failed to delete places");
}

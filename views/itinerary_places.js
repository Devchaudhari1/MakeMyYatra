

// views/itinerary_places.js



const itinerary_places=document.getElementById('itinerary_places') ;


getitinerary_places()// Do not delete this it must be called at the start


 //additinerary_places


itinerary_places.addEventListener('submit' , (e)=>
 
{e.preventDefault();

const Day= document.getElementById('Day').value.trim()

const ItineraryID= document.getElementById('ItineraryID').value.trim()

const ItineraryPlaceID= document.getElementById('ItineraryPlaceID').value.trim()

const Notes= document.getElementById('Notes').value.trim()

const PlaceID= document.getElementById('PlaceID').value.trim()

const VisitOrder= document.getElementById('VisitOrder').value.trim()

const formData=new FormData()
formData.append('Day',Day)
formData.append('ItineraryID',ItineraryID)
formData.append('ItineraryPlaceID',ItineraryPlaceID)
formData.append('Notes',Notes)
formData.append('PlaceID',PlaceID)
formData.append('VisitOrder',VisitOrder)
const itinerary_placesData= {
Day ,ItineraryID ,ItineraryPlaceID ,Notes ,PlaceID ,VisitOrder};

const res =fetch('/itinerary_places',{method:'POST',body:formData}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
const response =fetch('/itinerary_places',{method:'POST',headers :{'Content-Type':'application/json'},body:JSON.stringify(itinerary_placesData)}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
if(response.ok)
 getitinerary_places();
});


//getitinerary_placesLike


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
let obj=Object.fromEntries(choice);
console.log(obj);
let JSONstring=JSON.stringify(obj);
console.log(JSONstring);
 const response = await axios(`/itinerary_placesSearch`, {params: obj});
const data =await response.data;//axios automatically parses also .json() does not work here

 try{ if(response.status==200) //response.ok does not work here
 {;
data.forEach( item => {
const t= document.createElement('li');
 t.innerHTML=`${item.ItineraryID}`;
 searchList.appendChild(t);
 
});
}else 
 console.error("An error occurred while searching"); } catch(err){
console.error("Error occured while searching",err);
}
});


//getitinerary_places()


async function getitinerary_places(){
const itinerary_placesList= document.getElementById('itinerary_placesList');
itinerary_placesList.innerHTML='';
let data;
const response = await fetch('itinerary_places' , {method:'GET'});
if(response.ok)
{
data = await response.json();
data.forEach(item =>{
const t0 = document.createElement('p');
t0.innerHTML=`${item.Day}`;
itinerary_placesList.appendChild(t0);
const t1 = document.createElement('p');
t1.innerHTML=`${item.ItineraryID}`;
itinerary_placesList.appendChild(t1);
const t2 = document.createElement('p');
t2.innerHTML=`${item.ItineraryPlaceID}`;
itinerary_placesList.appendChild(t2);
const t3 = document.createElement('p');
t3.innerHTML=`${item.Notes}`;
itinerary_placesList.appendChild(t3);
const t4 = document.createElement('p');
t4.innerHTML=`${item.PlaceID}`;
itinerary_placesList.appendChild(t4);
const t5 = document.createElement('p');
t5.innerHTML=`${item.VisitOrder}`;
itinerary_placesList.appendChild(t5);
const del = document.createElement('button');
del.innerHTML=`DELETE`
del.onclick= () =>{
console.log("deleteitinerary_places called");
deleteitinerary_places(item.Day);
}
itinerary_placesList.appendChild(del)
});
}
else
console.error("An error occured",response)
}


// deleteitinerary_places()


async function deleteitinerary_places(id){
const response = await fetch(`/itinerary_places/${id}`, {method:'DELETE'});
let res;
if(response.ok)
 {res=response.json();
 console.log("itinerary_places deleted successfully ",res);
 getitinerary_places()}
else
 console.error("Failed to delete itinerary_places");
}

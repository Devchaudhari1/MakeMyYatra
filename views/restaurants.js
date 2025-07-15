

// views/restaurants.js



const restaurants=document.getElementById('restaurants') ;


getrestaurants()// Do not delete this it must be called at the start


 //addrestaurants


restaurants.addEventListener('submit' , (e)=>
 
{e.preventDefault();

const City= document.getElementById('City').value.trim()

const Cuisine= document.getElementById('Cuisine').value.trim()

const ImageURL= document.getElementById('ImageURL').value.trim()

const Location= document.getElementById('Location').value.trim()

const OpeningHours= document.getElementById('OpeningHours').value.trim()

const PriceRange= document.getElementById('PriceRange').value.trim()

const Rating= document.getElementById('Rating').value.trim()

const RestaurantID= document.getElementById('RestaurantID').value.trim()

const RestaurantName= document.getElementById('RestaurantName').value.trim()

const State= document.getElementById('State').value.trim()

const formData=new FormData()
formData.append('City',City)
formData.append('Cuisine',Cuisine)
formData.append('ImageURL',ImageURL)
formData.append('Location',Location)
formData.append('OpeningHours',OpeningHours)
formData.append('PriceRange',PriceRange)
formData.append('Rating',Rating)
formData.append('RestaurantID',RestaurantID)
formData.append('RestaurantName',RestaurantName)
formData.append('State',State)
const restaurantsData= {
City ,Cuisine ,ImageURL ,Location ,OpeningHours ,PriceRange ,Rating ,RestaurantID ,RestaurantName ,State ,};

const res =fetch('/restaurants',{method:'POST',body:formData}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
const response =fetch('/restaurants',{method:'POST',headers :{'Content-Type':'application/json'},body:JSON.stringify(restaurantsData)}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
if(response.ok)
 getrestaurants();
});


//getrestaurantsLike


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


const PriceRangeChoice = document.querySelector('input[name="PriceRangeChoice"]:checked');
  
if(PriceRange)
choice.push(["PriceRange",PriceRangeChoice.value]);


let obj=Object.fromEntries(choice);
console.log(obj);
let JSONstring=JSON.stringify(obj);
console.log(JSONstring);
 const response = await axios(`/restaurantsSearch`, {params: obj});
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


//getrestaurants()


async function getrestaurants(){
const restaurantsList= document.getElementById('restaurantsList');
restaurantsList.innerHTML='';
let data;
const response = await fetch('restaurants' , {method:'GET'});
if(response.ok)
{
data = await response.json();
data.forEach(item =>{
const t0 = document.createElement('p');
t0.innerHTML=`${item.City}`;
restaurantsList.appendChild(t0);
const t1 = document.createElement('p');
t1.innerHTML=`${item.CreatedAt}`;
restaurantsList.appendChild(t1);
const t2 = document.createElement('p');
t2.innerHTML=`${item.Cuisine}`;
restaurantsList.appendChild(t2);
const t3 = document.createElement('p');
t3.innerHTML=`${item.ImageURL}`;
restaurantsList.appendChild(t3);
const t4 = document.createElement('p');
t4.innerHTML=`${item.Location}`;
restaurantsList.appendChild(t4);
const t5 = document.createElement('p');
t5.innerHTML=`${item.OpeningHours}`;
restaurantsList.appendChild(t5);
const t6 = document.createElement('p');
t6.innerHTML=`${item.PriceRange}`;
restaurantsList.appendChild(t6);
const t7 = document.createElement('p');
t7.innerHTML=`${item.Rating}`;
restaurantsList.appendChild(t7);
const t8 = document.createElement('p');
t8.innerHTML=`${item.RestaurantID}`;
restaurantsList.appendChild(t8);
const t9 = document.createElement('p');
t9.innerHTML=`${item.RestaurantName}`;
restaurantsList.appendChild(t9);
const t10 = document.createElement('p');
t10.innerHTML=`${item.State}`;
restaurantsList.appendChild(t10);
const t11 = document.createElement('p');
t11.innerHTML=`${item.UpdatedAt}`;
restaurantsList.appendChild(t11);
const del = document.createElement('button');
del.innerHTML=`DELETE`
del.onclick= () =>{
console.log("deleterestaurants called");
deleterestaurants(item.City);
}
restaurantsList.appendChild(del)
});
}
else
console.error("An error occured",response)
}


// deleterestaurants()


async function deleterestaurants(id){
const response = await fetch(`/restaurants/${id}`, {method:'DELETE'});
let res;
if(response.ok)
 {res=response.json();
 console.log("restaurants deleted successfully ",res);
 getrestaurants()}
else
 console.error("Failed to delete restaurants");
}

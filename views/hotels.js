

// views/hotels.js



const hotels=document.getElementById('hotels') ;


gethotels()// Do not delete this it must be called at the start


 //addhotels


hotels.addEventListener('submit' , (e)=>
 
{e.preventDefault();

const cafe= document.getElementById('cafe').value.trim()

const checkIn= document.getElementById('checkIn').value.trim()

const checkOut= document.getElementById('checkOut').value.trim()

const city= document.getElementById('city').value.trim()

const hotelDesc= document.getElementById('hotelDesc').value.trim()

const hotelID= document.getElementById('hotelID').value.trim()

const hotelName= document.getElementById('hotelName').value.trim()

const laundry= document.getElementById('laundry').value.trim()

const locality= document.getElementById('locality').value.trim()

const mainImage= document.getElementById('mainImage').value.trim()

const parking= document.getElementById('parking').value.trim()

const price= document.getElementById('price').value.trim()

const rating= document.getElementById('rating').value.trim()

const restaurant= document.getElementById('restaurant').value.trim()

const roomsAvailable= document.getElementById('roomsAvailable').value.trim()

const stars= document.getElementById('stars').value.trim()

const swimmingPool= document.getElementById('swimmingPool').value.trim()

const wifi= document.getElementById('wifi').value.trim()

const formData=new FormData()
formData.append('cafe',cafe)
formData.append('checkIn',checkIn)
formData.append('checkOut',checkOut)
formData.append('city',city)
formData.append('hotelDesc',hotelDesc)
formData.append('hotelID',hotelID)
formData.append('hotelName',hotelName)
formData.append('laundry',laundry)
formData.append('locality',locality)
formData.append('mainImage',mainImage)
formData.append('parking',parking)
formData.append('price',price)
formData.append('rating',rating)
formData.append('restaurant',restaurant)
formData.append('roomsAvailable',roomsAvailable)
formData.append('stars',stars)
formData.append('swimmingPool',swimmingPool)
formData.append('wifi',wifi)
const hotelsData= {
cafe ,checkIn ,checkOut ,city ,hotelDesc ,hotelID ,hotelName ,laundry ,locality ,mainImage ,parking ,price ,rating ,restaurant ,roomsAvailable ,stars ,swimmingPool ,wifi};

const res =fetch('/hotels',{method:'POST',body:formData}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
const response =fetch('/hotels',{method:'POST',headers :{'Content-Type':'application/json'},body:JSON.stringify(hotelsData)}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
if(response.ok)
 gethotels();
});


//gethotelsLike


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
 const response = await axios(`/hotelsSearch`, {params: obj});
const data =await response.data;//axios automatically parses also .json() does not work here

 try{ if(response.status==200) //response.ok does not work here
 {;
data.forEach( item => {
const t= document.createElement('li');
 t.innerHTML=`${item.checkIn}`;
 searchList.appendChild(t);
 
});
}else 
 console.error("An error occurred while searching"); } catch(err){
console.error("Error occured while searching",err);
}
});


//gethotels()


async function gethotels(){
const hotelsList= document.getElementById('hotelsList');
hotelsList.innerHTML='';
let data;
const response = await fetch('hotels' , {method:'GET'});
if(response.ok)
{
data = await response.json();
data.forEach(item =>{
const t0 = document.createElement('p');
t0.innerHTML=`${item.cafe}`;
hotelsList.appendChild(t0);
const t1 = document.createElement('p');
t1.innerHTML=`${item.checkIn}`;
hotelsList.appendChild(t1);
const t2 = document.createElement('p');
t2.innerHTML=`${item.checkOut}`;
hotelsList.appendChild(t2);
const t3 = document.createElement('p');
t3.innerHTML=`${item.city}`;
hotelsList.appendChild(t3);
const t4 = document.createElement('p');
t4.innerHTML=`${item.hotelDesc}`;
hotelsList.appendChild(t4);
const t5 = document.createElement('p');
t5.innerHTML=`${item.hotelID}`;
hotelsList.appendChild(t5);
const t6 = document.createElement('p');
t6.innerHTML=`${item.hotelName}`;
hotelsList.appendChild(t6);
const t7 = document.createElement('p');
t7.innerHTML=`${item.laundry}`;
hotelsList.appendChild(t7);
const t8 = document.createElement('p');
t8.innerHTML=`${item.locality}`;
hotelsList.appendChild(t8);
const t9 = document.createElement('p');
t9.innerHTML=`${item.mainImage}`;
hotelsList.appendChild(t9);
const t10 = document.createElement('p');
t10.innerHTML=`${item.parking}`;
hotelsList.appendChild(t10);
const t11 = document.createElement('p');
t11.innerHTML=`${item.price}`;
hotelsList.appendChild(t11);
const t12 = document.createElement('p');
t12.innerHTML=`${item.rating}`;
hotelsList.appendChild(t12);
const t13 = document.createElement('p');
t13.innerHTML=`${item.restaurant}`;
hotelsList.appendChild(t13);
const t14 = document.createElement('p');
t14.innerHTML=`${item.roomsAvailable}`;
hotelsList.appendChild(t14);
const t15 = document.createElement('p');
t15.innerHTML=`${item.stars}`;
hotelsList.appendChild(t15);
const t16 = document.createElement('p');
t16.innerHTML=`${item.swimmingPool}`;
hotelsList.appendChild(t16);
const t17 = document.createElement('p');
t17.innerHTML=`${item.wifi}`;
hotelsList.appendChild(t17);
const del = document.createElement('button');
del.innerHTML=`DELETE`
del.onclick= () =>{
console.log("deletehotels called");
deletehotels(item.cafe);
}
hotelsList.appendChild(del)
});
}
else
console.error("An error occured",response)
}


// deletehotels()


async function deletehotels(id){
const response = await fetch(`/hotels/${id}`, {method:'DELETE'});
let res;
if(response.ok)
 {res=response.json();
 console.log("hotels deleted successfully ",res);
 gethotels()}
else
 console.error("Failed to delete hotels");
}

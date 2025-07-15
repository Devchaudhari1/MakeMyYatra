

// views/weather_info.js



const weather_info=document.getElementById('weather_info') ;


getweather_info()// Do not delete this it must be called at the start


 //addweather_info


weather_info.addEventListener('submit' , (e)=>
 
{e.preventDefault();

const Date= document.getElementById('Date').value.trim()

const Humidity= document.getElementById('Humidity').value.trim()

const PlaceID= document.getElementById('PlaceID').value.trim()

const Temperature= document.getElementById('Temperature').value.trim()

const WeatherCondition= document.getElementById('WeatherCondition').value.trim()

const WeatherID= document.getElementById('WeatherID').value.trim()

const WindSpeed= document.getElementById('WindSpeed').value.trim()

const formData=new FormData()
formData.append('Date',Date)
formData.append('Humidity',Humidity)
formData.append('PlaceID',PlaceID)
formData.append('Temperature',Temperature)
formData.append('WeatherCondition',WeatherCondition)
formData.append('WeatherID',WeatherID)
formData.append('WindSpeed',WindSpeed)
const weather_infoData= {
Date ,Humidity ,PlaceID ,Temperature ,WeatherCondition ,WeatherID ,WindSpeed};

const res =fetch('/weather_info',{method:'POST',body:formData}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
const response =fetch('/weather_info',{method:'POST',headers :{'Content-Type':'application/json'},body:JSON.stringify(weather_infoData)}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
if(response.ok)
 getweather_info();
});


//getweather_infoLike


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
 const response = await axios(`/weather_infoSearch`, {params: obj});
const data =await response.data;//axios automatically parses also .json() does not work here

 try{ if(response.status==200) //response.ok does not work here
 {;
data.forEach( item => {
const t= document.createElement('li');
 t.innerHTML=`${item.Date}`;
 searchList.appendChild(t);
 
});
}else 
 console.error("An error occurred while searching"); } catch(err){
console.error("Error occured while searching",err);
}
});


//getweather_info()


async function getweather_info(){
const weather_infoList= document.getElementById('weather_infoList');
weather_infoList.innerHTML='';
let data;
const response = await fetch('weather_info' , {method:'GET'});
if(response.ok)
{
data = await response.json();
data.forEach(item =>{
const t0 = document.createElement('p');
t0.innerHTML=`${item.CreatedAt}`;
weather_infoList.appendChild(t0);
const t1 = document.createElement('p');
t1.innerHTML=`${item.Date}`;
weather_infoList.appendChild(t1);
const t2 = document.createElement('p');
t2.innerHTML=`${item.Humidity}`;
weather_infoList.appendChild(t2);
const t3 = document.createElement('p');
t3.innerHTML=`${item.PlaceID}`;
weather_infoList.appendChild(t3);
const t4 = document.createElement('p');
t4.innerHTML=`${item.Temperature}`;
weather_infoList.appendChild(t4);
const t5 = document.createElement('p');
t5.innerHTML=`${item.UpdatedAt}`;
weather_infoList.appendChild(t5);
const t6 = document.createElement('p');
t6.innerHTML=`${item.WeatherCondition}`;
weather_infoList.appendChild(t6);
const t7 = document.createElement('p');
t7.innerHTML=`${item.WeatherID}`;
weather_infoList.appendChild(t7);
const t8 = document.createElement('p');
t8.innerHTML=`${item.WindSpeed}`;
weather_infoList.appendChild(t8);
const del = document.createElement('button');
del.innerHTML=`DELETE`
del.onclick= () =>{
console.log("deleteweather_info called");
deleteweather_info(item.CreatedAt);
}
weather_infoList.appendChild(del)
});
}
else
console.error("An error occured",response)
}


// deleteweather_info()


async function deleteweather_info(id){
const response = await fetch(`/weather_info/${id}`, {method:'DELETE'});
let res;
if(response.ok)
 {res=response.json();
 console.log("weather_info deleted successfully ",res);
 getweather_info()}
else
 console.error("Failed to delete weather_info");
}

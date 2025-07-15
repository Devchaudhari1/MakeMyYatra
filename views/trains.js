

// views/trains.js



const trains=document.getElementById('trains') ;


gettrains()// Do not delete this it must be called at the start


 //addtrains


trains.addEventListener('submit' , (e)=>
 
{e.preventDefault();

const classes= document.getElementById('classes').value.trim()

const destination= document.getElementById('destination').value.trim()

const destinationCode= document.getElementById('destinationCode').value.trim()

const destinationPlatform= document.getElementById('destinationPlatform').value.trim()

const destinationTime= document.getElementById('destinationTime').value.trim()

const duration= document.getElementById('duration').value.trim()

const noOfBookings= document.getElementById('noOfBookings').value.trim()

const origin= document.getElementById('origin').value.trim()

const originCode= document.getElementById('originCode').value.trim()

const originPlatform= document.getElementById('originPlatform').value.trim()

const originTime= document.getElementById('originTime').value.trim()

const price1AC= document.getElementById('price1AC').value.trim()

const price2AC= document.getElementById('price2AC').value.trim()

const price3AC= document.getElementById('price3AC').value.trim()

const priceChairCar= document.getElementById('priceChairCar').value.trim()

const priceChairCarAC= document.getElementById('priceChairCarAC').value.trim()

const priceSL= document.getElementById('priceSL').value.trim()

const region= document.getElementById('region').value.trim()

const returnTrainNo= document.getElementById('returnTrainNo').value.trim()

const runsOn= document.getElementById('runsOn').value.trim()

const seats1AC= document.getElementById('seats1AC').value.trim()

const seats2AC= document.getElementById('seats2AC').value.trim()

const seats3AC= document.getElementById('seats3AC').value.trim()

const seatsChairCar= document.getElementById('seatsChairCar').value.trim()

const seatsChairCarAC= document.getElementById('seatsChairCarAC').value.trim()

const seatsSL= document.getElementById('seatsSL').value.trim()

const trainName= document.getElementById('trainName').value.trim()

const trainNo= document.getElementById('trainNo').value.trim()

const formData=new FormData()
formData.append('classes',classes)
formData.append('destination',destination)
formData.append('destinationCode',destinationCode)
formData.append('destinationPlatform',destinationPlatform)
formData.append('destinationTime',destinationTime)
formData.append('duration',duration)
formData.append('noOfBookings',noOfBookings)
formData.append('origin',origin)
formData.append('originCode',originCode)
formData.append('originPlatform',originPlatform)
formData.append('originTime',originTime)
formData.append('price1AC',price1AC)
formData.append('price2AC',price2AC)
formData.append('price3AC',price3AC)
formData.append('priceChairCar',priceChairCar)
formData.append('priceChairCarAC',priceChairCarAC)
formData.append('priceSL',priceSL)
formData.append('region',region)
formData.append('returnTrainNo',returnTrainNo)
formData.append('runsOn',runsOn)
formData.append('seats1AC',seats1AC)
formData.append('seats2AC',seats2AC)
formData.append('seats3AC',seats3AC)
formData.append('seatsChairCar',seatsChairCar)
formData.append('seatsChairCarAC',seatsChairCarAC)
formData.append('seatsSL',seatsSL)
formData.append('trainName',trainName)
formData.append('trainNo',trainNo)
const trainsData= {
classes ,destination ,destinationCode ,destinationPlatform ,destinationTime ,duration ,noOfBookings ,origin ,originCode ,originPlatform ,originTime ,price1AC ,price2AC ,price3AC ,priceChairCar ,priceChairCarAC ,priceSL ,region ,returnTrainNo ,runsOn ,seats1AC ,seats2AC ,seats3AC ,seatsChairCar ,seatsChairCarAC ,seatsSL ,trainName ,trainNo};

const res =fetch('/trains',{method:'POST',body:formData}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
const response =fetch('/trains',{method:'POST',headers :{'Content-Type':'application/json'},body:JSON.stringify(trainsData)}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
if(response.ok)
 gettrains();
});


//gettrainsLike


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
 const response = await axios(`/trainsSearch`, {params: obj});
const data =await response.data;//axios automatically parses also .json() does not work here

 try{ if(response.status==200) //response.ok does not work here
 {;
data.forEach( item => {
const t= document.createElement('li');
 t.innerHTML=`${item.destination}`;
 searchList.appendChild(t);
 
});
}else 
 console.error("An error occurred while searching"); } catch(err){
console.error("Error occured while searching",err);
}
});


//gettrains()


async function gettrains(){
const trainsList= document.getElementById('trainsList');
trainsList.innerHTML='';
let data;
const response = await fetch('trains' , {method:'GET'});
if(response.ok)
{
data = await response.json();
data.forEach(item =>{
const t0 = document.createElement('p');
t0.innerHTML=`${item.classes}`;
trainsList.appendChild(t0);
const t1 = document.createElement('p');
t1.innerHTML=`${item.destination}`;
trainsList.appendChild(t1);
const t2 = document.createElement('p');
t2.innerHTML=`${item.destinationCode}`;
trainsList.appendChild(t2);
const t3 = document.createElement('p');
t3.innerHTML=`${item.destinationPlatform}`;
trainsList.appendChild(t3);
const t4 = document.createElement('p');
t4.innerHTML=`${item.destinationTime}`;
trainsList.appendChild(t4);
const t5 = document.createElement('p');
t5.innerHTML=`${item.duration}`;
trainsList.appendChild(t5);
const t6 = document.createElement('p');
t6.innerHTML=`${item.noOfBookings}`;
trainsList.appendChild(t6);
const t7 = document.createElement('p');
t7.innerHTML=`${item.origin}`;
trainsList.appendChild(t7);
const t8 = document.createElement('p');
t8.innerHTML=`${item.originCode}`;
trainsList.appendChild(t8);
const t9 = document.createElement('p');
t9.innerHTML=`${item.originPlatform}`;
trainsList.appendChild(t9);
const t10 = document.createElement('p');
t10.innerHTML=`${item.originTime}`;
trainsList.appendChild(t10);
const t11 = document.createElement('p');
t11.innerHTML=`${item.price1AC}`;
trainsList.appendChild(t11);
const t12 = document.createElement('p');
t12.innerHTML=`${item.price2AC}`;
trainsList.appendChild(t12);
const t13 = document.createElement('p');
t13.innerHTML=`${item.price3AC}`;
trainsList.appendChild(t13);
const t14 = document.createElement('p');
t14.innerHTML=`${item.priceChairCar}`;
trainsList.appendChild(t14);
const t15 = document.createElement('p');
t15.innerHTML=`${item.priceChairCarAC}`;
trainsList.appendChild(t15);
const t16 = document.createElement('p');
t16.innerHTML=`${item.priceSL}`;
trainsList.appendChild(t16);
const t17 = document.createElement('p');
t17.innerHTML=`${item.region}`;
trainsList.appendChild(t17);
const t18 = document.createElement('p');
t18.innerHTML=`${item.returnTrainNo}`;
trainsList.appendChild(t18);
const t19 = document.createElement('p');
t19.innerHTML=`${item.runsOn}`;
trainsList.appendChild(t19);
const t20 = document.createElement('p');
t20.innerHTML=`${item.seats1AC}`;
trainsList.appendChild(t20);
const t21 = document.createElement('p');
t21.innerHTML=`${item.seats2AC}`;
trainsList.appendChild(t21);
const t22 = document.createElement('p');
t22.innerHTML=`${item.seats3AC}`;
trainsList.appendChild(t22);
const t23 = document.createElement('p');
t23.innerHTML=`${item.seatsChairCar}`;
trainsList.appendChild(t23);
const t24 = document.createElement('p');
t24.innerHTML=`${item.seatsChairCarAC}`;
trainsList.appendChild(t24);
const t25 = document.createElement('p');
t25.innerHTML=`${item.seatsSL}`;
trainsList.appendChild(t25);
const t26 = document.createElement('p');
t26.innerHTML=`${item.trainName}`;
trainsList.appendChild(t26);
const t27 = document.createElement('p');
t27.innerHTML=`${item.trainNo}`;
trainsList.appendChild(t27);
const del = document.createElement('button');
del.innerHTML=`DELETE`
del.onclick= () =>{
console.log("deletetrains called");
deletetrains(item.classes);
}
trainsList.appendChild(del)
});
}
else
console.error("An error occured",response)
}


// deletetrains()


async function deletetrains(id){
const response = await fetch(`/trains/${id}`, {method:'DELETE'});
let res;
if(response.ok)
 {res=response.json();
 console.log("trains deleted successfully ",res);
 gettrains()}
else
 console.error("Failed to delete trains");
}

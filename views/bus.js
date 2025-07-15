

// views/bus.js



const bus=document.getElementById('bus') ;


getbus()// Do not delete this it must be called at the start


 //addbus


bus.addEventListener('submit' , (e)=>
 
{e.preventDefault();

const busID= document.getElementById('busID').value.trim()

const operator= document.getElementById('operator').value.trim()

const type= document.getElementById('type').value.trim()

const origin= document.getElementById('origin').value.trim()

const destination= document.getElementById('destination').value.trim()

const originArea= document.getElementById('originArea').value.trim()

const destinationArea= document.getElementById('destinationArea').value.trim()

const departure= document.getElementById('departure').value.trim()

const arrival= document.getElementById('arrival').value.trim()

const seats= document.getElementById('seats').value.trim()

const windows= document.getElementById('windows').value.trim()

const fare= document.getElementById('fare').value.trim()

const seatsAvailable= document.getElementById('seatsAvailable').value.trim()

const noofbookings= document.getElementById('noofbookings').value.trim()

const formData=new FormData()
formData.append('busID',busID)
formData.append('operator',operator)
formData.append('type',type)
formData.append('origin',origin)
formData.append('destination',destination)
formData.append('originArea',originArea)
formData.append('destinationArea',destinationArea)
formData.append('departure',departure)
formData.append('arrival',arrival)
formData.append('seats',seats)
formData.append('windows',windows)
formData.append('fare',fare)
formData.append('seatsAvailable',seatsAvailable)
formData.append('noofbookings',noofbookings)
const busData= {
busID ,operator ,type ,origin ,destination ,originArea ,destinationArea ,departure ,arrival ,seats ,windows ,fare ,seatsAvailable ,noofbookings};

const res =fetch('/bus',{method:'POST',body:formData}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
const response =fetch('/bus',{method:'POST',headers :{'Content-Type':'application/json'},body:JSON.stringify(busData)}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
if(response.ok)
 getbus();
});


//getbusLike


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
 const response = await axios(`/busSearch`, {params: obj});
const data =await response.data;//axios automatically parses also .json() does not work here

 try{ if(response.status==200) //response.ok does not work here
 {;
data.forEach( item => {
const t= document.createElement('li');
 t.innerHTML=`${item.operator}`;
 searchList.appendChild(t);
 
});
}else 
 console.error("An error occurred while searching"); } catch(err){
console.error("Error occured while searching",err);
}
});


//getbus()


async function getbus(){
const busList= document.getElementById('busList');
busList.innerHTML='';
let data;
const response = await fetch('bus' , {method:'GET'});
if(response.ok)
{
data = await response.json();
data.forEach(item =>{
const t0 = document.createElement('p');
t0.innerHTML=`${item.busID}`;
busList.appendChild(t0);
const t1 = document.createElement('p');
t1.innerHTML=`${item.operator}`;
busList.appendChild(t1);
const t2 = document.createElement('p');
t2.innerHTML=`${item.type}`;
busList.appendChild(t2);
const t3 = document.createElement('p');
t3.innerHTML=`${item.origin}`;
busList.appendChild(t3);
const t4 = document.createElement('p');
t4.innerHTML=`${item.destination}`;
busList.appendChild(t4);
const t5 = document.createElement('p');
t5.innerHTML=`${item.originArea}`;
busList.appendChild(t5);
const t6 = document.createElement('p');
t6.innerHTML=`${item.destinationArea}`;
busList.appendChild(t6);
const t7 = document.createElement('p');
t7.innerHTML=`${item.departure}`;
busList.appendChild(t7);
const t8 = document.createElement('p');
t8.innerHTML=`${item.arrival}`;
busList.appendChild(t8);
const t9 = document.createElement('p');
t9.innerHTML=`${item.seats}`;
busList.appendChild(t9);
const t10 = document.createElement('p');
t10.innerHTML=`${item.windows}`;
busList.appendChild(t10);
const t11 = document.createElement('p');
t11.innerHTML=`${item.fare}`;
busList.appendChild(t11);
const t12 = document.createElement('p');
t12.innerHTML=`${item.seatsAvailable}`;
busList.appendChild(t12);
const t13 = document.createElement('p');
t13.innerHTML=`${item.noofbookings}`;
busList.appendChild(t13);
const del = document.createElement('button');
del.innerHTML=`DELETE`
del.onclick= () =>{
console.log("deletebus called");
deletebus(item.busID);
}
busList.appendChild(del)
});
}
else
console.error("An error occured",response)
}


// deletebus()


async function deletebus(id){
const response = await fetch(`/bus/${id}`, {method:'DELETE'});
let res;
if(response.ok)
 {res=response.json();
 console.log("bus deleted successfully ",res);
 getbus()}
else
 console.error("Failed to delete bus");
}



// views/flights.js



const flights=document.getElementById('flights') ;


getflights()// Do not delete this it must be called at the start


 //addflights


flights.addEventListener('submit' , (e)=>
 
{e.preventDefault();

const arrival_time= document.getElementById('arrival_time').value.trim()

const class= document.getElementById('class').value.trim()

const departure_time= document.getElementById('departure_time').value.trim()

const destination= document.getElementById('destination').value.trim()

const destination_code= document.getElementById('destination_code').value.trim()

const distance= document.getElementById('distance').value.trim()

const fare= document.getElementById('fare').value.trim()

const flight_no= document.getElementById('flight_no').value.trim()

const noofbookings= document.getElementById('noofbookings').value.trim()

const operator= document.getElementById('operator').value.trim()

const origin= document.getElementById('origin').value.trim()

const origin_code= document.getElementById('origin_code').value.trim()

const refundable= document.getElementById('refundable').value.trim()

const seats_available= document.getElementById('seats_available').value.trim()

const formData=new FormData()
formData.append('arrival_time',arrival_time)
formData.append('class',class)
formData.append('departure_time',departure_time)
formData.append('destination',destination)
formData.append('destination_code',destination_code)
formData.append('distance',distance)
formData.append('fare',fare)
formData.append('flight_no',flight_no)
formData.append('noofbookings',noofbookings)
formData.append('operator',operator)
formData.append('origin',origin)
formData.append('origin_code',origin_code)
formData.append('refundable',refundable)
formData.append('seats_available',seats_available)
const flightsData= {
arrival_time ,class ,departure_time ,destination ,destination_code ,distance ,fare ,flight_no ,noofbookings ,operator ,origin ,origin_code ,refundable ,seats_available};

const res =fetch('/flights',{method:'POST',body:formData}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
const response =fetch('/flights',{method:'POST',headers :{'Content-Type':'application/json'},body:JSON.stringify(flightsData)}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
if(response.ok)
 getflights();
});


//getflightsLike


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


const classChoice = document.querySelector('input[name="classChoice"]:checked');
  
if(class)
choice.push(["class",classChoice.value]);




const refundableChoice = document.querySelector('input[name="refundableChoice"]:checked');
  
if(refundable)
choice.push(["refundable",refundableChoice.value]);


let obj=Object.fromEntries(choice);
console.log(obj);
let JSONstring=JSON.stringify(obj);
console.log(JSONstring);
 const response = await axios(`/flightsSearch`, {params: obj});
const data =await response.data;//axios automatically parses also .json() does not work here

 try{ if(response.status==200) //response.ok does not work here
 {;
data.forEach( item => {
const t= document.createElement('li');
 t.innerHTML=`${item.class}`;
 searchList.appendChild(t);
 
});
}else 
 console.error("An error occurred while searching"); } catch(err){
console.error("Error occured while searching",err);
}
});


//getflights()


async function getflights(){
const flightsList= document.getElementById('flightsList');
flightsList.innerHTML='';
let data;
const response = await fetch('flights' , {method:'GET'});
if(response.ok)
{
data = await response.json();
data.forEach(item =>{
const t0 = document.createElement('p');
t0.innerHTML=`${item.arrival_time}`;
flightsList.appendChild(t0);
const t1 = document.createElement('p');
t1.innerHTML=`${item.class}`;
flightsList.appendChild(t1);
const t2 = document.createElement('p');
t2.innerHTML=`${item.departure_time}`;
flightsList.appendChild(t2);
const t3 = document.createElement('p');
t3.innerHTML=`${item.destination}`;
flightsList.appendChild(t3);
const t4 = document.createElement('p');
t4.innerHTML=`${item.destination_code}`;
flightsList.appendChild(t4);
const t5 = document.createElement('p');
t5.innerHTML=`${item.distance}`;
flightsList.appendChild(t5);
const t6 = document.createElement('p');
t6.innerHTML=`${item.fare}`;
flightsList.appendChild(t6);
const t7 = document.createElement('p');
t7.innerHTML=`${item.flight_no}`;
flightsList.appendChild(t7);
const t8 = document.createElement('p');
t8.innerHTML=`${item.noofbookings}`;
flightsList.appendChild(t8);
const t9 = document.createElement('p');
t9.innerHTML=`${item.operator}`;
flightsList.appendChild(t9);
const t10 = document.createElement('p');
t10.innerHTML=`${item.origin}`;
flightsList.appendChild(t10);
const t11 = document.createElement('p');
t11.innerHTML=`${item.origin_code}`;
flightsList.appendChild(t11);
const t12 = document.createElement('p');
t12.innerHTML=`${item.refundable}`;
flightsList.appendChild(t12);
const t13 = document.createElement('p');
t13.innerHTML=`${item.seats_available}`;
flightsList.appendChild(t13);
const del = document.createElement('button');
del.innerHTML=`DELETE`
del.onclick= () =>{
console.log("deleteflights called");
deleteflights(item.arrival_time);
}
flightsList.appendChild(del)
});
}
else
console.error("An error occured",response)
}


// deleteflights()


async function deleteflights(id){
const response = await fetch(`/flights/${id}`, {method:'DELETE'});
let res;
if(response.ok)
 {res=response.json();
 console.log("flights deleted successfully ",res);
 getflights()}
else
 console.error("Failed to delete flights");
}



// views/flightbookings.js



const flightbookings=document.getElementById('flightbookings') ;


getflightbookings()// Do not delete this it must be called at the start


 //addflightbookings


flightbookings.addEventListener('submit' , (e)=>
 
{e.preventDefault();

const bookingID= document.getElementById('bookingID').value.trim()

const cancelled= document.getElementById('cancelled').value.trim()

const date= document.getElementById('date').value.trim()

const destination= document.getElementById('destination').value.trim()

const flightNumber= document.getElementById('flightNumber').value.trim()

const origin= document.getElementById('origin').value.trim()

const passengers= document.getElementById('passengers').value.trim()

const paymentStatus= document.getElementById('paymentStatus').value.trim()

const status= document.getElementById('status').value.trim()

const type= document.getElementById('type').value.trim()

const username= document.getElementById('username').value.trim()

const formData=new FormData()
formData.append('bookingID',bookingID)
formData.append('cancelled',cancelled)
formData.append('date',date)
formData.append('destination',destination)
formData.append('flightNumber',flightNumber)
formData.append('origin',origin)
formData.append('passengers',passengers)
formData.append('paymentStatus',paymentStatus)
formData.append('status',status)
formData.append('type',type)
formData.append('username',username)
const flightbookingsData= {
bookingID ,cancelled ,date ,destination ,flightNumber ,origin ,passengers ,paymentStatus ,status ,type ,username};

const res =fetch('/flightbookings',{method:'POST',body:formData}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
const response =fetch('/flightbookings',{method:'POST',headers :{'Content-Type':'application/json'},body:JSON.stringify(flightbookingsData)}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
if(response.ok)
 getflightbookings();
});


//getflightbookingsLike


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


const cancelledChoice = document.querySelector('input[name="cancelledChoice"]:checked');
  
if(cancelled)
choice.push(["cancelled",cancelledChoice.value]);




const paymentStatusChoice = document.querySelector('input[name="paymentStatusChoice"]:checked');
  
if(paymentStatus)
choice.push(["paymentStatus",paymentStatusChoice.value]);




const statusChoice = document.querySelector('input[name="statusChoice"]:checked');
  
if(status)
choice.push(["status",statusChoice.value]);




const typeChoice = document.querySelector('input[name="typeChoice"]:checked');
  
if(type)
choice.push(["type",typeChoice.value]);


let obj=Object.fromEntries(choice);
console.log(obj);
let JSONstring=JSON.stringify(obj);
console.log(JSONstring);
 const response = await axios(`/flightbookingsSearch`, {params: obj});
const data =await response.data;//axios automatically parses also .json() does not work here

 try{ if(response.status==200) //response.ok does not work here
 {;
data.forEach( item => {
const t= document.createElement('li');
 t.innerHTML=`${item.bookingTime}`;
 searchList.appendChild(t);
 
});
}else 
 console.error("An error occurred while searching"); } catch(err){
console.error("Error occured while searching",err);
}
});


//getflightbookings()


async function getflightbookings(){
const flightbookingsList= document.getElementById('flightbookingsList');
flightbookingsList.innerHTML='';
let data;
const response = await fetch('flightbookings' , {method:'GET'});
if(response.ok)
{
data = await response.json();
data.forEach(item =>{
const t0 = document.createElement('p');
t0.innerHTML=`${item.bookingID}`;
flightbookingsList.appendChild(t0);
const t1 = document.createElement('p');
t1.innerHTML=`${item.bookingTime}`;
flightbookingsList.appendChild(t1);
const t2 = document.createElement('p');
t2.innerHTML=`${item.cancelled}`;
flightbookingsList.appendChild(t2);
const t3 = document.createElement('p');
t3.innerHTML=`${item.date}`;
flightbookingsList.appendChild(t3);
const t4 = document.createElement('p');
t4.innerHTML=`${item.destination}`;
flightbookingsList.appendChild(t4);
const t5 = document.createElement('p');
t5.innerHTML=`${item.flightNumber}`;
flightbookingsList.appendChild(t5);
const t6 = document.createElement('p');
t6.innerHTML=`${item.origin}`;
flightbookingsList.appendChild(t6);
const t7 = document.createElement('p');
t7.innerHTML=`${item.passengers}`;
flightbookingsList.appendChild(t7);
const t8 = document.createElement('p');
t8.innerHTML=`${item.paymentStatus}`;
flightbookingsList.appendChild(t8);
const t9 = document.createElement('p');
t9.innerHTML=`${item.status}`;
flightbookingsList.appendChild(t9);
const t10 = document.createElement('p');
t10.innerHTML=`${item.type}`;
flightbookingsList.appendChild(t10);
const t11 = document.createElement('p');
t11.innerHTML=`${item.username}`;
flightbookingsList.appendChild(t11);
const del = document.createElement('button');
del.innerHTML=`DELETE`
del.onclick= () =>{
console.log("deleteflightbookings called");
deleteflightbookings(item.bookingID);
}
flightbookingsList.appendChild(del)
});
}
else
console.error("An error occured",response)
}


// deleteflightbookings()


async function deleteflightbookings(id){
const response = await fetch(`/flightbookings/${id}`, {method:'DELETE'});
let res;
if(response.ok)
 {res=response.json();
 console.log("flightbookings deleted successfully ",res);
 getflightbookings()}
else
 console.error("Failed to delete flightbookings");
}

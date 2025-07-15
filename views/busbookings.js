

// views/busbookings.js



const busbookings=document.getElementById('busbookings') ;


getbusbookings()// Do not delete this it must be called at the start


 //addbusbookings


busbookings.addEventListener('submit' , (e)=>
 
{e.preventDefault();

const bookingID= document.getElementById('bookingID').value.trim()

const username= document.getElementById('username').value.trim()

const date= document.getElementById('date').value.trim()

const cancelled= document.getElementById('cancelled').value.trim()

const origin= document.getElementById('origin').value.trim()

const destination= document.getElementById('destination').value.trim()

const passengers= document.getElementById('passengers').value.trim()

const busID= document.getElementById('busID').value.trim()

const fare= document.getElementById('fare').value.trim()

const status= document.getElementById('status').value.trim()

const formData=new FormData()
formData.append('bookingID',bookingID)
formData.append('username',username)
formData.append('date',date)
formData.append('cancelled',cancelled)
formData.append('origin',origin)
formData.append('destination',destination)
formData.append('passengers',passengers)
formData.append('busID',busID)
formData.append('fare',fare)
formData.append('status',status)
const busbookingsData= {
bookingID ,username ,date ,cancelled ,origin ,destination ,passengers ,busID ,fare ,status};

const res =fetch('/busbookings',{method:'POST',body:formData}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
const response =fetch('/busbookings',{method:'POST',headers :{'Content-Type':'application/json'},body:JSON.stringify(busbookingsData)}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
if(response.ok)
 getbusbookings();
});


//getbusbookingsLike


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




const statusChoice = document.querySelector('input[name="statusChoice"]:checked');
  
if(status)
choice.push(["status",statusChoice.value]);


let obj=Object.fromEntries(choice);
console.log(obj);
let JSONstring=JSON.stringify(obj);
console.log(JSONstring);
 const response = await axios(`/busbookingsSearch`, {params: obj});
const data =await response.data;//axios automatically parses also .json() does not work here

 try{ if(response.status==200) //response.ok does not work here
 {;
data.forEach( item => {
const t= document.createElement('li');
 t.innerHTML=`${item.username}`;
 searchList.appendChild(t);
 
});
}else 
 console.error("An error occurred while searching"); } catch(err){
console.error("Error occured while searching",err);
}
});


//getbusbookings()


async function getbusbookings(){
const busbookingsList= document.getElementById('busbookingsList');
busbookingsList.innerHTML='';
let data;
const response = await fetch('busbookings' , {method:'GET'});
if(response.ok)
{
data = await response.json();
data.forEach(item =>{
const t0 = document.createElement('p');
t0.innerHTML=`${item.bookingID}`;
busbookingsList.appendChild(t0);
const t1 = document.createElement('p');
t1.innerHTML=`${item.username}`;
busbookingsList.appendChild(t1);
const t2 = document.createElement('p');
t2.innerHTML=`${item.date}`;
busbookingsList.appendChild(t2);
const t3 = document.createElement('p');
t3.innerHTML=`${item.cancelled}`;
busbookingsList.appendChild(t3);
const t4 = document.createElement('p');
t4.innerHTML=`${item.origin}`;
busbookingsList.appendChild(t4);
const t5 = document.createElement('p');
t5.innerHTML=`${item.destination}`;
busbookingsList.appendChild(t5);
const t6 = document.createElement('p');
t6.innerHTML=`${item.passengers}`;
busbookingsList.appendChild(t6);
const t7 = document.createElement('p');
t7.innerHTML=`${item.bookingTime}`;
busbookingsList.appendChild(t7);
const t8 = document.createElement('p');
t8.innerHTML=`${item.busID}`;
busbookingsList.appendChild(t8);
const t9 = document.createElement('p');
t9.innerHTML=`${item.fare}`;
busbookingsList.appendChild(t9);
const t10 = document.createElement('p');
t10.innerHTML=`${item.status}`;
busbookingsList.appendChild(t10);
const del = document.createElement('button');
del.innerHTML=`DELETE`
del.onclick= () =>{
console.log("deletebusbookings called");
deletebusbookings(item.bookingID);
}
busbookingsList.appendChild(del)
});
}
else
console.error("An error occured",response)
}


// deletebusbookings()


async function deletebusbookings(id){
const response = await fetch(`/busbookings/${id}`, {method:'DELETE'});
let res;
if(response.ok)
 {res=response.json();
 console.log("busbookings deleted successfully ",res);
 getbusbookings()}
else
 console.error("Failed to delete busbookings");
}

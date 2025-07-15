

// views/cabbookings.js



const cabbookings=document.getElementById('cabbookings') ;


getcabbookings()// Do not delete this it must be called at the start


 //addcabbookings


cabbookings.addEventListener('submit' , (e)=>
 
{e.preventDefault();

const bookingID= document.getElementById('bookingID').value.trim()

const cancelled= document.getElementById('cancelled').value.trim()

const carID= document.getElementById('carID').value.trim()

const date= document.getElementById('date').value.trim()

const destination= document.getElementById('destination').value.trim()

const driverID= document.getElementById('driverID').value.trim()

const fare= document.getElementById('fare').value.trim()

const notes= document.getElementById('notes').value.trim()

const origin= document.getElementById('origin').value.trim()

const passengers= document.getElementById('passengers').value.trim()

const paymentStatus= document.getElementById('paymentStatus').value.trim()

const status= document.getElementById('status').value.trim()

const username= document.getElementById('username').value.trim()

const formData=new FormData()
formData.append('bookingID',bookingID)
formData.append('cancelled',cancelled)
formData.append('carID',carID)
formData.append('date',date)
formData.append('destination',destination)
formData.append('driverID',driverID)
formData.append('fare',fare)
formData.append('notes',notes)
formData.append('origin',origin)
formData.append('passengers',passengers)
formData.append('paymentStatus',paymentStatus)
formData.append('status',status)
formData.append('username',username)
const cabbookingsData= {
bookingID ,cancelled ,carID ,date ,destination ,driverID ,fare ,notes ,origin ,passengers ,paymentStatus ,status ,username};

const res =fetch('/cabbookings',{method:'POST',body:formData}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
const response =fetch('/cabbookings',{method:'POST',headers :{'Content-Type':'application/json'},body:JSON.stringify(cabbookingsData)}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
if(response.ok)
 getcabbookings();
});


//getcabbookingsLike


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


let obj=Object.fromEntries(choice);
console.log(obj);
let JSONstring=JSON.stringify(obj);
console.log(JSONstring);
 const response = await axios(`/cabbookingsSearch`, {params: obj});
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


//getcabbookings()


async function getcabbookings(){
const cabbookingsList= document.getElementById('cabbookingsList');
cabbookingsList.innerHTML='';
let data;
const response = await fetch('cabbookings' , {method:'GET'});
if(response.ok)
{
data = await response.json();
data.forEach(item =>{
const t0 = document.createElement('p');
t0.innerHTML=`${item.bookingID}`;
cabbookingsList.appendChild(t0);
const t1 = document.createElement('p');
t1.innerHTML=`${item.bookingTime}`;
cabbookingsList.appendChild(t1);
const t2 = document.createElement('p');
t2.innerHTML=`${item.cancelled}`;
cabbookingsList.appendChild(t2);
const t3 = document.createElement('p');
t3.innerHTML=`${item.carID}`;
cabbookingsList.appendChild(t3);
const t4 = document.createElement('p');
t4.innerHTML=`${item.date}`;
cabbookingsList.appendChild(t4);
const t5 = document.createElement('p');
t5.innerHTML=`${item.destination}`;
cabbookingsList.appendChild(t5);
const t6 = document.createElement('p');
t6.innerHTML=`${item.driverID}`;
cabbookingsList.appendChild(t6);
const t7 = document.createElement('p');
t7.innerHTML=`${item.fare}`;
cabbookingsList.appendChild(t7);
const t8 = document.createElement('p');
t8.innerHTML=`${item.notes}`;
cabbookingsList.appendChild(t8);
const t9 = document.createElement('p');
t9.innerHTML=`${item.origin}`;
cabbookingsList.appendChild(t9);
const t10 = document.createElement('p');
t10.innerHTML=`${item.passengers}`;
cabbookingsList.appendChild(t10);
const t11 = document.createElement('p');
t11.innerHTML=`${item.paymentStatus}`;
cabbookingsList.appendChild(t11);
const t12 = document.createElement('p');
t12.innerHTML=`${item.status}`;
cabbookingsList.appendChild(t12);
const t13 = document.createElement('p');
t13.innerHTML=`${item.username}`;
cabbookingsList.appendChild(t13);
const del = document.createElement('button');
del.innerHTML=`DELETE`
del.onclick= () =>{
console.log("deletecabbookings called");
deletecabbookings(item.bookingID);
}
cabbookingsList.appendChild(del)
});
}
else
console.error("An error occured",response)
}


// deletecabbookings()


async function deletecabbookings(id){
const response = await fetch(`/cabbookings/${id}`, {method:'DELETE'});
let res;
if(response.ok)
 {res=response.json();
 console.log("cabbookings deleted successfully ",res);
 getcabbookings()}
else
 console.error("Failed to delete cabbookings");
}

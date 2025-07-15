

// views/hotelbookings.js



const hotelbookings=document.getElementById('hotelbookings') ;


gethotelbookings()// Do not delete this it must be called at the start


 //addhotelbookings


hotelbookings.addEventListener('submit' , (e)=>
 
{e.preventDefault();

const bookingID= document.getElementById('bookingID').value.trim()

const cancelled= document.getElementById('cancelled').value.trim()

const checkIn= document.getElementById('checkIn').value.trim()

const checkOut= document.getElementById('checkOut').value.trim()

const date= document.getElementById('date').value.trim()

const guests= document.getElementById('guests').value.trim()

const hotelID= document.getElementById('hotelID').value.trim()

const notes= document.getElementById('notes').value.trim()

const paymentStatus= document.getElementById('paymentStatus').value.trim()

const totalCost= document.getElementById('totalCost').value.trim()

const username= document.getElementById('username').value.trim()

const formData=new FormData()
formData.append('bookingID',bookingID)
formData.append('cancelled',cancelled)
formData.append('checkIn',checkIn)
formData.append('checkOut',checkOut)
formData.append('date',date)
formData.append('guests',guests)
formData.append('hotelID',hotelID)
formData.append('notes',notes)
formData.append('paymentStatus',paymentStatus)
formData.append('totalCost',totalCost)
formData.append('username',username)
const hotelbookingsData= {
bookingID ,cancelled ,checkIn ,checkOut ,date ,guests ,hotelID ,notes ,paymentStatus ,totalCost ,username};

const res =fetch('/hotelbookings',{method:'POST',body:formData}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
const response =fetch('/hotelbookings',{method:'POST',headers :{'Content-Type':'application/json'},body:JSON.stringify(hotelbookingsData)}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
if(response.ok)
 gethotelbookings();
});


//gethotelbookingsLike


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


let obj=Object.fromEntries(choice);
console.log(obj);
let JSONstring=JSON.stringify(obj);
console.log(JSONstring);
 const response = await axios(`/hotelbookingsSearch`, {params: obj});
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


//gethotelbookings()


async function gethotelbookings(){
const hotelbookingsList= document.getElementById('hotelbookingsList');
hotelbookingsList.innerHTML='';
let data;
const response = await fetch('hotelbookings' , {method:'GET'});
if(response.ok)
{
data = await response.json();
data.forEach(item =>{
const t0 = document.createElement('p');
t0.innerHTML=`${item.bookingID}`;
hotelbookingsList.appendChild(t0);
const t1 = document.createElement('p');
t1.innerHTML=`${item.bookingTime}`;
hotelbookingsList.appendChild(t1);
const t2 = document.createElement('p');
t2.innerHTML=`${item.cancelled}`;
hotelbookingsList.appendChild(t2);
const t3 = document.createElement('p');
t3.innerHTML=`${item.checkIn}`;
hotelbookingsList.appendChild(t3);
const t4 = document.createElement('p');
t4.innerHTML=`${item.checkOut}`;
hotelbookingsList.appendChild(t4);
const t5 = document.createElement('p');
t5.innerHTML=`${item.date}`;
hotelbookingsList.appendChild(t5);
const t6 = document.createElement('p');
t6.innerHTML=`${item.guests}`;
hotelbookingsList.appendChild(t6);
const t7 = document.createElement('p');
t7.innerHTML=`${item.hotelID}`;
hotelbookingsList.appendChild(t7);
const t8 = document.createElement('p');
t8.innerHTML=`${item.notes}`;
hotelbookingsList.appendChild(t8);
const t9 = document.createElement('p');
t9.innerHTML=`${item.paymentStatus}`;
hotelbookingsList.appendChild(t9);
const t10 = document.createElement('p');
t10.innerHTML=`${item.totalCost}`;
hotelbookingsList.appendChild(t10);
const t11 = document.createElement('p');
t11.innerHTML=`${item.username}`;
hotelbookingsList.appendChild(t11);
const del = document.createElement('button');
del.innerHTML=`DELETE`
del.onclick= () =>{
console.log("deletehotelbookings called");
deletehotelbookings(item.bookingID);
}
hotelbookingsList.appendChild(del)
});
}
else
console.error("An error occured",response)
}


// deletehotelbookings()


async function deletehotelbookings(id){
const response = await fetch(`/hotelbookings/${id}`, {method:'DELETE'});
let res;
if(response.ok)
 {res=response.json();
 console.log("hotelbookings deleted successfully ",res);
 gethotelbookings()}
else
 console.error("Failed to delete hotelbookings");
}



// views/activity_bookings.js



const activity_bookings=document.getElementById('activity_bookings') ;


getactivity_bookings()// Do not delete this it must be called at the start


 //addactivity_bookings


activity_bookings.addEventListener('submit' , (e)=>
 
{e.preventDefault();

const BookingID= document.getElementById('BookingID').value.trim()

const UserID= document.getElementById('UserID').value.trim()

const ActivityID= document.getElementById('ActivityID').value.trim()

const NumberOfParticipants= document.getElementById('NumberOfParticipants').value.trim()

const TotalPrice= document.getElementById('TotalPrice').value.trim()

const PaymentStatus= document.getElementById('PaymentStatus').value.trim()

const PaymentID= document.getElementById('PaymentID').value.trim()

const Notes= document.getElementById('Notes').value.trim()

const formData=new FormData()
formData.append('BookingID',BookingID)
formData.append('UserID',UserID)
formData.append('ActivityID',ActivityID)
formData.append('NumberOfParticipants',NumberOfParticipants)
formData.append('TotalPrice',TotalPrice)
formData.append('PaymentStatus',PaymentStatus)
formData.append('PaymentID',PaymentID)
formData.append('Notes',Notes)
const activity_bookingsData= {
BookingID ,UserID ,ActivityID ,NumberOfParticipants ,TotalPrice ,PaymentStatus ,PaymentID ,Notes};

const res =fetch('/activity_bookings',{method:'POST',body:formData}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
const response =fetch('/activity_bookings',{method:'POST',headers :{'Content-Type':'application/json'},body:JSON.stringify(activity_bookingsData)}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
if(response.ok)
 getactivity_bookings();
});


//getactivity_bookingsLike


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


const PaymentStatusChoice = document.querySelector('input[name="PaymentStatusChoice"]:checked');
  
if(PaymentStatus)
choice.push(["PaymentStatus",PaymentStatusChoice.value]);


let obj=Object.fromEntries(choice);
console.log(obj);
let JSONstring=JSON.stringify(obj);
console.log(JSONstring);
 const response = await axios(`/activity_bookingsSearch`, {params: obj});
const data =await response.data;//axios automatically parses also .json() does not work here

 try{ if(response.status==200) //response.ok does not work here
 {;
data.forEach( item => {
const t= document.createElement('li');
 t.innerHTML=`${item.UserID}`;
 searchList.appendChild(t);
 
});
}else 
 console.error("An error occurred while searching"); } catch(err){
console.error("Error occured while searching",err);
}
});


//getactivity_bookings()


async function getactivity_bookings(){
const activity_bookingsList= document.getElementById('activity_bookingsList');
activity_bookingsList.innerHTML='';
let data;
const response = await fetch('activity_bookings' , {method:'GET'});
if(response.ok)
{
data = await response.json();
data.forEach(item =>{
const t0 = document.createElement('p');
t0.innerHTML=`${item.BookingID}`;
activity_bookingsList.appendChild(t0);
const t1 = document.createElement('p');
t1.innerHTML=`${item.UserID}`;
activity_bookingsList.appendChild(t1);
const t2 = document.createElement('p');
t2.innerHTML=`${item.ActivityID}`;
activity_bookingsList.appendChild(t2);
const t3 = document.createElement('p');
t3.innerHTML=`${item.BookingDate}`;
activity_bookingsList.appendChild(t3);
const t4 = document.createElement('p');
t4.innerHTML=`${item.NumberOfParticipants}`;
activity_bookingsList.appendChild(t4);
const t5 = document.createElement('p');
t5.innerHTML=`${item.TotalPrice}`;
activity_bookingsList.appendChild(t5);
const t6 = document.createElement('p');
t6.innerHTML=`${item.PaymentStatus}`;
activity_bookingsList.appendChild(t6);
const t7 = document.createElement('p');
t7.innerHTML=`${item.PaymentID}`;
activity_bookingsList.appendChild(t7);
const t8 = document.createElement('p');
t8.innerHTML=`${item.Notes}`;
activity_bookingsList.appendChild(t8);
const del = document.createElement('button');
del.innerHTML=`DELETE`
del.onclick= () =>{
console.log("deleteactivity_bookings called");
deleteactivity_bookings(item.BookingID);
}
activity_bookingsList.appendChild(del)
});
}
else
console.error("An error occured",response)
}


// deleteactivity_bookings()


async function deleteactivity_bookings(id){
const response = await fetch(`/activity_bookings/${id}`, {method:'DELETE'});
let res;
if(response.ok)
 {res=response.json();
 console.log("activity_bookings deleted successfully ",res);
 getactivity_bookings()}
else
 console.error("Failed to delete activity_bookings");
}



// views/trainbookings.js



const trainbookings=document.getElementById('trainbookings') ;


gettrainbookings()// Do not delete this it must be called at the start


 //addtrainbookings


trainbookings.addEventListener('submit' , (e)=>
 
{e.preventDefault();

const bookingID= document.getElementById('bookingID').value.trim()

const cancelled= document.getElementById('cancelled').value.trim()

const class= document.getElementById('class').value.trim()

const date= document.getElementById('date').value.trim()

const destination= document.getElementById('destination').value.trim()

const notes= document.getElementById('notes').value.trim()

const origin= document.getElementById('origin').value.trim()

const passengers= document.getElementById('passengers').value.trim()

const paymentStatus= document.getElementById('paymentStatus').value.trim()

const totalCost= document.getElementById('totalCost').value.trim()

const trainNo= document.getElementById('trainNo').value.trim()

const username= document.getElementById('username').value.trim()

const formData=new FormData()
formData.append('bookingID',bookingID)
formData.append('cancelled',cancelled)
formData.append('class',class)
formData.append('date',date)
formData.append('destination',destination)
formData.append('notes',notes)
formData.append('origin',origin)
formData.append('passengers',passengers)
formData.append('paymentStatus',paymentStatus)
formData.append('totalCost',totalCost)
formData.append('trainNo',trainNo)
formData.append('username',username)
const trainbookingsData= {
bookingID ,cancelled ,class ,date ,destination ,notes ,origin ,passengers ,paymentStatus ,totalCost ,trainNo ,username};

const res =fetch('/trainbookings',{method:'POST',body:formData}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
const response =fetch('/trainbookings',{method:'POST',headers :{'Content-Type':'application/json'},body:JSON.stringify(trainbookingsData)}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
if(response.ok)
 gettrainbookings();
});


//gettrainbookingsLike


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




const classChoice = document.querySelector('input[name="classChoice"]:checked');
  
if(class)
choice.push(["class",classChoice.value]);




const paymentStatusChoice = document.querySelector('input[name="paymentStatusChoice"]:checked');
  
if(paymentStatus)
choice.push(["paymentStatus",paymentStatusChoice.value]);


let obj=Object.fromEntries(choice);
console.log(obj);
let JSONstring=JSON.stringify(obj);
console.log(JSONstring);
 const response = await axios(`/trainbookingsSearch`, {params: obj});
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


//gettrainbookings()


async function gettrainbookings(){
const trainbookingsList= document.getElementById('trainbookingsList');
trainbookingsList.innerHTML='';
let data;
const response = await fetch('trainbookings' , {method:'GET'});
if(response.ok)
{
data = await response.json();
data.forEach(item =>{
const t0 = document.createElement('p');
t0.innerHTML=`${item.bookingID}`;
trainbookingsList.appendChild(t0);
const t1 = document.createElement('p');
t1.innerHTML=`${item.bookingTime}`;
trainbookingsList.appendChild(t1);
const t2 = document.createElement('p');
t2.innerHTML=`${item.cancelled}`;
trainbookingsList.appendChild(t2);
const t3 = document.createElement('p');
t3.innerHTML=`${item.class}`;
trainbookingsList.appendChild(t3);
const t4 = document.createElement('p');
t4.innerHTML=`${item.date}`;
trainbookingsList.appendChild(t4);
const t5 = document.createElement('p');
t5.innerHTML=`${item.destination}`;
trainbookingsList.appendChild(t5);
const t6 = document.createElement('p');
t6.innerHTML=`${item.notes}`;
trainbookingsList.appendChild(t6);
const t7 = document.createElement('p');
t7.innerHTML=`${item.origin}`;
trainbookingsList.appendChild(t7);
const t8 = document.createElement('p');
t8.innerHTML=`${item.passengers}`;
trainbookingsList.appendChild(t8);
const t9 = document.createElement('p');
t9.innerHTML=`${item.paymentStatus}`;
trainbookingsList.appendChild(t9);
const t10 = document.createElement('p');
t10.innerHTML=`${item.totalCost}`;
trainbookingsList.appendChild(t10);
const t11 = document.createElement('p');
t11.innerHTML=`${item.trainNo}`;
trainbookingsList.appendChild(t11);
const t12 = document.createElement('p');
t12.innerHTML=`${item.username}`;
trainbookingsList.appendChild(t12);
const del = document.createElement('button');
del.innerHTML=`DELETE`
del.onclick= () =>{
console.log("deletetrainbookings called");
deletetrainbookings(item.bookingID);
}
trainbookingsList.appendChild(del)
});
}
else
console.error("An error occured",response)
}


// deletetrainbookings()


async function deletetrainbookings(id){
const response = await fetch(`/trainbookings/${id}`, {method:'DELETE'});
let res;
if(response.ok)
 {res=response.json();
 console.log("trainbookings deleted successfully ",res);
 gettrainbookings()}
else
 console.error("Failed to delete trainbookings");
}

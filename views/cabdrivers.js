

// views/cabdrivers.js



const cabdrivers=document.getElementById('cabdrivers') ;


getcabdrivers()// Do not delete this it must be called at the start


 //addcabdrivers


cabdrivers.addEventListener('submit' , (e)=>
 
{e.preventDefault();

const availability= document.getElementById('availability').value.trim()

const carID= document.getElementById('carID').value.trim()

const carModel= document.getElementById('carModel').value.trim()

const carNo= document.getElementById('carNo').value.trim()

const carType= document.getElementById('carType').value.trim()

const driverName= document.getElementById('driverName').value.trim()

const driverPhone= document.getElementById('driverPhone').value.trim()

const driverRating= document.getElementById('driverRating').value.trim()

const earnings= document.getElementById('earnings').value.trim()

const joinDate= document.getElementById('joinDate').value.trim()

const lastTripDate= document.getElementById('lastTripDate').value.trim()

const licenseNumber= document.getElementById('licenseNumber').value.trim()

const notes= document.getElementById('notes').value.trim()

const totalTrips= document.getElementById('totalTrips').value.trim()

const formData=new FormData()
formData.append('availability',availability)
formData.append('carID',carID)
formData.append('carModel',carModel)
formData.append('carNo',carNo)
formData.append('carType',carType)
formData.append('driverName',driverName)
formData.append('driverPhone',driverPhone)
formData.append('driverRating',driverRating)
formData.append('earnings',earnings)
formData.append('joinDate',joinDate)
formData.append('lastTripDate',lastTripDate)
formData.append('licenseNumber',licenseNumber)
formData.append('notes',notes)
formData.append('totalTrips',totalTrips)
const cabdriversData= {
availability ,carID ,carModel ,carNo ,carType ,driverName ,driverPhone ,driverRating ,earnings ,joinDate ,lastTripDate ,licenseNumber ,notes ,totalTrips};

const res =fetch('/cabdrivers',{method:'POST',body:formData}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
const response =fetch('/cabdrivers',{method:'POST',headers :{'Content-Type':'application/json'},body:JSON.stringify(cabdriversData)}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
if(response.ok)
 getcabdrivers();
});


//getcabdriversLike


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


const availabilityChoice = document.querySelector('input[name="availabilityChoice"]:checked');
  
if(availability)
choice.push(["availability",availabilityChoice.value]);


let obj=Object.fromEntries(choice);
console.log(obj);
let JSONstring=JSON.stringify(obj);
console.log(JSONstring);
 const response = await axios(`/cabdriversSearch`, {params: obj});
const data =await response.data;//axios automatically parses also .json() does not work here

 try{ if(response.status==200) //response.ok does not work here
 {;
data.forEach( item => {
const t= document.createElement('li');
 t.innerHTML=`${item.carID}`;
 searchList.appendChild(t);
 
});
}else 
 console.error("An error occurred while searching"); } catch(err){
console.error("Error occured while searching",err);
}
});


//getcabdrivers()


async function getcabdrivers(){
const cabdriversList= document.getElementById('cabdriversList');
cabdriversList.innerHTML='';
let data;
const response = await fetch('cabdrivers' , {method:'GET'});
if(response.ok)
{
data = await response.json();
data.forEach(item =>{
const t0 = document.createElement('p');
t0.innerHTML=`${item.availability}`;
cabdriversList.appendChild(t0);
const t1 = document.createElement('p');
t1.innerHTML=`${item.carID}`;
cabdriversList.appendChild(t1);
const t2 = document.createElement('p');
t2.innerHTML=`${item.carModel}`;
cabdriversList.appendChild(t2);
const t3 = document.createElement('p');
t3.innerHTML=`${item.carNo}`;
cabdriversList.appendChild(t3);
const t4 = document.createElement('p');
t4.innerHTML=`${item.carType}`;
cabdriversList.appendChild(t4);
const t5 = document.createElement('p');
t5.innerHTML=`${item.driverName}`;
cabdriversList.appendChild(t5);
const t6 = document.createElement('p');
t6.innerHTML=`${item.driverPhone}`;
cabdriversList.appendChild(t6);
const t7 = document.createElement('p');
t7.innerHTML=`${item.driverRating}`;
cabdriversList.appendChild(t7);
const t8 = document.createElement('p');
t8.innerHTML=`${item.earnings}`;
cabdriversList.appendChild(t8);
const t9 = document.createElement('p');
t9.innerHTML=`${item.joinDate}`;
cabdriversList.appendChild(t9);
const t10 = document.createElement('p');
t10.innerHTML=`${item.lastTripDate}`;
cabdriversList.appendChild(t10);
const t11 = document.createElement('p');
t11.innerHTML=`${item.licenseNumber}`;
cabdriversList.appendChild(t11);
const t12 = document.createElement('p');
t12.innerHTML=`${item.notes}`;
cabdriversList.appendChild(t12);
const t13 = document.createElement('p');
t13.innerHTML=`${item.totalTrips}`;
cabdriversList.appendChild(t13);
const del = document.createElement('button');
del.innerHTML=`DELETE`
del.onclick= () =>{
console.log("deletecabdrivers called");
deletecabdrivers(item.availability);
}
cabdriversList.appendChild(del)
});
}
else
console.error("An error occured",response)
}


// deletecabdrivers()


async function deletecabdrivers(id){
const response = await fetch(`/cabdrivers/${id}`, {method:'DELETE'});
let res;
if(response.ok)
 {res=response.json();
 console.log("cabdrivers deleted successfully ",res);
 getcabdrivers()}
else
 console.error("Failed to delete cabdrivers");
}

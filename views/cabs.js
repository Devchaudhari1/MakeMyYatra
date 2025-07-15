

// views/cabs.js



const cabs=document.getElementById('cabs') ;


getcabs()// Do not delete this it must be called at the start


 //addcabs


cabs.addEventListener('submit' , (e)=>
 
{e.preventDefault();

const id= document.getElementById('id').value.trim()

const origin= document.getElementById('origin').value.trim()

const destination= document.getElementById('destination').value.trim()

const distance= document.getElementById('distance').value.trim()

const time= document.getElementById('time').value.trim()

const originCode= document.getElementById('originCode').value.trim()

const destinationCode= document.getElementById('destinationCode').value.trim()

const baseFare= document.getElementById('baseFare').value.trim()

const perKmRate= document.getElementById('perKmRate').value.trim()

const estimatedFare= document.getElementById('estimatedFare').value.trim()

const active= document.getElementById('active').value.trim()

const notes= document.getElementById('notes').value.trim()

const formData=new FormData()
formData.append('id',id)
formData.append('origin',origin)
formData.append('destination',destination)
formData.append('distance',distance)
formData.append('time',time)
formData.append('originCode',originCode)
formData.append('destinationCode',destinationCode)
formData.append('baseFare',baseFare)
formData.append('perKmRate',perKmRate)
formData.append('estimatedFare',estimatedFare)
formData.append('active',active)
formData.append('notes',notes)
const cabsData= {
id ,origin ,destination ,distance ,time ,originCode ,destinationCode ,baseFare ,perKmRate ,estimatedFare ,active ,notes};

const res =fetch('/cabs',{method:'POST',body:formData}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
const response =fetch('/cabs',{method:'POST',headers :{'Content-Type':'application/json'},body:JSON.stringify(cabsData)}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
if(response.ok)
 getcabs();
});


//getcabsLike


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


const activeChoice = document.querySelector('input[name="activeChoice"]:checked');
  
if(active)
choice.push(["active",activeChoice.value]);


let obj=Object.fromEntries(choice);
console.log(obj);
let JSONstring=JSON.stringify(obj);
console.log(JSONstring);
 const response = await axios(`/cabsSearch`, {params: obj});
const data =await response.data;//axios automatically parses also .json() does not work here

 try{ if(response.status==200) //response.ok does not work here
 {;
data.forEach( item => {
const t= document.createElement('li');
 t.innerHTML=`${item.origin}`;
 searchList.appendChild(t);
 
});
}else 
 console.error("An error occurred while searching"); } catch(err){
console.error("Error occured while searching",err);
}
});


//getcabs()


async function getcabs(){
const cabsList= document.getElementById('cabsList');
cabsList.innerHTML='';
let data;
const response = await fetch('cabs' , {method:'GET'});
if(response.ok)
{
data = await response.json();
data.forEach(item =>{
const t0 = document.createElement('p');
t0.innerHTML=`${item.id}`;
cabsList.appendChild(t0);
const t1 = document.createElement('p');
t1.innerHTML=`${item.origin}`;
cabsList.appendChild(t1);
const t2 = document.createElement('p');
t2.innerHTML=`${item.destination}`;
cabsList.appendChild(t2);
const t3 = document.createElement('p');
t3.innerHTML=`${item.distance}`;
cabsList.appendChild(t3);
const t4 = document.createElement('p');
t4.innerHTML=`${item.time}`;
cabsList.appendChild(t4);
const t5 = document.createElement('p');
t5.innerHTML=`${item.originCode}`;
cabsList.appendChild(t5);
const t6 = document.createElement('p');
t6.innerHTML=`${item.destinationCode}`;
cabsList.appendChild(t6);
const t7 = document.createElement('p');
t7.innerHTML=`${item.baseFare}`;
cabsList.appendChild(t7);
const t8 = document.createElement('p');
t8.innerHTML=`${item.perKmRate}`;
cabsList.appendChild(t8);
const t9 = document.createElement('p');
t9.innerHTML=`${item.estimatedFare}`;
cabsList.appendChild(t9);
const t10 = document.createElement('p');
t10.innerHTML=`${item.active}`;
cabsList.appendChild(t10);
const t11 = document.createElement('p');
t11.innerHTML=`${item.notes}`;
cabsList.appendChild(t11);
const del = document.createElement('button');
del.innerHTML=`DELETE`
del.onclick= () =>{
console.log("deletecabs called");
deletecabs(item.id);
}
cabsList.appendChild(del)
});
}
else
console.error("An error occured",response)
}


// deletecabs()


async function deletecabs(id){
const response = await fetch(`/cabs/${id}`, {method:'DELETE'});
let res;
if(response.ok)
 {res=response.json();
 console.log("cabs deleted successfully ",res);
 getcabs()}
else
 console.error("Failed to delete cabs");
}

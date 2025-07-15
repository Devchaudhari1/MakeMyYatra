

// views/business_partners.js



const business_partners=document.getElementById('business_partners') ;


getbusiness_partners()// Do not delete this it must be called at the start


 //addbusiness_partners


business_partners.addEventListener('submit' , (e)=>
 
{e.preventDefault();

const BusinessAddress= document.getElementById('BusinessAddress').value.trim()

const BusinessDescription= document.getElementById('BusinessDescription').value.trim()

const BusinessName= document.getElementById('BusinessName').value.trim()

const CuratorID= document.getElementById('CuratorID').value.trim()

const Email= document.getElementById('Email').value.trim()

const FullName= document.getElementById('FullName').value.trim()

const IsVerified= document.getElementById('IsVerified').value.trim()

const PartnerID= document.getElementById('PartnerID').value.trim()

const PartnerType= document.getElementById('PartnerType').value.trim()

const Phone= document.getElementById('Phone').value.trim()

const formData=new FormData()
formData.append('BusinessAddress',BusinessAddress)
formData.append('BusinessDescription',BusinessDescription)
formData.append('BusinessName',BusinessName)
formData.append('CuratorID',CuratorID)
formData.append('Email',Email)
formData.append('FullName',FullName)
formData.append('IsVerified',IsVerified)
formData.append('PartnerID',PartnerID)
formData.append('PartnerType',PartnerType)
formData.append('Phone',Phone)
const business_partnersData= {
BusinessAddress ,BusinessDescription ,BusinessName ,CuratorID ,Email ,FullName ,IsVerified ,PartnerID ,PartnerType ,Phone ,};

const res =fetch('/business_partners',{method:'POST',body:formData}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
const response =fetch('/business_partners',{method:'POST',headers :{'Content-Type':'application/json'},body:JSON.stringify(business_partnersData)}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
if(response.ok)
 getbusiness_partners();
});


//getbusiness_partnersLike


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


const IsVerifiedChoice = document.querySelector('input[name="IsVerifiedChoice"]:checked');
  
if(IsVerified)
choice.push(["IsVerified",IsVerifiedChoice.value]);




const PartnerTypeChoice = document.querySelector('input[name="PartnerTypeChoice"]:checked');
  
if(PartnerType)
choice.push(["PartnerType",PartnerTypeChoice.value]);


let obj=Object.fromEntries(choice);
console.log(obj);
let JSONstring=JSON.stringify(obj);
console.log(JSONstring);
 const response = await axios(`/business_partnersSearch`, {params: obj});
const data =await response.data;//axios automatically parses also .json() does not work here

 try{ if(response.status==200) //response.ok does not work here
 {;
data.forEach( item => {
const t= document.createElement('li');
 t.innerHTML=`${item.BusinessDescription}`;
 searchList.appendChild(t);
 
});
}else 
 console.error("An error occurred while searching"); } catch(err){
console.error("Error occured while searching",err);
}
});


//getbusiness_partners()


async function getbusiness_partners(){
const business_partnersList= document.getElementById('business_partnersList');
business_partnersList.innerHTML='';
let data;
const response = await fetch('business_partners' , {method:'GET'});
if(response.ok)
{
data = await response.json();
data.forEach(item =>{
const t0 = document.createElement('p');
t0.innerHTML=`${item.BusinessAddress}`;
business_partnersList.appendChild(t0);
const t1 = document.createElement('p');
t1.innerHTML=`${item.BusinessDescription}`;
business_partnersList.appendChild(t1);
const t2 = document.createElement('p');
t2.innerHTML=`${item.BusinessName}`;
business_partnersList.appendChild(t2);
const t3 = document.createElement('p');
t3.innerHTML=`${item.CreatedAt}`;
business_partnersList.appendChild(t3);
const t4 = document.createElement('p');
t4.innerHTML=`${item.CuratorID}`;
business_partnersList.appendChild(t4);
const t5 = document.createElement('p');
t5.innerHTML=`${item.Email}`;
business_partnersList.appendChild(t5);
const t6 = document.createElement('p');
t6.innerHTML=`${item.FullName}`;
business_partnersList.appendChild(t6);
const t7 = document.createElement('p');
t7.innerHTML=`${item.IsVerified}`;
business_partnersList.appendChild(t7);
const t8 = document.createElement('p');
t8.innerHTML=`${item.PartnerID}`;
business_partnersList.appendChild(t8);
const t9 = document.createElement('p');
t9.innerHTML=`${item.PartnerType}`;
business_partnersList.appendChild(t9);
const t10 = document.createElement('p');
t10.innerHTML=`${item.Phone}`;
business_partnersList.appendChild(t10);
const t11 = document.createElement('p');
t11.innerHTML=`${item.UpdatedAt}`;
business_partnersList.appendChild(t11);
const del = document.createElement('button');
del.innerHTML=`DELETE`
del.onclick= () =>{
console.log("deletebusiness_partners called");
deletebusiness_partners(item.BusinessAddress);
}
business_partnersList.appendChild(del)
});
}
else
console.error("An error occured",response)
}


// deletebusiness_partners()


async function deletebusiness_partners(id){
const response = await fetch(`/business_partners/${id}`, {method:'DELETE'});
let res;
if(response.ok)
 {res=response.json();
 console.log("business_partners deleted successfully ",res);
 getbusiness_partners()}
else
 console.error("Failed to delete business_partners");
}

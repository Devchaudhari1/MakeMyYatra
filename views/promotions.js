

// views/promotions.js



const promotions=document.getElementById('promotions') ;


getpromotions()// Do not delete this it must be called at the start


 //addpromotions


promotions.addEventListener('submit' , (e)=>
 
{e.preventDefault();

const ApplicableEntityID= document.getElementById('ApplicableEntityID').value.trim()

const ApplicableEntityType= document.getElementById('ApplicableEntityType').value.trim()

const CurrentUsage= document.getElementById('CurrentUsage').value.trim()

const Description= document.getElementById('Description').value.trim()

const DiscountType= document.getElementById('DiscountType').value.trim()

const DiscountValue= document.getElementById('DiscountValue').value.trim()

const EndDate= document.getElementById('EndDate').value.trim()

const IsActive= document.getElementById('IsActive').value.trim()

const MaxUsage= document.getElementById('MaxUsage').value.trim()

const MinOrderAmount= document.getElementById('MinOrderAmount').value.trim()

const PromotionCode= document.getElementById('PromotionCode').value.trim()

const PromotionID= document.getElementById('PromotionID').value.trim()

const StartDate= document.getElementById('StartDate').value.trim()

const formData=new FormData()
formData.append('ApplicableEntityID',ApplicableEntityID)
formData.append('ApplicableEntityType',ApplicableEntityType)
formData.append('CurrentUsage',CurrentUsage)
formData.append('Description',Description)
formData.append('DiscountType',DiscountType)
formData.append('DiscountValue',DiscountValue)
formData.append('EndDate',EndDate)
formData.append('IsActive',IsActive)
formData.append('MaxUsage',MaxUsage)
formData.append('MinOrderAmount',MinOrderAmount)
formData.append('PromotionCode',PromotionCode)
formData.append('PromotionID',PromotionID)
formData.append('StartDate',StartDate)
const promotionsData= {
ApplicableEntityID ,ApplicableEntityType ,CurrentUsage ,Description ,DiscountType ,DiscountValue ,EndDate ,IsActive ,MaxUsage ,MinOrderAmount ,PromotionCode ,PromotionID ,StartDate ,};

const res =fetch('/promotions',{method:'POST',body:formData}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
const response =fetch('/promotions',{method:'POST',headers :{'Content-Type':'application/json'},body:JSON.stringify(promotionsData)}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
if(response.ok)
 getpromotions();
});


//getpromotionsLike


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


const ApplicableEntityTypeChoice = document.querySelector('input[name="ApplicableEntityTypeChoice"]:checked');
  
if(ApplicableEntityType)
choice.push(["ApplicableEntityType",ApplicableEntityTypeChoice.value]);




const DiscountTypeChoice = document.querySelector('input[name="DiscountTypeChoice"]:checked');
  
if(DiscountType)
choice.push(["DiscountType",DiscountTypeChoice.value]);


let obj=Object.fromEntries(choice);
console.log(obj);
let JSONstring=JSON.stringify(obj);
console.log(JSONstring);
 const response = await axios(`/promotionsSearch`, {params: obj});
const data =await response.data;//axios automatically parses also .json() does not work here

 try{ if(response.status==200) //response.ok does not work here
 {;
data.forEach( item => {
const t= document.createElement('li');
 t.innerHTML=`${item.ApplicableEntityType}`;
 searchList.appendChild(t);
 
});
}else 
 console.error("An error occurred while searching"); } catch(err){
console.error("Error occured while searching",err);
}
});


//getpromotions()


async function getpromotions(){
const promotionsList= document.getElementById('promotionsList');
promotionsList.innerHTML='';
let data;
const response = await fetch('promotions' , {method:'GET'});
if(response.ok)
{
data = await response.json();
data.forEach(item =>{
const t0 = document.createElement('p');
t0.innerHTML=`${item.ApplicableEntityID}`;
promotionsList.appendChild(t0);
const t1 = document.createElement('p');
t1.innerHTML=`${item.ApplicableEntityType}`;
promotionsList.appendChild(t1);
const t2 = document.createElement('p');
t2.innerHTML=`${item.CreatedAt}`;
promotionsList.appendChild(t2);
const t3 = document.createElement('p');
t3.innerHTML=`${item.CurrentUsage}`;
promotionsList.appendChild(t3);
const t4 = document.createElement('p');
t4.innerHTML=`${item.Description}`;
promotionsList.appendChild(t4);
const t5 = document.createElement('p');
t5.innerHTML=`${item.DiscountType}`;
promotionsList.appendChild(t5);
const t6 = document.createElement('p');
t6.innerHTML=`${item.DiscountValue}`;
promotionsList.appendChild(t6);
const t7 = document.createElement('p');
t7.innerHTML=`${item.EndDate}`;
promotionsList.appendChild(t7);
const t8 = document.createElement('p');
t8.innerHTML=`${item.IsActive}`;
promotionsList.appendChild(t8);
const t9 = document.createElement('p');
t9.innerHTML=`${item.MaxUsage}`;
promotionsList.appendChild(t9);
const t10 = document.createElement('p');
t10.innerHTML=`${item.MinOrderAmount}`;
promotionsList.appendChild(t10);
const t11 = document.createElement('p');
t11.innerHTML=`${item.PromotionCode}`;
promotionsList.appendChild(t11);
const t12 = document.createElement('p');
t12.innerHTML=`${item.PromotionID}`;
promotionsList.appendChild(t12);
const t13 = document.createElement('p');
t13.innerHTML=`${item.StartDate}`;
promotionsList.appendChild(t13);
const t14 = document.createElement('p');
t14.innerHTML=`${item.UpdatedAt}`;
promotionsList.appendChild(t14);
const del = document.createElement('button');
del.innerHTML=`DELETE`
del.onclick= () =>{
console.log("deletepromotions called");
deletepromotions(item.ApplicableEntityID);
}
promotionsList.appendChild(del)
});
}
else
console.error("An error occured",response)
}


// deletepromotions()


async function deletepromotions(id){
const response = await fetch(`/promotions/${id}`, {method:'DELETE'});
let res;
if(response.ok)
 {res=response.json();
 console.log("promotions deleted successfully ",res);
 getpromotions()}
else
 console.error("Failed to delete promotions");
}

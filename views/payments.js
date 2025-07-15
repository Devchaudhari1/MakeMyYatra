

// views/payments.js



const payments=document.getElementById('payments') ;


getpayments()// Do not delete this it must be called at the start


 //addpayments


payments.addEventListener('submit' , (e)=>
 
{e.preventDefault();

const Amount= document.getElementById('Amount').value.trim()

const Coupons= document.getElementById('Coupons').value.trim()

const Discounts= document.getElementById('Discounts').value.trim()

const EntityID= document.getElementById('EntityID').value.trim()

const EntityType= document.getElementById('EntityType').value.trim()

const Notes= document.getElementById('Notes').value.trim()

const PaymentID= document.getElementById('PaymentID').value.trim()

const PaymentMethod= document.getElementById('PaymentMethod').value.trim()

const PaymentStatus= document.getElementById('PaymentStatus').value.trim()

const PromotionID= document.getElementById('PromotionID').value.trim()

const TransactionID= document.getElementById('TransactionID').value.trim()

const UserID= document.getElementById('UserID').value.trim()

const formData=new FormData()
formData.append('Amount',Amount)
formData.append('Coupons',Coupons)
formData.append('Discounts',Discounts)
formData.append('EntityID',EntityID)
formData.append('EntityType',EntityType)
formData.append('Notes',Notes)
formData.append('PaymentID',PaymentID)
formData.append('PaymentMethod',PaymentMethod)
formData.append('PaymentStatus',PaymentStatus)
formData.append('PromotionID',PromotionID)
formData.append('TransactionID',TransactionID)
formData.append('UserID',UserID)
const paymentsData= {
Amount ,Coupons ,Discounts ,EntityID ,EntityType ,Notes ,PaymentID ,PaymentMethod ,PaymentStatus ,PromotionID ,TransactionID ,UserID};

const res =fetch('/payments',{method:'POST',body:formData}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
const response =fetch('/payments',{method:'POST',headers :{'Content-Type':'application/json'},body:JSON.stringify(paymentsData)}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
if(response.ok)
 getpayments();
});


//getpaymentsLike


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


const EntityTypeChoice = document.querySelector('input[name="EntityTypeChoice"]:checked');
  
if(EntityType)
choice.push(["EntityType",EntityTypeChoice.value]);




const PaymentMethodChoice = document.querySelector('input[name="PaymentMethodChoice"]:checked');
  
if(PaymentMethod)
choice.push(["PaymentMethod",PaymentMethodChoice.value]);




const PaymentStatusChoice = document.querySelector('input[name="PaymentStatusChoice"]:checked');
  
if(PaymentStatus)
choice.push(["PaymentStatus",PaymentStatusChoice.value]);


let obj=Object.fromEntries(choice);
console.log(obj);
let JSONstring=JSON.stringify(obj);
console.log(JSONstring);
 const response = await axios(`/paymentsSearch`, {params: obj});
const data =await response.data;//axios automatically parses also .json() does not work here

 try{ if(response.status==200) //response.ok does not work here
 {;
data.forEach( item => {
const t= document.createElement('li');
 t.innerHTML=`${item.Coupons}`;
 searchList.appendChild(t);
 
});
}else 
 console.error("An error occurred while searching"); } catch(err){
console.error("Error occured while searching",err);
}
});


//getpayments()


async function getpayments(){
const paymentsList= document.getElementById('paymentsList');
paymentsList.innerHTML='';
let data;
const response = await fetch('payments' , {method:'GET'});
if(response.ok)
{
data = await response.json();
data.forEach(item =>{
const t0 = document.createElement('p');
t0.innerHTML=`${item.Amount}`;
paymentsList.appendChild(t0);
const t1 = document.createElement('p');
t1.innerHTML=`${item.Coupons}`;
paymentsList.appendChild(t1);
const t2 = document.createElement('p');
t2.innerHTML=`${item.Discounts}`;
paymentsList.appendChild(t2);
const t3 = document.createElement('p');
t3.innerHTML=`${item.EntityID}`;
paymentsList.appendChild(t3);
const t4 = document.createElement('p');
t4.innerHTML=`${item.EntityType}`;
paymentsList.appendChild(t4);
const t5 = document.createElement('p');
t5.innerHTML=`${item.Notes}`;
paymentsList.appendChild(t5);
const t6 = document.createElement('p');
t6.innerHTML=`${item.PaymentDate}`;
paymentsList.appendChild(t6);
const t7 = document.createElement('p');
t7.innerHTML=`${item.PaymentID}`;
paymentsList.appendChild(t7);
const t8 = document.createElement('p');
t8.innerHTML=`${item.PaymentMethod}`;
paymentsList.appendChild(t8);
const t9 = document.createElement('p');
t9.innerHTML=`${item.PaymentStatus}`;
paymentsList.appendChild(t9);
const t10 = document.createElement('p');
t10.innerHTML=`${item.PromotionID}`;
paymentsList.appendChild(t10);
const t11 = document.createElement('p');
t11.innerHTML=`${item.TransactionID}`;
paymentsList.appendChild(t11);
const t12 = document.createElement('p');
t12.innerHTML=`${item.UserID}`;
paymentsList.appendChild(t12);
const del = document.createElement('button');
del.innerHTML=`DELETE`
del.onclick= () =>{
console.log("deletepayments called");
deletepayments(item.Amount);
}
paymentsList.appendChild(del)
});
}
else
console.error("An error occured",response)
}


// deletepayments()


async function deletepayments(id){
const response = await fetch(`/payments/${id}`, {method:'DELETE'});
let res;
if(response.ok)
 {res=response.json();
 console.log("payments deleted successfully ",res);
 getpayments()}
else
 console.error("Failed to delete payments");
}

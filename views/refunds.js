

// views/refunds.js



const refunds=document.getElementById('refunds') ;


getrefunds()// Do not delete this it must be called at the start


 //addrefunds


refunds.addEventListener('submit' , (e)=>
 
{e.preventDefault();

const Currency= document.getElementById('Currency').value.trim()

const GatewayRefundID= document.getElementById('GatewayRefundID').value.trim()

const GatewayResponse= document.getElementById('GatewayResponse').value.trim()

const Notes= document.getElementById('Notes').value.trim()

const RefundAmount= document.getElementById('RefundAmount').value.trim()

const RefundID= document.getElementById('RefundID').value.trim()

const RefundReason= document.getElementById('RefundReason').value.trim()

const RefundStatus= document.getElementById('RefundStatus').value.trim()

const TransactionID= document.getElementById('TransactionID').value.trim()

const formData=new FormData()
formData.append('Currency',Currency)
formData.append('GatewayRefundID',GatewayRefundID)
formData.append('GatewayResponse',GatewayResponse)
formData.append('Notes',Notes)
formData.append('RefundAmount',RefundAmount)
formData.append('RefundID',RefundID)
formData.append('RefundReason',RefundReason)
formData.append('RefundStatus',RefundStatus)
formData.append('TransactionID',TransactionID)
const refundsData= {
Currency ,GatewayRefundID ,GatewayResponse ,Notes ,RefundAmount ,RefundID ,RefundReason ,RefundStatus ,TransactionID};

const res =fetch('/refunds',{method:'POST',body:formData}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
const response =fetch('/refunds',{method:'POST',headers :{'Content-Type':'application/json'},body:JSON.stringify(refundsData)}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
if(response.ok)
 getrefunds();
});


//getrefundsLike


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


const RefundReasonChoice = document.querySelector('input[name="RefundReasonChoice"]:checked');
  
if(RefundReason)
choice.push(["RefundReason",RefundReasonChoice.value]);




const RefundStatusChoice = document.querySelector('input[name="RefundStatusChoice"]:checked');
  
if(RefundStatus)
choice.push(["RefundStatus",RefundStatusChoice.value]);


let obj=Object.fromEntries(choice);
console.log(obj);
let JSONstring=JSON.stringify(obj);
console.log(JSONstring);
 const response = await axios(`/refundsSearch`, {params: obj});
const data =await response.data;//axios automatically parses also .json() does not work here

 try{ if(response.status==200) //response.ok does not work here
 {;
data.forEach( item => {
const t= document.createElement('li');
 t.innerHTML=`${item.GatewayRefundID}`;
 searchList.appendChild(t);
 
});
}else 
 console.error("An error occurred while searching"); } catch(err){
console.error("Error occured while searching",err);
}
});


//getrefunds()


async function getrefunds(){
const refundsList= document.getElementById('refundsList');
refundsList.innerHTML='';
let data;
const response = await fetch('refunds' , {method:'GET'});
if(response.ok)
{
data = await response.json();
data.forEach(item =>{
const t0 = document.createElement('p');
t0.innerHTML=`${item.Currency}`;
refundsList.appendChild(t0);
const t1 = document.createElement('p');
t1.innerHTML=`${item.GatewayRefundID}`;
refundsList.appendChild(t1);
const t2 = document.createElement('p');
t2.innerHTML=`${item.GatewayResponse}`;
refundsList.appendChild(t2);
const t3 = document.createElement('p');
t3.innerHTML=`${item.Notes}`;
refundsList.appendChild(t3);
const t4 = document.createElement('p');
t4.innerHTML=`${item.RefundAmount}`;
refundsList.appendChild(t4);
const t5 = document.createElement('p');
t5.innerHTML=`${item.RefundDate}`;
refundsList.appendChild(t5);
const t6 = document.createElement('p');
t6.innerHTML=`${item.RefundID}`;
refundsList.appendChild(t6);
const t7 = document.createElement('p');
t7.innerHTML=`${item.RefundReason}`;
refundsList.appendChild(t7);
const t8 = document.createElement('p');
t8.innerHTML=`${item.RefundStatus}`;
refundsList.appendChild(t8);
const t9 = document.createElement('p');
t9.innerHTML=`${item.TransactionID}`;
refundsList.appendChild(t9);
const del = document.createElement('button');
del.innerHTML=`DELETE`
del.onclick= () =>{
console.log("deleterefunds called");
deleterefunds(item.Currency);
}
refundsList.appendChild(del)
});
}
else
console.error("An error occured",response)
}


// deleterefunds()


async function deleterefunds(id){
const response = await fetch(`/refunds/${id}`, {method:'DELETE'});
let res;
if(response.ok)
 {res=response.json();
 console.log("refunds deleted successfully ",res);
 getrefunds()}
else
 console.error("Failed to delete refunds");
}

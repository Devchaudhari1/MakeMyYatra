

// views/payment_gateway_fees.js



const payment_gateway_fees=document.getElementById('payment_gateway_fees') ;


getpayment_gateway_fees()// Do not delete this it must be called at the start


 //addpayment_gateway_fees


payment_gateway_fees.addEventListener('submit' , (e)=>
 
{e.preventDefault();

const Currency= document.getElementById('Currency').value.trim()

const FeeAmount= document.getElementById('FeeAmount').value.trim()

const FeeDescription= document.getElementById('FeeDescription').value.trim()

const FeeID= document.getElementById('FeeID').value.trim()

const FeeType= document.getElementById('FeeType').value.trim()

const GatewayResponse= document.getElementById('GatewayResponse').value.trim()

const Notes= document.getElementById('Notes').value.trim()

const TransactionID= document.getElementById('TransactionID').value.trim()

const formData=new FormData()
formData.append('Currency',Currency)
formData.append('FeeAmount',FeeAmount)
formData.append('FeeDescription',FeeDescription)
formData.append('FeeID',FeeID)
formData.append('FeeType',FeeType)
formData.append('GatewayResponse',GatewayResponse)
formData.append('Notes',Notes)
formData.append('TransactionID',TransactionID)
const payment_gateway_feesData= {
Currency ,FeeAmount ,FeeDescription ,FeeID ,FeeType ,GatewayResponse ,Notes ,TransactionID};

const res =fetch('/payment_gateway_fees',{method:'POST',body:formData}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
const response =fetch('/payment_gateway_fees',{method:'POST',headers :{'Content-Type':'application/json'},body:JSON.stringify(payment_gateway_feesData)}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
if(response.ok)
 getpayment_gateway_fees();
});


//getpayment_gateway_feesLike


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


const FeeTypeChoice = document.querySelector('input[name="FeeTypeChoice"]:checked');
  
if(FeeType)
choice.push(["FeeType",FeeTypeChoice.value]);


let obj=Object.fromEntries(choice);
console.log(obj);
let JSONstring=JSON.stringify(obj);
console.log(JSONstring);
 const response = await axios(`/payment_gateway_feesSearch`, {params: obj});
const data =await response.data;//axios automatically parses also .json() does not work here

 try{ if(response.status==200) //response.ok does not work here
 {;
data.forEach( item => {
const t= document.createElement('li');
 t.innerHTML=`${item.FeeAmount}`;
 searchList.appendChild(t);
 
});
}else 
 console.error("An error occurred while searching"); } catch(err){
console.error("Error occured while searching",err);
}
});


//getpayment_gateway_fees()


async function getpayment_gateway_fees(){
const payment_gateway_feesList= document.getElementById('payment_gateway_feesList');
payment_gateway_feesList.innerHTML='';
let data;
const response = await fetch('payment_gateway_fees' , {method:'GET'});
if(response.ok)
{
data = await response.json();
data.forEach(item =>{
const t0 = document.createElement('p');
t0.innerHTML=`${item.Currency}`;
payment_gateway_feesList.appendChild(t0);
const t1 = document.createElement('p');
t1.innerHTML=`${item.FeeAmount}`;
payment_gateway_feesList.appendChild(t1);
const t2 = document.createElement('p');
t2.innerHTML=`${item.FeeDate}`;
payment_gateway_feesList.appendChild(t2);
const t3 = document.createElement('p');
t3.innerHTML=`${item.FeeDescription}`;
payment_gateway_feesList.appendChild(t3);
const t4 = document.createElement('p');
t4.innerHTML=`${item.FeeID}`;
payment_gateway_feesList.appendChild(t4);
const t5 = document.createElement('p');
t5.innerHTML=`${item.FeeType}`;
payment_gateway_feesList.appendChild(t5);
const t6 = document.createElement('p');
t6.innerHTML=`${item.GatewayResponse}`;
payment_gateway_feesList.appendChild(t6);
const t7 = document.createElement('p');
t7.innerHTML=`${item.Notes}`;
payment_gateway_feesList.appendChild(t7);
const t8 = document.createElement('p');
t8.innerHTML=`${item.TransactionID}`;
payment_gateway_feesList.appendChild(t8);
const del = document.createElement('button');
del.innerHTML=`DELETE`
del.onclick= () =>{
console.log("deletepayment_gateway_fees called");
deletepayment_gateway_fees(item.Currency);
}
payment_gateway_feesList.appendChild(del)
});
}
else
console.error("An error occured",response)
}


// deletepayment_gateway_fees()


async function deletepayment_gateway_fees(id){
const response = await fetch(`/payment_gateway_fees/${id}`, {method:'DELETE'});
let res;
if(response.ok)
 {res=response.json();
 console.log("payment_gateway_fees deleted successfully ",res);
 getpayment_gateway_fees()}
else
 console.error("Failed to delete payment_gateway_fees");
}

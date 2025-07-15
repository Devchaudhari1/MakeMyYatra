

// views/payment_gateway_transactions.js



const payment_gateway_transactions=document.getElementById('payment_gateway_transactions') ;


getpayment_gateway_transactions()// Do not delete this it must be called at the start


 //addpayment_gateway_transactions


payment_gateway_transactions.addEventListener('submit' , (e)=>
 
{e.preventDefault();

const Amount= document.getElementById('Amount').value.trim()

const Currency= document.getElementById('Currency').value.trim()

const GatewayResponse= document.getElementById('GatewayResponse').value.trim()

const GatewayTransactionID= document.getElementById('GatewayTransactionID').value.trim()

const Notes= document.getElementById('Notes').value.trim()

const PaymentGateway= document.getElementById('PaymentGateway').value.trim()

const PaymentStatus= document.getElementById('PaymentStatus').value.trim()

const RefundAmount= document.getElementById('RefundAmount').value.trim()

const TransactionID= document.getElementById('TransactionID').value.trim()

const UserID= document.getElementById('UserID').value.trim()

const formData=new FormData()
formData.append('Amount',Amount)
formData.append('Currency',Currency)
formData.append('GatewayResponse',GatewayResponse)
formData.append('GatewayTransactionID',GatewayTransactionID)
formData.append('Notes',Notes)
formData.append('PaymentGateway',PaymentGateway)
formData.append('PaymentStatus',PaymentStatus)
formData.append('RefundAmount',RefundAmount)
formData.append('TransactionID',TransactionID)
formData.append('UserID',UserID)
const payment_gateway_transactionsData= {
Amount ,Currency ,GatewayResponse ,GatewayTransactionID ,Notes ,PaymentGateway ,PaymentStatus ,RefundAmount ,TransactionID ,UserID};

const res =fetch('/payment_gateway_transactions',{method:'POST',body:formData}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
const response =fetch('/payment_gateway_transactions',{method:'POST',headers :{'Content-Type':'application/json'},body:JSON.stringify(payment_gateway_transactionsData)}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
if(response.ok)
 getpayment_gateway_transactions();
});


//getpayment_gateway_transactionsLike


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


const PaymentGatewayChoice = document.querySelector('input[name="PaymentGatewayChoice"]:checked');
  
if(PaymentGateway)
choice.push(["PaymentGateway",PaymentGatewayChoice.value]);




const PaymentStatusChoice = document.querySelector('input[name="PaymentStatusChoice"]:checked');
  
if(PaymentStatus)
choice.push(["PaymentStatus",PaymentStatusChoice.value]);


let obj=Object.fromEntries(choice);
console.log(obj);
let JSONstring=JSON.stringify(obj);
console.log(JSONstring);
 const response = await axios(`/payment_gateway_transactionsSearch`, {params: obj});
const data =await response.data;//axios automatically parses also .json() does not work here

 try{ if(response.status==200) //response.ok does not work here
 {;
data.forEach( item => {
const t= document.createElement('li');
 t.innerHTML=`${item.Currency}`;
 searchList.appendChild(t);
 
});
}else 
 console.error("An error occurred while searching"); } catch(err){
console.error("Error occured while searching",err);
}
});


//getpayment_gateway_transactions()


async function getpayment_gateway_transactions(){
const payment_gateway_transactionsList= document.getElementById('payment_gateway_transactionsList');
payment_gateway_transactionsList.innerHTML='';
let data;
const response = await fetch('payment_gateway_transactions' , {method:'GET'});
if(response.ok)
{
data = await response.json();
data.forEach(item =>{
const t0 = document.createElement('p');
t0.innerHTML=`${item.Amount}`;
payment_gateway_transactionsList.appendChild(t0);
const t1 = document.createElement('p');
t1.innerHTML=`${item.Currency}`;
payment_gateway_transactionsList.appendChild(t1);
const t2 = document.createElement('p');
t2.innerHTML=`${item.GatewayResponse}`;
payment_gateway_transactionsList.appendChild(t2);
const t3 = document.createElement('p');
t3.innerHTML=`${item.GatewayTransactionID}`;
payment_gateway_transactionsList.appendChild(t3);
const t4 = document.createElement('p');
t4.innerHTML=`${item.Notes}`;
payment_gateway_transactionsList.appendChild(t4);
const t5 = document.createElement('p');
t5.innerHTML=`${item.PaymentDate}`;
payment_gateway_transactionsList.appendChild(t5);
const t6 = document.createElement('p');
t6.innerHTML=`${item.PaymentGateway}`;
payment_gateway_transactionsList.appendChild(t6);
const t7 = document.createElement('p');
t7.innerHTML=`${item.PaymentStatus}`;
payment_gateway_transactionsList.appendChild(t7);
const t8 = document.createElement('p');
t8.innerHTML=`${item.RefundAmount}`;
payment_gateway_transactionsList.appendChild(t8);
const t9 = document.createElement('p');
t9.innerHTML=`${item.RefundDate}`;
payment_gateway_transactionsList.appendChild(t9);
const t10 = document.createElement('p');
t10.innerHTML=`${item.TransactionID}`;
payment_gateway_transactionsList.appendChild(t10);
const t11 = document.createElement('p');
t11.innerHTML=`${item.UserID}`;
payment_gateway_transactionsList.appendChild(t11);
const del = document.createElement('button');
del.innerHTML=`DELETE`
del.onclick= () =>{
console.log("deletepayment_gateway_transactions called");
deletepayment_gateway_transactions(item.Amount);
}
payment_gateway_transactionsList.appendChild(del)
});
}
else
console.error("An error occured",response)
}


// deletepayment_gateway_transactions()


async function deletepayment_gateway_transactions(id){
const response = await fetch(`/payment_gateway_transactions/${id}`, {method:'DELETE'});
let res;
if(response.ok)
 {res=response.json();
 console.log("payment_gateway_transactions deleted successfully ",res);
 getpayment_gateway_transactions()}
else
 console.error("Failed to delete payment_gateway_transactions");
}

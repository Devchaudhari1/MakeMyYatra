

// views/currency_conversion_rates.js



const currency_conversion_rates=document.getElementById('currency_conversion_rates') ;


getcurrency_conversion_rates()// Do not delete this it must be called at the start


 //addcurrency_conversion_rates


currency_conversion_rates.addEventListener('submit' , (e)=>
 
{e.preventDefault();

const ConversionID= document.getElementById('ConversionID').value.trim()

const ConversionRate= document.getElementById('ConversionRate').value.trim()

const FromCurrency= document.getElementById('FromCurrency').value.trim()

const ToCurrency= document.getElementById('ToCurrency').value.trim()

const formData=new FormData()
formData.append('ConversionID',ConversionID)
formData.append('ConversionRate',ConversionRate)
formData.append('FromCurrency',FromCurrency)
formData.append('ToCurrency',ToCurrency)
const currency_conversion_ratesData= {
ConversionID ,ConversionRate ,FromCurrency ,ToCurrency};

const res =fetch('/currency_conversion_rates',{method:'POST',body:formData}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
const response =fetch('/currency_conversion_rates',{method:'POST',headers :{'Content-Type':'application/json'},body:JSON.stringify(currency_conversion_ratesData)}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
if(response.ok)
 getcurrency_conversion_rates();
});


//getcurrency_conversion_ratesLike


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
let obj=Object.fromEntries(choice);
console.log(obj);
let JSONstring=JSON.stringify(obj);
console.log(JSONstring);
 const response = await axios(`/currency_conversion_ratesSearch`, {params: obj});
const data =await response.data;//axios automatically parses also .json() does not work here

 try{ if(response.status==200) //response.ok does not work here
 {;
data.forEach( item => {
const t= document.createElement('li');
 t.innerHTML=`${item.ConversionRate}`;
 searchList.appendChild(t);
 
});
}else 
 console.error("An error occurred while searching"); } catch(err){
console.error("Error occured while searching",err);
}
});


//getcurrency_conversion_rates()


async function getcurrency_conversion_rates(){
const currency_conversion_ratesList= document.getElementById('currency_conversion_ratesList');
currency_conversion_ratesList.innerHTML='';
let data;
const response = await fetch('currency_conversion_rates' , {method:'GET'});
if(response.ok)
{
data = await response.json();
data.forEach(item =>{
const t0 = document.createElement('p');
t0.innerHTML=`${item.ConversionID}`;
currency_conversion_ratesList.appendChild(t0);
const t1 = document.createElement('p');
t1.innerHTML=`${item.ConversionRate}`;
currency_conversion_ratesList.appendChild(t1);
const t2 = document.createElement('p');
t2.innerHTML=`${item.FromCurrency}`;
currency_conversion_ratesList.appendChild(t2);
const t3 = document.createElement('p');
t3.innerHTML=`${item.LastUpdated}`;
currency_conversion_ratesList.appendChild(t3);
const t4 = document.createElement('p');
t4.innerHTML=`${item.ToCurrency}`;
currency_conversion_ratesList.appendChild(t4);
const del = document.createElement('button');
del.innerHTML=`DELETE`
del.onclick= () =>{
console.log("deletecurrency_conversion_rates called");
deletecurrency_conversion_rates(item.ConversionID);
}
currency_conversion_ratesList.appendChild(del)
});
}
else
console.error("An error occured",response)
}


// deletecurrency_conversion_rates()


async function deletecurrency_conversion_rates(id){
const response = await fetch(`/currency_conversion_rates/${id}`, {method:'DELETE'});
let res;
if(response.ok)
 {res=response.json();
 console.log("currency_conversion_rates deleted successfully ",res);
 getcurrency_conversion_rates()}
else
 console.error("Failed to delete currency_conversion_rates");
}

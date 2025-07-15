

// views/currencies.js



const currencies=document.getElementById('currencies') ;


getcurrencies()// Do not delete this it must be called at the start


 //addcurrencies


currencies.addEventListener('submit' , (e)=>
 
{e.preventDefault();

const CurrencyCode= document.getElementById('CurrencyCode').value.trim()

const CurrencyName= document.getElementById('CurrencyName').value.trim()

const IsDefault= document.getElementById('IsDefault').value.trim()

const Symbol= document.getElementById('Symbol').value.trim()

const formData=new FormData()
formData.append('CurrencyCode',CurrencyCode)
formData.append('CurrencyName',CurrencyName)
formData.append('IsDefault',IsDefault)
formData.append('Symbol',Symbol)
const currenciesData= {
CurrencyCode ,CurrencyName ,IsDefault ,Symbol};

const res =fetch('/currencies',{method:'POST',body:formData}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
const response =fetch('/currencies',{method:'POST',headers :{'Content-Type':'application/json'},body:JSON.stringify(currenciesData)}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
if(response.ok)
 getcurrencies();
});


//getcurrenciesLike


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


const IsDefaultChoice = document.querySelector('input[name="IsDefaultChoice"]:checked');
  
if(IsDefault)
choice.push(["IsDefault",IsDefaultChoice.value]);


let obj=Object.fromEntries(choice);
console.log(obj);
let JSONstring=JSON.stringify(obj);
console.log(JSONstring);
 const response = await axios(`/currenciesSearch`, {params: obj});
const data =await response.data;//axios automatically parses also .json() does not work here

 try{ if(response.status==200) //response.ok does not work here
 {;
data.forEach( item => {
const t= document.createElement('li');
 t.innerHTML=`${item.CurrencyName}`;
 searchList.appendChild(t);
 
});
}else 
 console.error("An error occurred while searching"); } catch(err){
console.error("Error occured while searching",err);
}
});


//getcurrencies()


async function getcurrencies(){
const currenciesList= document.getElementById('currenciesList');
currenciesList.innerHTML='';
let data;
const response = await fetch('currencies' , {method:'GET'});
if(response.ok)
{
data = await response.json();
data.forEach(item =>{
const t0 = document.createElement('p');
t0.innerHTML=`${item.CurrencyCode}`;
currenciesList.appendChild(t0);
const t1 = document.createElement('p');
t1.innerHTML=`${item.CurrencyName}`;
currenciesList.appendChild(t1);
const t2 = document.createElement('p');
t2.innerHTML=`${item.IsDefault}`;
currenciesList.appendChild(t2);
const t3 = document.createElement('p');
t3.innerHTML=`${item.Symbol}`;
currenciesList.appendChild(t3);
const del = document.createElement('button');
del.innerHTML=`DELETE`
del.onclick= () =>{
console.log("deletecurrencies called");
deletecurrencies(item.CurrencyCode);
}
currenciesList.appendChild(del)
});
}
else
console.error("An error occured",response)
}


// deletecurrencies()


async function deletecurrencies(id){
const response = await fetch(`/currencies/${id}`, {method:'DELETE'});
let res;
if(response.ok)
 {res=response.json();
 console.log("currencies deleted successfully ",res);
 getcurrencies()}
else
 console.error("Failed to delete currencies");
}

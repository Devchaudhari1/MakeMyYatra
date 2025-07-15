

// views/languages.js



const languages=document.getElementById('languages') ;


getlanguages()// Do not delete this it must be called at the start


 //addlanguages


languages.addEventListener('submit' , (e)=>
 
{e.preventDefault();

const IsDefault= document.getElementById('IsDefault').value.trim()

const LanguageCode= document.getElementById('LanguageCode').value.trim()

const LanguageID= document.getElementById('LanguageID').value.trim()

const LanguageName= document.getElementById('LanguageName').value.trim()

const formData=new FormData()
formData.append('IsDefault',IsDefault)
formData.append('LanguageCode',LanguageCode)
formData.append('LanguageID',LanguageID)
formData.append('LanguageName',LanguageName)
const languagesData= {
IsDefault ,LanguageCode ,LanguageID ,LanguageName ,};

const res =fetch('/languages',{method:'POST',body:formData}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
const response =fetch('/languages',{method:'POST',headers :{'Content-Type':'application/json'},body:JSON.stringify(languagesData)}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
if(response.ok)
 getlanguages();
});


//getlanguagesLike


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
 const response = await axios(`/languagesSearch`, {params: obj});
const data =await response.data;//axios automatically parses also .json() does not work here

 try{ if(response.status==200) //response.ok does not work here
 {;
data.forEach( item => {
const t= document.createElement('li');
 t.innerHTML=`${item.IsDefault}`;
 searchList.appendChild(t);
 
});
}else 
 console.error("An error occurred while searching"); } catch(err){
console.error("Error occured while searching",err);
}
});


//getlanguages()


async function getlanguages(){
const languagesList= document.getElementById('languagesList');
languagesList.innerHTML='';
let data;
const response = await fetch('languages' , {method:'GET'});
if(response.ok)
{
data = await response.json();
data.forEach(item =>{
const t0 = document.createElement('p');
t0.innerHTML=`${item.CreatedAt}`;
languagesList.appendChild(t0);
const t1 = document.createElement('p');
t1.innerHTML=`${item.IsDefault}`;
languagesList.appendChild(t1);
const t2 = document.createElement('p');
t2.innerHTML=`${item.LanguageCode}`;
languagesList.appendChild(t2);
const t3 = document.createElement('p');
t3.innerHTML=`${item.LanguageID}`;
languagesList.appendChild(t3);
const t4 = document.createElement('p');
t4.innerHTML=`${item.LanguageName}`;
languagesList.appendChild(t4);
const t5 = document.createElement('p');
t5.innerHTML=`${item.UpdatedAt}`;
languagesList.appendChild(t5);
const del = document.createElement('button');
del.innerHTML=`DELETE`
del.onclick= () =>{
console.log("deletelanguages called");
deletelanguages(item.CreatedAt);
}
languagesList.appendChild(del)
});
}
else
console.error("An error occured",response)
}


// deletelanguages()


async function deletelanguages(id){
const response = await fetch(`/languages/${id}`, {method:'DELETE'});
let res;
if(response.ok)
 {res=response.json();
 console.log("languages deleted successfully ",res);
 getlanguages()}
else
 console.error("Failed to delete languages");
}

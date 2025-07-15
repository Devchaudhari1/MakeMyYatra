

// views/faqs.js



const faqs=document.getElementById('faqs') ;


getfaqs()// Do not delete this it must be called at the start


 //addfaqs


faqs.addEventListener('submit' , (e)=>
 
{e.preventDefault();

const Answer= document.getElementById('Answer').value.trim()

const EntityID= document.getElementById('EntityID').value.trim()

const EntityType= document.getElementById('EntityType').value.trim()

const FAQID= document.getElementById('FAQID').value.trim()

const Question= document.getElementById('Question').value.trim()

const formData=new FormData()
formData.append('Answer',Answer)
formData.append('EntityID',EntityID)
formData.append('EntityType',EntityType)
formData.append('FAQID',FAQID)
formData.append('Question',Question)
const faqsData= {
Answer ,EntityID ,EntityType ,FAQID ,Question ,};

const res =fetch('/faqs',{method:'POST',body:formData}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
const response =fetch('/faqs',{method:'POST',headers :{'Content-Type':'application/json'},body:JSON.stringify(faqsData)}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
if(response.ok)
 getfaqs();
});


//getfaqsLike


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


let obj=Object.fromEntries(choice);
console.log(obj);
let JSONstring=JSON.stringify(obj);
console.log(JSONstring);
 const response = await axios(`/faqsSearch`, {params: obj});
const data =await response.data;//axios automatically parses also .json() does not work here

 try{ if(response.status==200) //response.ok does not work here
 {;
data.forEach( item => {
const t= document.createElement('li');
 t.innerHTML=`${item.CreatedAt}`;
 searchList.appendChild(t);
 
});
}else 
 console.error("An error occurred while searching"); } catch(err){
console.error("Error occured while searching",err);
}
});


//getfaqs()


async function getfaqs(){
const faqsList= document.getElementById('faqsList');
faqsList.innerHTML='';
let data;
const response = await fetch('faqs' , {method:'GET'});
if(response.ok)
{
data = await response.json();
data.forEach(item =>{
const t0 = document.createElement('p');
t0.innerHTML=`${item.Answer}`;
faqsList.appendChild(t0);
const t1 = document.createElement('p');
t1.innerHTML=`${item.CreatedAt}`;
faqsList.appendChild(t1);
const t2 = document.createElement('p');
t2.innerHTML=`${item.EntityID}`;
faqsList.appendChild(t2);
const t3 = document.createElement('p');
t3.innerHTML=`${item.EntityType}`;
faqsList.appendChild(t3);
const t4 = document.createElement('p');
t4.innerHTML=`${item.FAQID}`;
faqsList.appendChild(t4);
const t5 = document.createElement('p');
t5.innerHTML=`${item.Question}`;
faqsList.appendChild(t5);
const t6 = document.createElement('p');
t6.innerHTML=`${item.UpdatedAt}`;
faqsList.appendChild(t6);
const del = document.createElement('button');
del.innerHTML=`DELETE`
del.onclick= () =>{
console.log("deletefaqs called");
deletefaqs(item.Answer);
}
faqsList.appendChild(del)
});
}
else
console.error("An error occured",response)
}


// deletefaqs()


async function deletefaqs(id){
const response = await fetch(`/faqs/${id}`, {method:'DELETE'});
let res;
if(response.ok)
 {res=response.json();
 console.log("faqs deleted successfully ",res);
 getfaqs()}
else
 console.error("Failed to delete faqs");
}

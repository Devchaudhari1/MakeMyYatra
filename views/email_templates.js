

// views/email_templates.js



const email_templates=document.getElementById('email_templates') ;


getemail_templates()// Do not delete this it must be called at the start


 //addemail_templates


email_templates.addEventListener('submit' , (e)=>
 
{e.preventDefault();

const Body= document.getElementById('Body').value.trim()

const Subject= document.getElementById('Subject').value.trim()

const TemplateID= document.getElementById('TemplateID').value.trim()

const TemplateName= document.getElementById('TemplateName').value.trim()

const formData=new FormData()
formData.append('Body',Body)
formData.append('Subject',Subject)
formData.append('TemplateID',TemplateID)
formData.append('TemplateName',TemplateName)
const email_templatesData= {
Body ,Subject ,TemplateID ,TemplateName ,};

const res =fetch('/email_templates',{method:'POST',body:formData}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
const response =fetch('/email_templates',{method:'POST',headers :{'Content-Type':'application/json'},body:JSON.stringify(email_templatesData)}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
if(response.ok)
 getemail_templates();
});


//getemail_templatesLike


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
 const response = await axios(`/email_templatesSearch`, {params: obj});
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


//getemail_templates()


async function getemail_templates(){
const email_templatesList= document.getElementById('email_templatesList');
email_templatesList.innerHTML='';
let data;
const response = await fetch('email_templates' , {method:'GET'});
if(response.ok)
{
data = await response.json();
data.forEach(item =>{
const t0 = document.createElement('p');
t0.innerHTML=`${item.Body}`;
email_templatesList.appendChild(t0);
const t1 = document.createElement('p');
t1.innerHTML=`${item.CreatedAt}`;
email_templatesList.appendChild(t1);
const t2 = document.createElement('p');
t2.innerHTML=`${item.Subject}`;
email_templatesList.appendChild(t2);
const t3 = document.createElement('p');
t3.innerHTML=`${item.TemplateID}`;
email_templatesList.appendChild(t3);
const t4 = document.createElement('p');
t4.innerHTML=`${item.TemplateName}`;
email_templatesList.appendChild(t4);
const t5 = document.createElement('p');
t5.innerHTML=`${item.UpdatedAt}`;
email_templatesList.appendChild(t5);
const del = document.createElement('button');
del.innerHTML=`DELETE`
del.onclick= () =>{
console.log("deleteemail_templates called");
deleteemail_templates(item.Body);
}
email_templatesList.appendChild(del)
});
}
else
console.error("An error occured",response)
}


// deleteemail_templates()


async function deleteemail_templates(id){
const response = await fetch(`/email_templates/${id}`, {method:'DELETE'});
let res;
if(response.ok)
 {res=response.json();
 console.log("email_templates deleted successfully ",res);
 getemail_templates()}
else
 console.error("Failed to delete email_templates");
}

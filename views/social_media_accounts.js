

// views/social_media_accounts.js



const social_media_accounts=document.getElementById('social_media_accounts') ;


getsocial_media_accounts()// Do not delete this it must be called at the start


 //addsocial_media_accounts


social_media_accounts.addEventListener('submit' , (e)=>
 
{e.preventDefault();

const AccessToken= document.getElementById('AccessToken').value.trim()

const Platform= document.getElementById('Platform').value.trim()

const SocialMediaID= document.getElementById('SocialMediaID').value.trim()

const SocialMediaUserID= document.getElementById('SocialMediaUserID').value.trim()

const UserID= document.getElementById('UserID').value.trim()

const formData=new FormData()
formData.append('AccessToken',AccessToken)
formData.append('Platform',Platform)
formData.append('SocialMediaID',SocialMediaID)
formData.append('SocialMediaUserID',SocialMediaUserID)
formData.append('UserID',UserID)
const social_media_accountsData= {
AccessToken ,Platform ,SocialMediaID ,SocialMediaUserID ,UserID};

const res =fetch('/social_media_accounts',{method:'POST',body:formData}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
const response =fetch('/social_media_accounts',{method:'POST',headers :{'Content-Type':'application/json'},body:JSON.stringify(social_media_accountsData)}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
if(response.ok)
 getsocial_media_accounts();
});


//getsocial_media_accountsLike


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


const PlatformChoice = document.querySelector('input[name="PlatformChoice"]:checked');
  
if(Platform)
choice.push(["Platform",PlatformChoice.value]);


let obj=Object.fromEntries(choice);
console.log(obj);
let JSONstring=JSON.stringify(obj);
console.log(JSONstring);
 const response = await axios(`/social_media_accountsSearch`, {params: obj});
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


//getsocial_media_accounts()


async function getsocial_media_accounts(){
const social_media_accountsList= document.getElementById('social_media_accountsList');
social_media_accountsList.innerHTML='';
let data;
const response = await fetch('social_media_accounts' , {method:'GET'});
if(response.ok)
{
data = await response.json();
data.forEach(item =>{
const t0 = document.createElement('p');
t0.innerHTML=`${item.AccessToken}`;
social_media_accountsList.appendChild(t0);
const t1 = document.createElement('p');
t1.innerHTML=`${item.CreatedAt}`;
social_media_accountsList.appendChild(t1);
const t2 = document.createElement('p');
t2.innerHTML=`${item.Platform}`;
social_media_accountsList.appendChild(t2);
const t3 = document.createElement('p');
t3.innerHTML=`${item.SocialMediaID}`;
social_media_accountsList.appendChild(t3);
const t4 = document.createElement('p');
t4.innerHTML=`${item.SocialMediaUserID}`;
social_media_accountsList.appendChild(t4);
const t5 = document.createElement('p');
t5.innerHTML=`${item.UpdatedAt}`;
social_media_accountsList.appendChild(t5);
const t6 = document.createElement('p');
t6.innerHTML=`${item.UserID}`;
social_media_accountsList.appendChild(t6);
const del = document.createElement('button');
del.innerHTML=`DELETE`
del.onclick= () =>{
console.log("deletesocial_media_accounts called");
deletesocial_media_accounts(item.AccessToken);
}
social_media_accountsList.appendChild(del)
});
}
else
console.error("An error occured",response)
}


// deletesocial_media_accounts()


async function deletesocial_media_accounts(id){
const response = await fetch(`/social_media_accounts/${id}`, {method:'DELETE'});
let res;
if(response.ok)
 {res=response.json();
 console.log("social_media_accounts deleted successfully ",res);
 getsocial_media_accounts()}
else
 console.error("Failed to delete social_media_accounts");
}

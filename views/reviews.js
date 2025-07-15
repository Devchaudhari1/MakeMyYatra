

// views/reviews.js



const reviews=document.getElementById('reviews') ;


getreviews()// Do not delete this it must be called at the start


 //addreviews


reviews.addEventListener('submit' , (e)=>
 
{e.preventDefault();

const Comment= document.getElementById('Comment').value.trim()

const EntityID= document.getElementById('EntityID').value.trim()

const EntityType= document.getElementById('EntityType').value.trim()

const Rating= document.getElementById('Rating').value.trim()

const ReviewID= document.getElementById('ReviewID').value.trim()

const UserID= document.getElementById('UserID').value.trim()

const formData=new FormData()
formData.append('Comment',Comment)
formData.append('EntityID',EntityID)
formData.append('EntityType',EntityType)
formData.append('Rating',Rating)
formData.append('ReviewID',ReviewID)
formData.append('UserID',UserID)
const reviewsData= {
Comment ,EntityID ,EntityType ,Rating ,ReviewID ,UserID};

const res =fetch('/reviews',{method:'POST',body:formData}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
const response =fetch('/reviews',{method:'POST',headers :{'Content-Type':'application/json'},body:JSON.stringify(reviewsData)}).then(data=>data.json()).catch(err => console.log("An error occured" , err));
if(response.ok)
 getreviews();
});


//getreviewsLike


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
 const response = await axios(`/reviewsSearch`, {params: obj});
const data =await response.data;//axios automatically parses also .json() does not work here

 try{ if(response.status==200) //response.ok does not work here
 {;
data.forEach( item => {
const t= document.createElement('li');
 t.innerHTML=`${item.EntityID}`;
 searchList.appendChild(t);
 
});
}else 
 console.error("An error occurred while searching"); } catch(err){
console.error("Error occured while searching",err);
}
});


//getreviews()


async function getreviews(){
const reviewsList= document.getElementById('reviewsList');
reviewsList.innerHTML='';
let data;
const response = await fetch('reviews' , {method:'GET'});
if(response.ok)
{
data = await response.json();
data.forEach(item =>{
const t0 = document.createElement('p');
t0.innerHTML=`${item.Comment}`;
reviewsList.appendChild(t0);
const t1 = document.createElement('p');
t1.innerHTML=`${item.EntityID}`;
reviewsList.appendChild(t1);
const t2 = document.createElement('p');
t2.innerHTML=`${item.EntityType}`;
reviewsList.appendChild(t2);
const t3 = document.createElement('p');
t3.innerHTML=`${item.Rating}`;
reviewsList.appendChild(t3);
const t4 = document.createElement('p');
t4.innerHTML=`${item.ReviewDate}`;
reviewsList.appendChild(t4);
const t5 = document.createElement('p');
t5.innerHTML=`${item.ReviewID}`;
reviewsList.appendChild(t5);
const t6 = document.createElement('p');
t6.innerHTML=`${item.UserID}`;
reviewsList.appendChild(t6);
const del = document.createElement('button');
del.innerHTML=`DELETE`
del.onclick= () =>{
console.log("deletereviews called");
deletereviews(item.Comment);
}
reviewsList.appendChild(del)
});
}
else
console.error("An error occured",response)
}


// deletereviews()


async function deletereviews(id){
const response = await fetch(`/reviews/${id}`, {method:'DELETE'});
let res;
if(response.ok)
 {res=response.json();
 console.log("reviews deleted successfully ",res);
 getreviews()}
else
 console.error("Failed to delete reviews");
}

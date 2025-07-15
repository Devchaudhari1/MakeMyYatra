console.log("Homepage called");
const placeForm = document.getElementById('placeForm');
placeForm.addEventListener('submit',(e)=>
{
    e.preventDefault();
    const name =document.getElementById('name').value.trim();
    const city=document.getElementById('city').value.trim();
    const type=document.getElementById('type').value.trim();
    const formData= new FormData({
        name:name , 
        type:type,
        city:city ,
    });
    const res= fetch('/',{method:'POST',
        body:formData,
        headers:{},
    }).then(response =>response.json()).catch(err => {alert("An error occured"); console.error(err);});
});

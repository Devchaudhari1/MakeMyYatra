const fs =require('fs');

const path =require('path');

const {conn}= require('../db.js');

const multer =require('multer');
const upload =async (req,res) =>
{
    if(req.body.ProfileImage)
    {
        console.log(`image found`);
        const filepath = path.join(__dirname ,'uploads',`${req.body.name}.jpg`);
        const f = fs.createWriteStream(filepath);
        f.write(req.body.buffer);
        f.end();
        conn.query(`update Users set ProfileImage = ? where UserId = ?  `,[filepath , req.params.id], (err,result)=>
            {
                if(err)
                {
                    console.error(`An error occured : ${err}`);
                    res.status(500).send({error:err});
                }
                
                res.status(200).send({message:'Image uploaded successfully'});
    });
    }
};

const storage = multer.memoryStorage();


const uploadImage= multer({storage:storage});

module.exports= {upload ,uploadImage};
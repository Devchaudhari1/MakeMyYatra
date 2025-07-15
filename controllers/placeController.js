//controllers\placeController.js
const {conn}= require('../server.js');
const getPlaces = (req,res)=> {
    try{
        console.log("getPlaces called");
    conn.query("Select * from places" ,(err , results) =>
    {
    if(err)
    console.error("Failed to get Places",err);
    else
        res.status(200).json(results)
    });
} catch(err)
{
    console.error("Cannot send the places",err);
    res.send({error:err});
}
};
const addPlaces= (req ,res) => {
    console.log("addPlaces called");
    try{
        conn.query("Insert into places (name , type , city) values ( ? , ?, ?)", [req.body.name  ,req.body.type , req.body.city ], (err , result) =>
        {

            if(err)
                console.error("Failed to add Place");
            else
            res.status(201).json(result);
        });
    } catch(err)
    {
        res.status(400).send({error:err});
    }
};
module.exports = {addPlaces , getPlaces};
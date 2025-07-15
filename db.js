const mysql=require('mysql2');
const conn = mysql.createConnection(
    {
        'host':'localhost',
        'user':'root',
        'password':'1234',
        'database':'miniproject'
    }
);
conn.connect( function(err){
    if(err) {
        console.error("Cannot establish connection");
        console.error(err);
    }
    else
    {
        console.log("Connection to database established");
        
    }
});
module.exports = {conn}
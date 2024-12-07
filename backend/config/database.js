const mongoose = require("mongoose");

require("dotenv").config();

const dbConnection = () =>{

    try{
        mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected ");
    }
    catch(err){
        console.log( "There is issue in Connecting to the db",  err );
    }

}

module.exports = dbConnection;

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/meanDB' , (err) => {
    if(!err){
        console.log('DB Connection Successful');
    }else{
        console.log('Error in DataBase Connection:'+err);
    }
});

module.exports = mongoose;
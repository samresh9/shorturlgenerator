const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
async function connectToMOngoDb(url){
   return mongoose.connect(url);
}

module.exports = {
    connectToMOngoDb
}
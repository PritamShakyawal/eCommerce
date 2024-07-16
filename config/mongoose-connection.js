const mongoose = require('mongoose');
const config = require("config");
const dbgr = require("debug")("development:mongoose");  // Kis name space se hm ishe bnana chahte hai

mongoose.
connect(`${config.get("MONGODB_URI")}/scatch`)  // config will take care of environment variable
.then(function(){
    // console.log("connected");
    dbgr("connected");
})
.catch(function(err){
    // console.log(err);
    dbgr(err);
})

module.exports = mongoose.connection; // By this (mongoose.connection) we will get the whole control of the database scatch.
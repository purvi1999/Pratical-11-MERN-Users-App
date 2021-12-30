const mongooose = require("mongoose");

// User Schema
const userSchema1 = mongooose.Schema({
    name:String,
    address:String,
    phone_no:Number,
    email:String,
    password:String,
    con_pwd:String,
});

const userModel = mongooose.model("demo1", userSchema1, "demo1");

module.exports = userModel;
const mongoose  = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/startup");

connect.then(()=>{
    console.log("database connected successfully");

})
.catch(()=>{
    console.log("database does not connect successfully");
});

const loginSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required:true
    }
});

const collection= new mongoose.model("users", loginSchema);

module.exports = collection;
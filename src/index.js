const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const collection = require("./config");
const app = express();

app.set("view engine", 'ejs');

app.use(express.static("public/assets"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/",(req,res)=>{
    res.render("home",{loggedin:false});
})
app.get("/login",(req,res)=>{
    res.render("login");
})

app.get("/signup",(req,res)=>{
    res.render("login");
})
app.post("/signup",async (req,res)=>{
try{
const data = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
}
const existinguser = await collection.findOne({username: data.name});
if(existinguser){
    res.send("User already exists. Please choose a different username.")
}else{

const saltRounds =10;
const hashed = await bcrypt.hash(data.password,saltRounds);
data.password = hashed;

const userdata = await collection.insertMany(data);
console.log(userdata);
res.render("/home");
}}
catch{
    res.send("some error occured");
    res.render("/login");
}

});

app.post("/login",async (req,res)=>{
    try{
        const check = await collection.findOne({email:req.body.uname});
        if(!check){
            res.send("user name cannot be found");
        }
        const isPasswordMatched = await bcrypt.compare(req.body.pass, check.password);
        if(isPasswordMatched){
            res.render("home",{loggedin:true});
        }else{
            res.send("wrong password");
        }
    }catch{
        res.send("wrong details");
    }
});

const port = 5000;
app.listen(port,()=>{
    console.log(`Server running on: http://127.0.0.1:${port}`);

})
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    Name: {
        type: String,
    },
    username:{
        type:String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    hashPassword: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String, 
    },
    birthDate: {
        type: String
    },
    streetAddress: {
        type: String, 
    },
    Landmark: {
        type: String
    },
    Country: {
        type: String,
    },
    City: {
        type: String,
    },
    secondaryPhoneNumber: {
        type: String 
    },
    postalCode: {
        type: String, 
        
    }
});

userSchema.statics.createAndRegister = async function (password ,username,email, ...otherDetails){
    let hash = await bcrypt.hash(password , 12);
    let newUser = await User.create({hashPassword : hash,username:username,email:email, ...otherDetails});
    return newUser._id;
}

userSchema.statics.evaluateAndAuthenticate = async function (email , Password){
    const foundUser= await User.findOne({email});

    if(!foundUser){
        return null;
    }
    let result = await bcrypt.compare(Password , foundUser.hashPassword);    
    let userId = null;
    if(result == true){
        userId = foundUser._id;
    }
    return userId;
}

const User = mongoose.model('User', userSchema);

module.exports = User;

const mongoose = require('mongoose');
const bcrypt =require('bcrypt');
// Define the User schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName:{
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});
//hashing password before saving

userSchema.pre('save',async function (next) {
    const user = this;
    if(!user.isModified('password')) return next();
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(user.password,salt);
        user.password = hashedPassword;
        next();
       
    }catch(error){
        console.log(error)
    }
})
// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;

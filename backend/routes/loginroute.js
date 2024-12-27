const express = require("express")
const User = require("../models/usermodels")
const router =  express.Router()


router.post('/login',async (req,res)=>{
    const{email,password} = req.body
    if(!email || !password){
        return res.status(400).json({message:"Invalid input or all fields are required"})
    }
    const user = await User.findOne({email:email})
    if(!user){
        return res.status(401).json({error:"User not found...kindly register first"});
    }
    if(!await user.comparePasssword(password)){
        return res.status(401).json({error:"Invalid Password or Email"});
    }


    return res.status(200).json({message:"logged in"})
    
})


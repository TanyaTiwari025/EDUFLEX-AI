const express = require('express');

const router =  express.Router()

const { GoogleGenerativeAI } = require( '@google/generative-ai');
require('dotenv').config(); 
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); //added api key in .env file or generate new api
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
router.post('/', async(req,res)=>{
    try{

        const {prompt} = req.body;
        console.log(prompt);
        if(!prompt){
            return res.status(400).json({error:"prompt required!!! "});
        }

        const result = await model.generateContent(prompt);
        console.log(result.response.text());
        res.send({
            "result":result.response.text()
        })

    }catch(error){
        console.error('Error in AI route:', error);
        }
    
});


module.exports = router;

       

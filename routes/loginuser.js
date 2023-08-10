const express=require('express')
const router=express.Router()
const { body, validationResult } = require('express-validator');
const User = require('../models/userdataschema');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const jwtsecret="puBKVN3j4PV8OEsOsvXbMEKDCtG0ALIG"


const validationsignup=[
    body('email').trim().isEmail().withMessage('enter valid email')
]
router.post('/login',validationsignup,async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({ success: false, errors: errors.array() });
    }
    const email=req.body.email
    try {
        const loginuser= await User.findOne({email})
        if(!loginuser){
            return res.status(404).json({errors:'user not found'})
        }
        const pwdcompare=await bcrypt.compare(req.body.password,loginuser.password)
            if(!pwdcompare){
                return res.status(404).json({errors:'enter valid password'})
        }
        const data={
            user:{
                id:loginuser.id
            }
        }
        const authToken=await jwt.sign(data,jwtsecret)
        return res.json({success:true,authToken:authToken})
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({success:false})
    }
})
module.exports=router
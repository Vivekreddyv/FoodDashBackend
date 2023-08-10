const express=require('express')
const user = require('../models/userdataschema')
const router=express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs')

const validationsignup=[
    body('name').trim().notEmpty().withMessage('enter valid username'),
    body('email').trim().isEmail().withMessage('enter valid Email'),
    body('password').trim().isLength({min:6}).withMessage('password must contain 6 digits')
]
router.post('/signup',validationsignup,async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    const salt=await bcrypt.genSalt(10)
    let secpassword=await bcrypt.hash(req.body.password,salt)
    try {
        await user.create({
            name:req.body.name,
            email:req.body.email,
            password:secpassword
        })
        res.json({success:true})
    } catch (error) {
        console.error('error:',error.message)
        res.json({success:false})
    }
})
module.exports=router
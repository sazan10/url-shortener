const express = require("express");
const router = express.Router();
const USER= require("../models/url");
router.get("/",async (req,res)=>{
  
    const allUsers = await USER.find({});
    console.log('all users', allUsers);
    res.render("home",{users: allUsers});

    // res.render("login");
})

router.get("/signup",async (req,res)=>{
    res.render("signup");
})
router.get("/login", (req, res)=>{
    res.render("login");
})
module.exports=router;
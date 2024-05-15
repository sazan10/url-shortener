const express = require("express");
const router = express.Router();
const USER= require("../models/url");
router.get("/",async (req,res)=>{
    const allUsers = await USER.find({});
    console.log('all users', allUsers);
    res.render("home",{users: allUsers});
})

module.exports=router;
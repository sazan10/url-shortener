const express = require("express");
const router = express.Router();
const URL= require("../models/url");
const { restrictTo } = require("../middlewares/auth");
router.get("/",async (req,res)=>{
    if(!req.user) return res.redirect("/login");
    const allUrls = await URL.find({createdBy:req.user._id});
    console.log('all users', allUrls);
    return res.render("home",{urls: allUrls});

    // res.render("login");
})

router.get("/signup",async (req,res)=>{
    res.render("signup");
})
router.get("/login", (req, res)=>{
    res.render("login");
})

router.get("/admin/urls",restrictTo(["ADMIN"]), async(req,res)=>{
    const allUrls = await URL.find({});
    return res.render("home", {urls:allUrls});
})
module.exports=router;
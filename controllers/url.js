
const URL = require("../models/url");
const shortid = require("shortid");
async function handleGenerateNewShortUrl(req, res){
    const shortId = shortid(8);
    const body=req.body;
    if(!body ||  !body.url){
        return res.status(400).json({msg:"Shortid and redirectURl are required!"})
    }
    await URL.create({shortId:shortId, redirectUrl:body.url, visitHistory:[], createdBy:req.user._id});
    // res.json({id:shortId});
    res.render("home",{shortId})
}

module.exports = {handleGenerateNewShortUrl};

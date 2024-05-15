const express = require("express");
const path = require("path");
const { connectToMongoDB } = require("./connection.js");
const PORT = 3001;
const urlRoute = require("./routes/url.js");
const staticRoute = require("./routes/staticRouter.js");

const app = express();
const URL = require("./models/url.js");
connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
.then(()=>console.log("MongoDB connected"))
.catch((error)=>console.log("Mongo error", error));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use("/url",urlRoute);
app.get("/url/:shortId",async (req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },{$push:{
        visitHistory:{timestamp:Date.now()}
    }})
    // console.log(entry);
    // res.json({msg:entry})
    res.redirect(entry.redirectUrl);
});
app.get("/test",async (req,res)=>{
    const allUrls = await URL.find({});
    return res.render('home',{urls:allUrls});
})
app.use("/",staticRoute);
app.listen(PORT,()=>console.log("Server started"));
const express = require("express");
const { connectToMongoDB } = require("./connection.js");
const PORT = 3001;
const urlRoute = require("./routes/url.js");
const app = express();
const URL = require("./models/url.js");
connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
.then(()=>console.log("MongoDB connected"))
.catch((error)=>console.log("Monogo error", error));

app.use(express.json());
app.use("/url",urlRoute);
app.get("/url/:shortId",async (req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },{$push:{
        visitHistory:{timestamp:Date.now()}
    }})
    res.redirect(entry.redirectUrl)
})

app.listen(PORT,()=>console.log("Server started"));
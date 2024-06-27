const express = require("express");
const path = require("path");
const { connectToMongoDB } = require("./connection.js");
const PORT = 3001;
const urlRoute = require("./routes/url.js");
const userRoute = require("./routes/user.js");
const staticRoute = require("./routes/staticRouter.js");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const app = express();
const URL = require("./models/url.js");
const { restrictToLoggedInUsersOnly, checkAuth, restrictTo } = require("./middlewares/auth.js");
connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
.then(()=>console.log("MongoDB connected"))
.catch((error)=>console.log("Mongo error", error));

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        return cb(null,"uploads")
    },
    filename: function (req,file,cb){
        return cb(null,`${Date.now()}-${file.originalname}`)
    }
}
)
const upload = multer({storage})

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());
app.use(checkAuth);
app.use("/url", restrictTo(["NORMAL","ADMIN"]),urlRoute);
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

app.post("/upload",upload.single("profileImage"),  (req,res)=>{
    console.log(req.body);
    console.log("should upload file");
    console.log(req.file);
    return res.redirect("/");
})
app.use("/",checkAuth,staticRoute);
app.use("/user", userRoute);
app.listen(PORT,()=>console.log("Server started"));
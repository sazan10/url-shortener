const { getUser } = require("../service/auth");

async function restrictToLoggedInUsersOnly(req,res, next){
    const userId = await req.cookies?.uid;
    console.log('user id ', req)
    if(!userId) return res.redirect("/login");
    const user =await  getUser(userId);
    console.log("user id get user ", user)
    if(!user) return res.redirect("/login");
    req.user= user;
    next();
}

async function checkAuth(req,res, next){
    const userId = await req.cookies?.uid;
    const user =await  getUser(userId);
    req.user= user;
    next();
}

module.exports={
    restrictToLoggedInUsersOnly,
    checkAuth
}
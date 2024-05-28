const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next){
    // const authorizationHeaderValue = req.headers("autho")

}

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
    req.user=null;
    const userId = await req.cookies?.uid;
    if(!userId){
        return next()
    }
    const user =await  getUser(userId);
    req.user= user;
    next();
}


function restrictTo(roles){
    return function(req, res,next){
        // console.log('user role', req.user.role,roles, roles.includes('ADMIN'))
        if(!req.user || !req?.user?.role) return res.redirect("/login");
        if(!roles.includes(req.user.role)) return res.end("Unauthorized");
        return next()
    } 
}

module.exports={
    restrictToLoggedInUsersOnly,
    checkAuth,
    restrictTo
}
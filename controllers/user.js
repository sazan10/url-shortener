const USER = require("../models/user");
const {v4:uuidv4} = require("uuid");
const {getUser, setUser} = require("../service/auth");
async function handleUserSignup(req, res){
    const user = req.body;
    if(!user || !user.email || !user.name || !user.password){
        return res.render("signup")
    }
   await USER.create({
        name: user.name,
        email: user.email,
        password:user.password
    });
    return res.redirect("/login");
}

async function handleUserLogin(req, res){
    const user = req.body;
    const sessionId = uuidv4();
    if(!user || !user.email ||  !user.password){
      return  res.render("login")
    }
    const foundUser = await USER.findOne({
       email:user.email, password: user.password
    });
    if(!foundUser){
        return res.render("login");
    }
    console.log("found user",foundUser);
    setUser(sessionId, foundUser);
    res.cookie("uid",sessionId);

    console.log('should go to home')
    return res.redirect("/")
}


module.exports = { handleUserSignup, handleUserLogin};
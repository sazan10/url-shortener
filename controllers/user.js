const USER = require("../models/user");

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
    if(!user || !user.email ||  !user.password){
      return  res.render("login")
    }
    const foundUser = await USER.findOne({
       email:user.email, password: user.password
    });
    console.log("found user",foundUser);
    if(!foundUser){
        return res.render("login");
    }
    console.log('should go to home')
    return res.redirect("/")
}


module.exports = { handleUserSignup, handleUserLogin};
const express = require("express");
// const { handleGenerateNewShortUrl } = require("../controllers/url");
const { handleUserSignup, handleUserLogin } = require("../controllers/user");

const router = express.Router();

// router.post("/", handleGenerateNewShortUrl);
router.post("/signup", handleUserSignup);
router.post("/login", handleUserLogin);

module.exports= router;
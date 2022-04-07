const express = require('express');
const router = express.Router();
const UserModel = require("../models/User");
router.use(express.json());

router.get("/", (req, res) => {
    res.render("register");
});

router.post("/", async (req,res) => {
    try{
        const newUser = new UserModel({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            phone: req.body.phone
        })
        await newUser.save();
        req.session.user_id = newUser._id;
        res.redirect('/');
    }catch(err){
        console.log(err)
    }
});
module.exports = router; 
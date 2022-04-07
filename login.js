const express = require('express');
const router = express.Router();
router.use(express.json());
const UserModel = require("../models/User");
const bcrypt = require('bcrypt');

router.get("/", (req, res) => {
    res.render("login");
});

router.post("/", async (req,res) => {
    const { 
        username,
        password 
    } = req.body

    const foundUser = await UserModel.findAndValidate(username,password);
    if (foundUser){
        req.session.user_id = foundUser._id;
        res.redirect('/');
    }else{
        res.redirect('/login')
    }
})

module.exports = router; 
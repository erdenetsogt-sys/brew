const express = require("express");
const app = express();
const mongoose = require("mongoose");
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const PORT = 3001;
const Thread = require("./models/Thread");
const session = require('express-session');
const UserModel = require("./models/User");
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));
app.set('view engine','ejs');
mongoose.connect("mongodb+srv://test:test@cluster0.iqcd2.mongodb.net/threads?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("データベース接続完了"))
.catch((err) => console.log(err));
app.listen(PORT,console.log("サーバーがラーニング"));
app.use(session({ secret: 'notagoodsecret', resave: true, saveUninitialized: true}));

const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect('/login')
    }
    next();
}

app.get("/api/v1/threads", async (req,res) => {
    try {
        const allThreads = await Thread.find({});
        res.status(200).json(allThreads);
    }catch(err){
        console.log(err);
    }
})

app.post("/api/v1/thread", async (req,res) => {
    try {
        const createThread = await Thread.create(req.body);
        res.status(200).json(createThread);
    }catch(err){
        console.log(err);
    }
})
app.get("/",requireLogin, (req,res) => {
    res.render("index");
})

app.post("/", async (req, res) => {
    await res.json({requestBody: req.body}) 
});

app.use("/login", loginRouter);
app.use("/register",registerRouter);

app.post('/logout',(req,res) =>{
    req.session.user_id = null;
    res.redirect('/')
})
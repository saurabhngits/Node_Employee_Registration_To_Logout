require("dotenv").config();
const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const path = require("path");
const cookieParser = require("cookie-parser");
const auth = require("./middlewares/auth");

require("./db/conn");

const Register = require('./models/registers');
const port = process.env.PORT || 3000;

const static_path = path.join(__dirname,"../public");
const view_path = path.join(__dirname,"../views");

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", view_path);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false})); // This allows to access form data

app.get("/", (req, res) => {
    res.render("index");
})

app.get("/home", auth, (req, res) => {
    res.render("home");
})

app.get("/register", (req, res) => {
    res.render("registration");
})

app.post("/register", async (req, res) => {
    try{
        const pass = req.body.password;
        const cpass = req.body.confirmPassword;

        if(pass === cpass) {
            const regEmp = await new Register({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                gender: req.body.gender,
                phone: req.body.phone,
                age: req.body.age,
                password: req.body.password
            });

            await regEmp.genetrateAuthToken();
            await regEmp.save();

            res.render("index");
        }
        else{
            res.status(500).send("Password are not matching");
        }
    }
    catch(err){
        console.log(err)
        res.status(400).send(err);
    }
})

app.get("/login", (req, res) => {
    res.render("login");
})

app.post("/login", async (req, res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;

        const usermail = await Register.findOne({email: email});
        const isMatch = await bcrypt.compare(password, usermail.password);

        if(!isMatch){
            res.send("Invalid login details");
        }
        else{
            const token = await usermail.genetrateAuthToken();
            await usermail.save();

            //here we are using httpOnly, bcoz no client or it's client side scritp can change this cookie.
            res.cookie("jwt", token, {
                exprires: new Date(Date.now() + 60000),
                httpOnly: true,
                //secure: true,  so this will only works with secure server i.e. https
            });

            res.render("home");
        }
    }
    catch(err){
        console.log(err)
        res.status(400).send("Invalid login details");
    }
})

app.get("/logout", auth, async (req, res) => {
    req.user.tokens = req.user.tokens.filter((currentElement) => {
        return currentElement.token == req.token
    })

    res.clearCookie("jwt");

    await req.user.save();
    res.render("login");
})

app.get("/logoutAll", auth, async (req, res) => {
    req.user.tokens = [];
    res.clearCookie("jwt");

    await req.user.save();
    res.render("login");
})

app.listen(port, () => {
    console.log(`Server is listing at port ${port}`);
})


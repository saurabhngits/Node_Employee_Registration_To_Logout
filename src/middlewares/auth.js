const jwt = require("jsonwebtoken");
const Register = require("../models/registers");

const auth = async (req, res, next) => {
    try{
        const token = req.cookies.jwt;
        if(!token){
            res.status(500).send("Cookie is not set");
        }
        else{
            const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
            req.user = await Register.findOne({_id: verifyUser._id})
            req.token = token;
            next();
        }
    }
    catch(err){
        console.log(err)
        res.status(400).send(err);
    }
}

module.exports = auth;
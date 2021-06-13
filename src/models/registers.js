require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const employeeSchema = new mongoose.Schema({
    firstname: {
        type: String, 
        required: true
    },
    lastname: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]
})

employeeSchema.methods.genetrateAuthToken = async function(){
    const token = jwt.sign(
        {_id: this._id.toString()}, process.env.SECRET_KEY
    )

    this.tokens = this.tokens.concat({token:token})
    return token;
}

employeeSchema.pre("save", async function(next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
    
    next();
})


// We will create a new collection
const Register = new mongoose.model('Register', employeeSchema);

module.exports = Register;
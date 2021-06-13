require("dotenv").config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONN_STR, {
    useCreateIndex:true,
    useFindAndModify:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(() => {
    console.log("DB connected successfully");
})
.catch((err) => {
    console.log("DB connection failed");
    console.log("Error : "+err)
})


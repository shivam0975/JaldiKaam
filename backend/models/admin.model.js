const mongoose = require("mongoose");

const admin = mongoose.Schema('admin' , {
    name: {
        type: String,
        required: true
    },
    email : {
        type : String ,
        required : true
    },
    password: {
        type : String,
        required : true
    },
});
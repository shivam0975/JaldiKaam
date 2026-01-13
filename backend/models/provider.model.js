const mongoose = require('mongoose');

const Provider = mongoose.model(
    'Provider' , 
    new mongoose.Schema({
        name : {
            type :String,
            required:true
        },
        email : {
            type :String,
            required:true
        },
        phone : {
            type :Number,
            required:true
        },
        password : {
            type :String,
            required:true
        },
        location : {
            type :String,
            required:true
        },
        experience : {
            type :Number,
            required:true
        },
        price : {
            type :Number,
            required:true
        },
        availability : {
            type :String,
            required:true
        },
        service : {
            type :String,
            required:true
        },
        idProof : {
            data: Buffer,
            contentType: String
        },
        roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
        isVerified : {
            type :Boolean,
            default: false,
        },
    })
);

module.exports = Provider;


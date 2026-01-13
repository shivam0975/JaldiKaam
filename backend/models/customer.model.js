const mongoose = require('mongoose');

const Customer = mongoose.model(
    'Customer' ,
    new mongoose.Schema({
        name : String,
        email : String,
        phone : Number,
        password : String,
        roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
    })
);

module.exports = Customer;
const mongoose = require('mongoose');

const customersSchema = mongoose.Schema({
        firstName:{
            type:String,
            require:true,
            trim:true,
        },
        lastName:{
            type:String,
            require:true,
            trim:true,
        },
        userName:{
            type:String,
            require:true,
            unique:true,
            trim:true,
        },
        email:{
            type:String,
            require:true,
            trim:true,
            unique:true,
        },
        phone:{
            type:Number,
            require:true,
            trim:true,
            unique:true,
        },
        DOB:{
            type:String,
            require:true,
            trim:true,
        },
        gender:{
            type:String,
            enum:['male','female','other'],
        },
        password:{
            type:String,
            require:true,
            trim:true,
        },
        profileImage:{
            type:String,
            trim:true,
        },
},{timestamps:true});

module.exports = mongoose.model('customers',customersSchema);
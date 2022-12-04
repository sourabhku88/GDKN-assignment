const mongoose = require('mongoose');

const customersAddressSchema = mongoose.Schema({
    customer:{
        type:mongoose.SchemaTypes.ObjectId,
        require:true,
        ref:'customers'
    },
    landmark:{
        type:String,
        require:true,
        trim:true,
    },
    city:{
        type:String,
        require:true,
        trim:true,
    },
    state:{
        type:String,
        require:true,
        trim:true,
    },
    country:{
        type:String,
        require:true,
        trim:true,
    },
    pincode:{
        type:Number,
        require:true,
        trim:true,
    },
},{timestamps:true});

module.exports = mongoose.model('customersAddress',customersAddressSchema);
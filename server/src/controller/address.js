const { default: mongoose } = require('mongoose');
const customerAddressModel = require('../model/customersAddressModel');
const { checkBody } = require('../validation/validation');



const createAddress = async (req,res) => {
    try {
        const {pincode, landmark, city, state,  country, customer} = req.body;

        if(checkBody(req.body)) return res.status(400).send({message:'please provide data'});

        if(!pincode) return res.status(400).send({message:'please provide pincode'});

        if(!landmark) return res.status(400).send({message:'please provide landmark'});

        if(!city) return res.status(400).send({message:'please provide city'});

        if(!state) return res.status(400).send({message:'please provide state'});

        if(!country) return res.status(400).send({message:'please provide country'});

        if(!customer) return res.status(400).send({message:'please provide customer'});

        if(!mongoose.isValidObjectId(customer)) return res.status(400).send({message:'please provide valid customer'});

        const data = await customerAddressModel.create(req.body);

        return res.status(201).send({message:data})
        
    } catch (error) { return res.status(500).send({message:error})}
}

const getAddress = async (req,res) =>{
    try {
        const customer = req.params.customer;

        if(!customer) return res.status(400).send({message:'please provide customer'});

        if(!mongoose.isValidObjectId(customer)) return res.status(400).send({message:'please provide valid customer'});

        const data = await customerAddressModel.findOne({customer}).populate('customer');

        if(!data) return res.status(404).send({message:"NOT found data"});

        return res.status(200).send({message:data});

    } catch (error) { return res.status(500).send({message:error})}
}

const updateAddress = async (req,res) => {
    try {
        const addressId = req.params.addressId;

        if(!addressId) return res.status(400).send({message:'please provide addressId'});

        if(!mongoose.isValidObjectId(addressId)) return res.status(400).send({message:'please provide valid addressId'});

        if(checkBody(req.body)) return res.status(400).send({message:'please provide data'});

        const checkaddress = await customerAddressModel.findById(addressId);
        
        if(!checkaddress) return  res.status(404).send({message:"NOT found data"});

        const data = await customerAddressModel.findByIdAndUpdate(addressId,req.body,{new:true ,upsert:true});

        return res.status(200).send({message:data});

    } catch (error) { return res.status(500).send({message:error})}
}

module.exports = {createAddress ,getAddress ,updateAddress}
const customerModel = require('../model/customersModel');
const bcrypt = require('bcrypt');
const { checkBody, checkName, checkPhone, checkEmail, checkgender, checkpassword, checkUserName, checkDate } = require('../validation/validation');
const { uploadFile } = require('../aws/aws');
const { default: mongoose } = require('mongoose');


//--------------------------create customer
const createCustomer = async (req, res) => {
    try {
        const { firstName, lastName, userName, email, phone, DOB, gender, password } = req.body;
        const file = req.files;

        //------------------------------ validation
        if (checkBody(req.body)) return res.status(400).send({ message: 'please provide data' });
        if (!firstName) return res.status(400).send({ message: 'please provide Firstname' });
        if (!lastName) return res.status(400).send({ message: 'please provide lastName' });
        if (!userName) return res.status(400).send({ message: 'please provide userName' });
        if (!email) return res.status(400).send({ message: 'please provide email' });
        if (!phone) return res.status(400).send({ message: 'please provide phone' });
        if (!DOB) return res.status(400).send({ message: 'please provide DOB' });
        if (!gender) return res.status(400).send({ message: 'please provide gender' });
        if (!password) return res.status(400).send({ message: 'please provide password' });
        if (!checkName(firstName)) return res.status(400).send({ message: 'please provide valid Firstname' });
        if (!checkName(lastName)) return res.status(400).send({ message: 'please provide valid lastname' });
        if (!checkUserName(userName)) return res.status(400).send({ message: 'please provide valid userName' });
        if (!checkEmail(email)) return res.status(400).send({ message: 'please provide valid email' });
        if (!checkPhone(phone)) return res.status(400).send({ message: 'please provide valid phone' });
        if (!checkgender(gender)) return res.status(400).send({ message: 'please provide valid gender' });
        if (!checkpassword(password)) return res.status(400).send({ message: 'password should be  8 to 15 only and a to z , A to Z ' });
        if (!checkDate(DOB)) return res.status(400).send({ message: 'please provide valid DOB' });
        if (req.body.profileImage == 'undefined') delete req.body.profileImage;

        if (req.files.length !== 0) {
            req.body.profileImage = await uploadFile(file[0]); // upload file in aws
        }

        req.body.password = await bcrypt.hash(password, 10); // hash password 

        //---------------------DB call
        const uniqueEmail = await customerModel.findOne({ email });
        const uniquePhone = await customerModel.findOne({ phone });
        const uniqueUserName = await customerModel.findOne({ userName });

        if (uniqueEmail) return res.status(400).send({ message: 'please provide unique email' });
        if (uniquePhone) return res.status(400).send({ message: 'please provide unique phone' });
        if (uniqueUserName) return res.status(400).send({ message: 'please provide unique userName' });

        const data = await customerModel.create(req.body);

        res.status(201).send({ message: data });

    } catch (error) { return res.status(500).send({ message: error }) }
}

//--------------------------get customer
const getCustomer = async (_, res) => {
    try {
        const data = await customerModel.find();

        if (data.length === 0) return res.status(404).send({ message: 'not data Found' });

        return res.status(200).send({ message: data });

    } catch (error) { return res.status(500).send({ message: error }) }
}

//--------------------------get customer by id
const getCustomerById = async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.isValidObjectId(id)) return res.status(400).send({ message: "please provide valid id" });

        const data = await customerModel.findById(id);

        if (!data) return res.status(404).send({ message: "NOT found customer" });

        return res.status(200).send({ message: data })

    } catch (error) { return res.status(500).send({ message: error }) }
}

//--------------------------update customer
const updateCustomer = async (req, res) => {
    try {
        const id = req.params.id;
        const { firstName, lastName, userName, email, phone, DOB, gender} = req.body;

        if (!mongoose.isValidObjectId(id)) return res.status(400).send({ message: "please provide valid id" });

        const checkCustomer = await customerModel.findById(id);

        if (!checkCustomer) return res.status(404).send({ message: "NOT found customer" });

        if (checkBody(req.body)) return res.status(400).send({ message: 'please provide data' });

        if (firstName) {
            if (!checkName(firstName)) return res.status(400).send({ message: 'please provide valid Firstname' });
        }
        if (lastName) {
            if (!checkName(lastName)) return res.status(400).send({ message: 'please provide valid lastname' });
        }
        if (userName) {
            if (!checkUserName(userName)) return res.status(400).send({ message: 'please provide valid userName' });
        }
        if (email) {
            if (!checkEmail(email)) return res.status(400).send({ message: 'please provide valid email' });
        }
        if (phone) {
            if (!checkPhone(phone)) return res.status(400).send({ message: 'please provide valid phone' });
        }
        if (DOB) {
            if (!checkDate(DOB)) return res.status(400).send({ message: 'please provide valid DOB' });
        }
        if (gender) {
            if (!checkgender(gender)) return res.status(400).send({ message: 'please provide valid gender' });
        }
        if (req.body.profileImage == 'undefined') delete req.body.profileImage;
        //---------------------DB call
        const uniqueEmail = await customerModel.findOne({ email });
        const uniquePhone = await customerModel.findOne({ phone });
        const uniqueUserName = await customerModel.findOne({ userName });

        if (uniqueEmail) return res.status(400).send({ message: 'please provide unique email' });
        if (uniquePhone) return res.status(400).send({ message: 'please provide unique phone' });
        if (uniqueUserName) return res.status(400).send({ message: 'please provide unique userName' });

        const data = await customerModel.findByIdAndUpdate(id, req.body, { new: true, upsert: true });

        res.status(200).send({ message: data });

    } catch (error) { return res.status(500).send({ message: error }) }
}

//--------------------------delete customer
const deleteCustomer = async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.isValidObjectId(id)) return res.status(400).send({ message: "please provide valid id" });

        const data = await customerModel.findById(id);

        if (!data) return res.status(400).send({ message: "NOT found" });

        await customerModel.findByIdAndDelete(id);

        res.status(200).send('customer delete')

    } catch (error) { return res.status(500).send({ message: error }) }
}
module.exports = { createCustomer, getCustomer, getCustomerById, updateCustomer, deleteCustomer }
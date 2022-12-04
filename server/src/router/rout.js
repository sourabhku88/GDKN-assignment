const express = require('express');
const {createCustomer , getCustomer ,getCustomerById ,updateCustomer ,deleteCustomer } = require('../controller/customers')
const {createAddress ,getAddress ,updateAddress} = require('../controller/address');
const router = express.Router();


//----------------------customer API's
router.post('/create/customer',createCustomer);
router.get('/get/customers',getCustomer);
router.get('/get/customer/:id',getCustomerById);
router.put('/update/customer/:id',updateCustomer);
router.delete('/delete/customer/:id',deleteCustomer);

//-------------------Address API's
router.post('/create/address',createAddress);
router.get('/get/address/:customer',getAddress);
router.put('/update/address/:addressId',updateAddress);


//--------------------------test API
router.get('/' , (_,res) => res.send({status:true, message:'server running'}));
//-------------------------BAD URLS
router.all('*',(_,res) => res.status(404).send({status:false, message:'URLS NOT FOUND'}));

module.exports = router;
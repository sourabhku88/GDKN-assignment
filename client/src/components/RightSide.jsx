import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const URL = 'http://localhost:3002' // backend url

const RightSide = ({ id, setId }) => {
  const [customerData, setCustomerDate] = useState('');
  const [addressData, setAddressDate] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [customerInputData, setCustomerIinputData] = useState({ firstName: "", lastName: "", gender: '', DOB: "", userName: "", phone: "", email: "", })

  /// get customer----------------------------
  const getCustomer = async _ => {
    try {
      const { data } = await axios(`${URL}/get/address/${id}`);
      setCustomerDate(data.message.customer)
      setAddressDate(data.message)
    } catch (error) {
      console.log(error);
    }
  }

  /// delete customer----------------------------
  const deleteCustomer = async _ => {
    try {
      const { data } = await axios.delete(`${URL}/delete/customer/${id}`);
      const res = await axios.get(`${URL}/get/customers`);
      setId(res.data.message[0]._id);
      toast.success(data.message);
      getCustomer();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  }

  // update customer----------------------------
  const updateCustomer = async _ => {
    try {
      const formData = new FormData();
      if (customerInputData.firstName.length !== 0) formData.append('firstName', customerInputData.firstName);
      if (customerInputData.lastName.length !== 0) formData.append('lastName', customerInputData.lastName);
      if (customerInputData.gender.length !== 0) formData.append('gender', customerInputData.gender);
      if (customerInputData.DOB.length !== 0) formData.append('DOB', customerInputData.DOB);
      if (customerInputData.userName.length !== 0) formData.append('userName', customerInputData.userName);
      if (customerInputData.phone.length !== 0) formData.append('phone', customerInputData.phone);
      if (customerInputData.email.length !== 0) formData.append('email', customerInputData.email);
      if (profileImage !== 0) formData.append('profileImage', profileImage[0]);
      const { data } = await axios.put(`${URL}/update/customer/${id}`, formData);
      toast.success('Customer update');
      setCustomerDate(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  const inpputHendler = e => { setCustomerIinputData({ ...customerInputData, [e.target.name]: e.target.value }); }

  useEffect(() => {
    getCustomer();
  }, [setId, id]);

  return (
    <>
      <ToastContainer />
      <div className="p-3 bg-white rounded">
        <div className='rightBox  d-flex justify-content-start  rounded '>
          <div className="headerBox d-flex mx-3 my-3">
            <div className="img ">
              <img className='rounded-circle' src={customerData === null ? '' : customerData.profileImage === undefined  ? "https://www.pngarts.com/files/6/User-Avatar-in-Suit-PNG.png" : customerData.profileImage} alt="" />
            </div> 
            <div className="info mx-3 my-3 ">
              <h3>{customerData === null ? '' : customerData.firstName}  {customerData === null ? '' : customerData.lastName}</h3>
              <div className="userDetail d-flex ">
                <p className='mb-3 '> <i className="fa fa-user-o" aria-hidden="true"></i>  {customerData === null ? '' : customerData.userName} </p>
                <p className='mb-3 ms-5'> <i className="fa fa-envelope-o" aria-hidden="true"></i> {customerData === null ? '' : customerData.email}</p>
                <p className='mb-3 ms-5'> <i className="fa-solid fa-phone"></i>  {customerData === null ? '' : customerData.phone} </p>
              </div>
              <div className="buttonGroup">
                <button type="button" className="btn btn-outline-warning mx-5" data-bs-toggle="modal" data-bs-target="#updateCustomer"> <i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</button>
                <button type="button" className="btn btn-outline-danger" onClick={() => { deleteCustomer() }}> <i className="fa fa-trash" aria-hidden="true"></i> Delete Customer</button>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <h3 className='ms-3'> Personal Detail </h3>
        <div className="personalDetail d-flex mx-3">
          <div className="fname p-3 bg-danger rounded bg-opacity-25 w-25 mx-2">
            <small>First Name</small>
            <h6>{customerData === null ? '' :customerData.firstName}</h6>
          </div>
          <div className="lname p-3 bg-danger rounded bg-opacity-25 w-25 mx-2">
            <small>Last Name</small>
            <h6>{customerData === null ? '' :customerData.lastName}</h6>
          </div>
          <div className="gender p-3 bg-danger rounded bg-opacity-25 w-25 mx-2">
            <small>Gender</small>
            <h6>{customerData === null ? '' :customerData.gender}</h6>
          </div>
          <div className="Dob p-3 bg-danger rounded bg-opacity-25 w-25 mx-2">
            <small>Date of Birth</small>
            <h6>{customerData === null ? '' :customerData.DOB}</h6>
          </div>
        </div>
        <div className="w-50">
          <h3 className='ms-3 my-3'> Address Detail </h3>
          <div className="landmark bg-danger rounded bg-opacity-25 p-3  d-flex my-2 justify-content-between mx-5">
            <small>Land Mark</small>
            <h6> {addressData.landmark}</h6>
          </div>
          <div className="city d-flex my-2 rounded justify-content-between bg-secondary p-3 mx-5">
            <small> City</small>
            <h6> {addressData.city} </h6>
          </div>
          <div className="state bg-danger rounded bg-opacity-25 p-3 d-flex my-2 justify-content-between mx-5">
            <small>State</small>
            <h6> {addressData.state} </h6>
          </div>
          <div className="county d-flex my-2 rounded justify-content-between bg-secondary p-3 mx-5">
            <small>County</small>
            <h6> {addressData.country} </h6>
          </div>
        </div>
      </div>
      {/* ------------------------------------------Modal fro update customer------------------------------------------------- */}
      <div className="modal fade" id="updateCustomer" tabIndex="-2" aria-labelledby="updateCustomerLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="updateCustomerLabel">Update Customer</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <input type="text" placeholder='First Name' name='firstName' value={customerInputData.firstName} onChange={inpputHendler} className="form-control mb-3" />
                <input type="text" placeholder='Last Name' name='lastName' value={customerInputData.lastName} onChange={inpputHendler} className="form-control mb-3" />
                <input type="text" placeholder='UserName' name='userName' value={customerInputData.userName} onChange={inpputHendler} className="form-control mb-3" />
                <input type="number" placeholder='Phone' name='phone' value={customerInputData.phone} onChange={inpputHendler} className="form-control mb-3" />
                <input type="email" placeholder='Email' name='email' value={customerInputData.email} onChange={inpputHendler} className="form-control mb-3" />
                <p>DOB <input type="date" placeholder='Data of Birth' name='DOB' value={customerInputData.DOB} onChange={inpputHendler} className="form-control mb-3" /></p>
                <select className="form-select mb-3" value={customerInputData.gender} name='gender' onChange={inpputHendler} >
                  <option selected value="choose">Choose one </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <p>Profile pic <input type="file" onChange={(e) => { setProfileImage(e.target.files) }} className="form-control mb-3" /></p>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-warning" onClick={() => { updateCustomer() }}>Update</button>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default RightSide

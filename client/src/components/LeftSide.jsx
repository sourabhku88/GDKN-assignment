import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const URL = 'http://localhost:3002'  // backeend url----------------------

const LeftSide = ({ id, setId }) => {
  const [customerData, setCustomerDate] = useState([]);
  const [profileImage, setProfileImage] = useState('');
  const [customerInputData, setCustomerIinputData] = useState({ firstName: "", lastName: "", gender: '', DOB: "", userName: "", phone: "", email: "", password: "", cpassword: "", })
  const [customerAddresInputData, setCustomerAddressIinputData] = useState({ landmark: "", city: "", state: "", country: "", pincode: "", })

  //   get customer function----------------------------------
  const getCustomer = async _ => {
    try {
      const { data } = await axios(`${URL}/get/customers`);
      setId(data.message[0]._id);
      setCustomerDate(data.message)
    } catch (error) {
      console.log(error);
    }
  }


  //   creat customer function----------------------------------
  const createCustomer = async _ => {
    if (customerInputData.password !== customerInputData.cpassword) return toast.error('not match both password');
  }


  //   creat address function----------------------------------
  const createAddress = async _ => {
    try {
      const formData = new FormData();
      formData.append('firstName', customerInputData.firstName);
      formData.append('lastName', customerInputData.lastName);
      formData.append('gender', customerInputData.gender);
      formData.append('DOB', customerInputData.DOB);
      formData.append('userName', customerInputData.userName);
      formData.append('phone', customerInputData.phone);
      formData.append('email', customerInputData.email);
      formData.append('password', customerInputData.password);
      formData.append('profileImage', profileImage[0]);
      const { data } = await axios.post(`${URL}/create/customer`, formData);
      toast.success('create Customer');
      getCustomer()
      if (data.message._id !== undefined) {
        localStorage.setItem('createCustomerID', data.message._id);
        customerAddresInputData.customer = localStorage.getItem('createCustomerID');
        await axios.post(`${URL}/create/address`, customerAddresInputData);
        setCustomerIinputData({ firstName: "", lastName: "", gender: '', DOB: "", userName: "", phone: "", email: "", password: "", cpassword: "", })
        setCustomerAddressIinputData({ landmark: "", city: "", state: "", country: "", pincode: "", })
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  // input hendler---------------
  const inpputHendler = e => { setCustomerIinputData({ ...customerInputData, [e.target.name]: e.target.value }); }

  // address hendler---------------
  const addressInpputHendler = e => { setCustomerAddressIinputData({ ...customerAddresInputData, [e.target.name]: e.target.value }); }



  useEffect(() => {
    getCustomer();
  }, [setId, id])

  return (
    <>
      <ToastContainer />
      <span>Customer List</span>
      <div className="leftHeader d-flex">
        <div className="search .bg-body d-flex" style={{ 'width': '300px' }}>
          <input type="text" placeholder='Search' className='rounded p-2' />
          <button type="button" className="btn btn-outline-secondary mx-2 btn-sm"><i className="fa-solid fa-magnifying-glass"></i></button>
        </div>
        <button type="button" className="btn btn-outline-success btn-sm me-1" data-bs-toggle="modal" data-bs-target="#createCustomer"><i className="fa-solid fa-plus"></i></button>
      </div>
      <hr />
      <div className="customer_list">
        {customerData && customerData.map(customer => (
          <>
            <div className="customerBox d-flex p-2 m-2 bg-body rounded" onClick={() => setId(customer._id)} key={Date.now()}>
              <div className="image">
                <img src={customer.profileImage === undefined ? "https://www.pngarts.com/files/6/User-Avatar-in-Suit-PNG.png" : customer.profileImage} alt="" />
              </div>
              <div className="info mx-3">
                <h2 className='fs-4 mb-0'>{`${customer.firstName} ${customer.lastName}`}</h2>
                <p className='text-muted mb-0'>{customer.email}</p>
              </div>
            </div>
          </>
        ))}
      </div>
      {/* ------------------------------------model for create customer-------------------------------------------------- */}
      <div className="modal fade" id="createCustomer" tabIndex="-1" aria-labelledby="createCustomerLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="createCustomerLabel">Create Customer</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <input type="text" placeholder='First Name' name='firstName' value={customerInputData.firstName} onChange={inpputHendler} className="form-control mb-3" />
                <input type="text" placeholder='Last Name' name='lastName' value={customerInputData.lastName} onChange={inpputHendler} className="form-control mb-3" />
                <input type="text" placeholder='UserName' name='userName' value={customerInputData.userName} onChange={inpputHendler} className="form-control mb-3" />
                <input type="number" placeholder='Phone' name='phone' value={customerInputData.phone} onChange={inpputHendler} className="form-control mb-3" />
                <input type="email" placeholder='Email' name='email' value={customerInputData.email} onChange={inpputHendler} className="form-control mb-3" />
                <input type="password" placeholder='Password' name='password' value={customerInputData.password} onChange={inpputHendler} className="form-control mb-3" />
                <input type="password" placeholder='Confirm Password' name='cpassword' value={customerInputData.cpassword} onChange={inpputHendler} className="form-control mb-3" />
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
              <button type="button" className="btn btn-warning" onClick={() => { createCustomer() }} data-bs-toggle="modal" data-bs-target="#createAddress">create & Add Address</button>
            </div>
          </div>
        </div>
      </div>
      {/* --------------------------------------modal for address------------------------------------------------------------ */}
      <div className="modal fade" id="createAddress" tabIndex="-1" aria-labelledby="createAddressLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="createAddressLabel">Create Customer</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <input type="text" name='landmark' value={customerAddresInputData.landmark} onChange={addressInpputHendler} placeholder='Landmark' className="form-control mb-3" />
                <input type="text" name='city' value={customerAddresInputData.city} onChange={addressInpputHendler} placeholder='City' className="form-control mb-3" />
                <input type="text" name='state' value={customerAddresInputData.state} onChange={addressInpputHendler} placeholder='State' className="form-control mb-3" />
                <input type="number" name='pincode' value={customerAddresInputData.pincode} onChange={addressInpputHendler} placeholder='Pincode' className="form-control mb-3" />
                <input type="text" name='country' value={customerAddresInputData.country} onChange={addressInpputHendler} placeholder='Country' className="form-control mb-3" />
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-warning  me-1" data-bs-toggle="modal" data-bs-target="#createCustomer"> Back </button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-success" onClick={() => { createAddress() }} data-bs-dismiss="modal">Create</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LeftSide
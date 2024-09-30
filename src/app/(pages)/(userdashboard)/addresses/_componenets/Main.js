'use client'
import React, { useEffect, useState } from 'react'
import AbTable from '@/components/inputfields/AbTable';
import DashboardLayout from '@/components/layouts/DashboardLayout'
import AddressForm from '@/components/shared/forms/AddressForm'
import AbAlertDialog from '@/components/inputfields/AbAlertDialog';
import { DeleteForever } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { addressStore, deleteAddress, getAddress } from '@/reduxtoolkit/slices/auth/AddressSlice';
import { addSnackbarData } from '@/reduxtoolkit/slices/SnakMessageSlice';

const Main = () => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [address, setAddress] = useState({
    country: '',
    state: '',
    city: '',
    area: '',
    postal_code: '',
    phone: '',
  });
  const [addressId, setAddressId] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress(prevAddress => ({
      ...prevAddress,
      [name]: value
    }));
  };

  const dispatch = useDispatch();

  // ****************** Handle Submission Form ****************** //
  const validateAddressForm = () => {
    const errors = {};
    if (!address.country) errors.country = 'Country is required';
    if (!address.state) errors.state = 'State is required'
    if (!address.city) errors.city = 'City is required'
    if (!address.area) errors.area = 'Address is required'
    if (!address.postal_code) errors.postal_code = 'Postal Code is required'
    if (!address.phone) errors.phone = 'Phone No is required'
    if (address.phone.length > 11 || address.phone.length < 11) errors.phone = 'Enter a valid phone number'
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateAddressForm()) {
      dispatch(addressStore(address)).then((result) => {
        if (result?.payload?.data) {
          dispatch(getAddress());
          dispatch(addSnackbarData({ message: result?.payload?.message, variant: 'success' }));
          setAddress({
            country: '', state: '', city: '', area: '', postal_code: '', phone: '',
          })
        } else {
          dispatch(addSnackbarData({ message: 'Something went wrong', variant: 'error' }));
        }
      })

    }
  };

  // ****************** Get User Addresses ****************** //
  const { token } = useSelector((state) => state.LoginUser);
  const { userAddresses } = useSelector((state) => state.UserAddress);
  useEffect(() => {
    if (token) {
      dispatch(getAddress());
    }
  }, [dispatch, token]);

  // **************** Handle Alert ****************** //
  const handleAlertOpen = (id) => {
    setAlertOpen(true);
    setAddressId(id);
  }
  const handleAlertClose = () => {
    setAlertOpen(false);
    setAddressId(null);
  };

  // **************** Handle Delete Address ****************** //
  const handleConfirmDelete = (id) => {
    handleAlertClose();
    dispatch(deleteAddress(id)).then((result) => {
      if (result?.payload?.message) {
        dispatch(getAddress());
        dispatch(addSnackbarData({ message: result?.payload?.message, variant: 'success' }));
      } else {
        dispatch(addSnackbarData({ message: 'Something went wrong', variant: 'error' }));
      }
    })
  }
  // ****************** Table columns ****************** //
  const columns = [
    { key: 'country', label: 'Country' },
    { key: 'state', label: 'State' },
    { key: 'city', label: 'City' },
    { key: 'address', label: 'Address' },
    { key: 'postal_code', label: 'Postal Code' },
    { key: 'phone', label: 'Phone No' },
  ];

  return (
    <DashboardLayout
      counts={userAddresses?.length}
    >
      <div className='tw-font-bold tw-text-xl'> MY Addresses: </div>
      <div className='tw-my-5'>
        <AbTable
          data={userAddresses}
          columns={columns}
          icon={<DeleteForever className='tw-text-primary' />}
          clickOnIcon={handleAlertOpen}
        />
      </div>

      <div className='tw-font-bold tw-text-lg tw-mb-5 tw-mt-12' > CREATE NEW Address: </div>
      <div>
        <AddressForm
          title='Add Address'
          data={address}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          defaultExpanded={true}
          errors={errors}
        />
      </div>
      <AbAlertDialog
        open={alertOpen}
        handleClose={handleAlertClose}
        onConfirm={() => handleConfirmDelete(addressId)}
        title='Are you sure you want to delete this Address?'
      />
    </DashboardLayout>
  )
}

export default Main
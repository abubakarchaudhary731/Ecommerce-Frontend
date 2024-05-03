'use client'
import React, { useEffect, useState } from 'react'
import AbRadioField from '@/components/inputfields/AbRadioField';
import AddressForm from '@/components/shared/forms/AddressForm'
import PaymentForm from '@/components/shared/forms/PaymentForm';
import AbButton from '@/components/inputfields/AbButton';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { addressStore, getAddress } from '@/reduxtoolkit/slices/auth/AddressSlice';
import { addSnackbarData } from '@/reduxtoolkit/slices/SnakMessageSlice';

const Main = () => {
  const [errors, setErrors] = useState({});
  const [getId, setGetId] = useState({
    address_id: '',
    payment_id: '',
    payment_method: 'cod',
  });
  const [address, setAddress] = useState({
    country: '',
    state: '',
    city: '',
    area: '',
    postal_code: '',
    phone: '',
  });
  const [paymentDetail, setPaymentDetail] = useState({
    nameOnCard: '',
    cardNumber: '',
    cvc: '',
    expiryDate: '',
  });
console.log(getId);
  const router = useRouter();
  const dispatch = useDispatch();
  const { CheckoutData } = useSelector((state) => state.Checkout);
  const { userAddresses } = useSelector((state) => state.UserAddress);

  const handleIdChange = (e) => {
    const { name, value } = e.target;
    setGetId(prevId => ({
      ...prevId,
      [name]: value
    }));
  };

  // ****************** Get User Addresses ****************** //
  useEffect(() => {
    if (CheckoutData?.products) {
      dispatch(getAddress());
    }
  }, [dispatch, CheckoutData]);

  // ****************** User Address Form ****************** //
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress(prevAddress => ({
      ...prevAddress,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateAddressForm()) {
      dispatch(addressStore(address)).then((result) => {
        if (result.payload?.data) {
          dispatch(getAddress());
          dispatch(addSnackbarData({ message: 'Address added successfully', variant: 'success' }));
          setAddress({
            country: '', state: '', city: '', area: '', postal_code: '', phone: '',
          })
        } else {
          dispatch(addSnackbarData({ message: 'Something went wrong', variant: 'error' }));
        }
      })
    }
  }

  // ****************** User Payment Form ****************** //
  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetail(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault()
    console.log(paymentDetail);
  }

  return (
    <>
      {
        CheckoutData?.products ? (
          <div className='tw-my-10'>
            <div className='lg:tw-flex'>
              {/*************** Left Section  **************/}
              <div className='tw-basis-full lg:tw-pr-10'>
                <div>
                  <AbRadioField
                    label="Select an Address:"
                    options={userAddresses}
                    defaultValue={getId.address_id}
                    name="address_id"
                    onChange={handleIdChange}
                  />
                </div>
                <div className='tw-mt-4'>
                  <AddressForm
                    title='Add Another Address'
                    data={address}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    errors={errors}
                  />
                </div>
                <div className='tw-mt-8'>
                  <AbRadioField
                    label="Select Payment Method:"
                    defaultValue={getId.payment_method}
                    name="payment_method"
                    onChange={handleIdChange}
                    options={[
                      { id: 'cod', label: 'Cash On Delivery' },
                      { id: 'card', label: 'Debit Card' },
                    ]}
                  />
                </div>
                {
                  getId.payment_method === 'card' && (
                    <div className='tw-mt-5'>
                      <AbRadioField
                        label="Select Card:"
                        options={[]}
                        defaultValue={getId.payment_id}
                        name="gender"
                        onChange={handleIdChange}
                      />
                      <div className='tw-my-2'>
                        <PaymentForm
                          title='Add Card'
                          data={paymentDetail}
                          handleChange={handlePaymentChange}
                          handleSubmit={handlePaymentSubmit}
                        />
                      </div>
                    </div>
                  )
                }
              </div>
              {/*************** Right Section  **************/}
              <div className='tw-basis-96 tw-min-h-[70vh] tw-bg-whitee tw-rounded-xl tw-px-5 tw-py-8'>
                <h1 className='tw-font-bold tw-mb-5'> Your Order </h1>
                {
                  CheckoutData?.products?.map((item, index) => {
                    return (
                      <div className='tw-flex tw-justify-between tw-items-center tw-mb-3' key={index}>
                        <p> {item.quantity} X {item.product.name} </p>
                        <p>${item.quantity * item.product.price}</p>
                      </div>
                    )
                  })
                }
                <hr className='tw-border-icon' />
                <div className='tw-flex tw-justify-between tw-items-center'>
                  <p className='tw-text-icon tw-font-bold tw-py-3'> Sub Total: </p>
                  <p>${CheckoutData.total}</p>
                </div>
                <div className='tw-flex tw-justify-between tw-items-center'>
                  <p className='tw-text-icon tw-font-bold tw-mb-3'> Delivery: </p>
                  <p>$5</p>
                </div>
                <hr className='tw-border-icon' />
                <div className='tw-flex tw-justify-between tw-items-center'>
                  <p className='tw-text-icon tw-font-bold tw-py-3'> Total: </p>
                  <p>${CheckoutData.total + 5}</p>
                </div>
                <hr className='tw-border-icon' />

              </div>

            </div>

            {/* **************************** Bottom Buttons ********************** */}
            <div className='tw-mt-5 tw-flex tw-flex-col tw-gap-2 sm:tw-flex-row sm:tw-justify-between'>
              <AbButton
                label='Back'
                contained={true}
                className='tw-max-w-32'
                handleClick={() => router.push('/cart')}
              />
              <AbButton
                label='Confirm Order'
                // contained={true}
                className='tw-max-w-40'
                handleClick={() => router.push('/cart')}
              />
            </div>
          </div>
        ) : (
          <div className='tw-my-20 tw-font-bold tw-text-primary tw-text-2xl tw-text-center'>
            No Checkout Item Found
          </div>
        )
      }
    </>
  )
}

export default Main
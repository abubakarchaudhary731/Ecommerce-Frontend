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
import { cardStore, getCardDetail } from '@/reduxtoolkit/slices/auth/PaymentDetailSlice';
import { placeOrder } from '@/reduxtoolkit/slices/order/ConfirmOrderSlice';

const Main = () => {
  const [errors, setErrors] = useState({});
  const [getId, setGetId] = useState({
    address_id: '',
    payment_id: '',
    payment_method: 'cod',
    cartIds: [],
    total_price: '',
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
    name_on_card: '',
    card_number: '',
    cvc: '',
    expiry_date: '',
  });

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

  useEffect(() => {
    const cartIds = CheckoutData?.products?.map(item => item.id) || [];
    setGetId(prevState => ({
      ...prevState,
      cartIds: cartIds,
      total_price: CheckoutData?.total + 90
    }));
  }, [CheckoutData]);

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

  // ****************** Get User Payment Cards ****************** //
  const { userCards } = useSelector((state) => state.PaymentDetail)
  useEffect(() => {
    if (CheckoutData?.products) {
      dispatch(getCardDetail());
    }
  }, [dispatch, CheckoutData]);

  // ****************** User Payment Form ****************** //
  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'expiry_date') {
      // Format expiry date (MM-YY) with hyphen after every 2 digits
      formattedValue = value.replace(/\D/g, ''); // Remove non-numeric characters
      if (formattedValue.length > 2) {
        formattedValue = formattedValue.slice(0, 2) + '-' + formattedValue.slice(2);
      }

      // Validate format (4 characters with a hyphen)
      if (!/^\d{0,2}-?\d{0,2}$/.test(formattedValue)) {
        formattedValue = ''; // Set to empty string if format is invalid
      }

      // Check if the month part is greater than 12
      const [month] = formattedValue.split('-');
      if (parseInt(month, 10) > 12) {
        formattedValue = formattedValue.slice(0, -1); // Remove the last character
      }
    } else if (name === 'card_number') {
      // Format card number with hyphen after every 4 digits
      formattedValue = value.replace(/\D/g, ''); // Remove non-numeric characters
      if (formattedValue.length > 0) {
        formattedValue = formattedValue.match(new RegExp('.{1,4}', 'g')).join('-');
      }

      // Allow only 16 digits
      if (formattedValue.length > 19) { // 16 digits + 3 hyphens
        return;
      }
    }

    setPaymentDetail(prevData => ({
      ...prevData,
      [name]: formattedValue
    }));
  };
  const validatePaymentForm = () => {
    const errors = {};
    if (!paymentDetail.name_on_card) errors.name_on_card = 'Name On Card is required';
    if (!paymentDetail.card_number) errors.card_number = 'Card Number is required'
    if (!paymentDetail.cvc) errors.cvc = 'CVC is required'
    if (!paymentDetail.expiry_date) errors.expiry_date = 'Expiry Date is required'
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ****************** User Payment Form Submit ****************** //
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (validatePaymentForm()) {
      dispatch(cardStore(paymentDetail)).then((result) => {
        if (result?.payload?.message) {
          dispatch(getCardDetail());
          dispatch(addSnackbarData({ message: result?.payload?.message, variant: 'success' }));
          setPaymentDetail({ name_on_card: '', card_number: '', cvc: '', expiry_date: '' });
        } else {
          dispatch(addSnackbarData({ message: result?.error?.message, variant: 'error' }));
        }
      })
    }
  }

  // ********************** Handle Confirm Order ********************** //
  const confirmOrder = () => {total
    if (!getId.address_id) {
      dispatch(addSnackbarData({ message: 'Please select an address', variant: 'error' }));
    } else if (getId.payment_method === 'card' && !getId.payment_id) {
      dispatch(addSnackbarData({ message: 'Please select a payment method', variant: 'error' }));
    } else {
      dispatch(placeOrder(getId)).then((result) => {
        console.log(result);
        if (result?.payload?.message) {
          dispatch(addSnackbarData({ message: result?.payload?.message, variant: 'success' }));
          router.push('/orders');
        } else {
          dispatch(addSnackbarData({ message: result?.error?.message, variant: 'error' }));
        }
      });
    }
  };

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
                        options={userCards}
                        defaultValue={getId.payment_id}
                        name="payment_id"
                        onChange={handleIdChange}
                      />
                      <div className='tw-my-2'>
                        <PaymentForm
                          title='Add Card'
                          data={paymentDetail}
                          handleChange={handlePaymentChange}
                          handleSubmit={handlePaymentSubmit}
                          errors={errors}
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
                        <p>{item.quantity * item.product.price}</p>
                      </div>
                    )
                  })
                }
                <hr className='tw-border-icon' />
                <div className='tw-flex tw-justify-between tw-items-center'>
                  <p className='tw-text-icon tw-font-bold tw-py-3'> Sub Total: </p>
                  <p>Rs: {CheckoutData.total}</p>
                </div>
                <div className='tw-flex tw-justify-between tw-items-center'>
                  <p className='tw-text-icon tw-font-bold tw-mb-3'> Delivery: </p>
                  <p>90</p>
                </div>
                <hr className='tw-border-icon' />
                <div className='tw-flex tw-justify-between tw-items-center'>
                  <p className='tw-text-icon tw-font-bold tw-py-3'> Total: </p>
                  <p>{CheckoutData.total + 90} PKR </p>
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
                className='tw-max-w-40'
                handleClick={confirmOrder}
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
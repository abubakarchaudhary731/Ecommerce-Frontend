'use client'
import React, { useState } from 'react'
import AbTable from '@/components/inputfields/AbTable';
import AddressForm from '@/components/shared/forms/AddressForm'
import PaymentForm from '@/components/shared/forms/PaymentForm';

const Main = () => {
  const [paymentDetail, setPaymentDetail] = useState({
    nameOnCard: '',
    cardNumber: '',
    cvc: '',
    expiryDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetail(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(paymentDetail);
  }
  
  const columns = [
    { key: 'nameOnCard', label: 'Card Holder Name' },
    { key: 'cardNumber', label: 'Card Number' },
    { key: 'expiryDate', label: 'Expiry Date' },
  ];

  const data = [
    { nameOnCard: 'Abu Bakar', cardNumber: '11440107890695', expiryDate: '03/25' },
    { nameOnCard: 'M Hamza', cardNumber: '11760107890698', expiryDate: '09/28' },
  ]

  return (
    <>
      <div className='tw-font-bold tw-text-xl'> MY Payment Methods: </div>
      <div className='tw-my-5'>
        <AbTable
          data={data}
          columns={columns}
        />
      </div>

      <div className='tw-font-bold tw-text-lg tw-my-5'> Create New Payment-Method: </div>
      <div>
        <PaymentForm
          title='Add Another Payment Method'
          data={paymentDetail}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          defaultExpanded={true}
        />
      </div>

    </>
  )
}

export default Main
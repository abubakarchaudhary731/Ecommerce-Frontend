'use client'
import React, { useState } from 'react'
import AbTable from '@/components/inputfields/AbTable';
import PaymentForm from '@/components/shared/forms/PaymentForm';
import { DeleteForever } from '@mui/icons-material';
import AbAlertDialog from '@/components/inputfields/AbAlertDialog';

const Main = () => {
  const [alertOpen, setAlertOpen] = useState(false);
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

  const handleAlertOpen = () => {
    setAlertOpen(true);
  }
  const handleAlertClose = () => {
    setAlertOpen(false);
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
          icon={<DeleteForever className='tw-text-primary' />}
          clickOnIcon={handleAlertOpen}
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
      <AbAlertDialog
        open={alertOpen}
        handleClose={handleAlertClose}
        title='Are you sure you want to delete this payment method?'
      />
    </>
  )
}

export default Main
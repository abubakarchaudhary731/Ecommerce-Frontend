'use client'
import React, { useEffect, useState } from 'react'
import AbTable from '@/components/inputfields/AbTable';
import PaymentForm from '@/components/shared/forms/PaymentForm';
import { DeleteForever } from '@mui/icons-material';
import AbAlertDialog from '@/components/inputfields/AbAlertDialog';
import { useDispatch, useSelector } from 'react-redux';
import { cardStore, deleteCard, getCardDetail } from '@/reduxtoolkit/slices/auth/PaymentDetailSlice';
import { addSnackbarData } from '@/reduxtoolkit/slices/SnakMessageSlice';

const Main = () => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [paymentDetail, setPaymentDetail] = useState({
    name_on_card: '',
    card_number: '',
    cvc: '',
    expiry_date: '',
  });
  const [deleteCardId, setDeleteCardId] = useState();

  const handleChange = (e) => {
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

  const dispatch = useDispatch();

  // ****************** Get Card Details ****************** //
  const { token } = useSelector((state) => state.LoginUser);
  const { userCards } = useSelector((state) => state.PaymentDetail);

  useEffect(() => {
    if (token) {
      dispatch(getCardDetail());
    }
  }, [dispatch, token]);

  // ****************** Handle Submission Form ****************** //
  const validatePaymentForm = () => {
    const errors = {};
    if (!paymentDetail.name_on_card) errors.name_on_card = 'Name On Card is required';
    if (!paymentDetail.card_number) errors.card_number = 'Card Number is required'
    if (!paymentDetail.cvc) errors.cvc = 'CVC is required'
    if (!paymentDetail.expiry_date) errors.expiry_date = 'Expiry Date is required'
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
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

  // ****************** Handle Alerts ****************** //
  const handleAlertOpen = (id) => {
    setAlertOpen(true);
    setDeleteCardId(id);
  }
  const handleAlertClose = () => {
    setAlertOpen(false);
    setDeleteCardId(null);
  }

  // ****************** Handle Delete Card ****************** //
  const handleConfirmDelete = (id) => {
    handleAlertClose();
    dispatch(deleteCard(id)).then((result) => {
      if (result?.payload?.message) {
        dispatch(getCardDetail());
        dispatch(addSnackbarData({ message: result?.payload?.message, variant: 'success' }));
      } else {
        dispatch(addSnackbarData({ message: 'Something went wrong', variant: 'error' }));
      }
    })
  }

  // ****************** Table Columns ****************** //
  const columns = [
    { key: 'name_on_card', label: 'Card Holder Name' },
    { key: 'card_number', label: 'Card Number' },
    { key: 'expiry_date', label: 'Expiry Date' },
  ];

  return (
    <>
      <div className='tw-font-bold tw-text-xl'> MY Payment Methods: </div>
      <div className='tw-my-5'>
        <AbTable
          data={userCards}
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
          errors={errors}
        />
      </div>
      <AbAlertDialog
        open={alertOpen}
        title='Are you sure you want to delete this payment method?'
        handleClose={handleAlertClose}
        onConfirm={() => handleConfirmDelete(deleteCardId)}
      />
    </>
  )
}

export default Main
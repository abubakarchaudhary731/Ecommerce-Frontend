import React, { useState } from 'react'
import AbRadioField from '@/components/inputfields/AbRadioField';
import AddressForm from '@/components/shared/forms/AddressForm'
import PaymentForm from '@/components/shared/forms/PaymentForm';

const Checkout = () => {
  const [address, setAddress] = useState({
    country: '',
    state: '',
    city: '',
    area: '',
    postal_code: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress(prevAddress => ({
      ...prevAddress,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(address);
  }

  // Sample prices, you can replace these with your actual prices
  const prices = {
    subtotal: 100.00,
    shipping: 10.00,
    tax: 5.00,
    discount: 15.00,
  };

  const total = Object.values(prices).reduce((acc, curr) => acc + curr, 0);

  return (
    <>
      <div className='tw-my-10'>
        <div className='lg:tw-flex'>
          {/*************** Left Section  **************/}
          <div className='tw-basis-full lg:tw-pr-10'>
            <div>
              <AbRadioField
                label="Select an Address:"
                options={[
                  { value: '1', label: 'Lahore, Punjab, Pakistan' },
                  { value: '2', label: 'Islamabad, Punjab, Pakistan' },
                  { value: '3', label: 'Singhpura, lahaore, Punjab, Pakistan' }
                ]}
                // defaultValue={selectedValue}
                name="gender"
                // onChange={handleChange}
              />
            </div>
            <div className='tw-mt-4'>
              <AddressForm
                title='Add Another Address'
                data={address}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            </div>
            <div className='tw-mt-8'>
              <AbRadioField
                label="Select Payment Method:"
                options={[
                  { value: 'cod', label: 'Cash On Delivery' },
                  { value: 'card', label: 'Debit Card' },
                ]}
                // defaultValue={selectedValue}
                name="gender"
              // onChange={handleChange}
              />
            </div>
            <div className='tw-my-4'>
              <PaymentForm
                title='Add Card'
              />
            </div>
          </div>
          {/*************** Right Section  **************/}
          <div className='tw-basis-96 tw-min-h-[70vh] tw-bg-whitee tw-rounded-xl tw-px-5 tw-py-8'>
            <h1 className='tw-font-bold tw-mb-5'> Your Order </h1>
            {
              [1, 2, 3, 4, 5].map((item, index) => {
                return (
                  <div className='tw-flex tw-justify-between tw-items-center tw-mb-3' key={index}>
                    <p>{index} X Product</p>
                    <p>$0.00</p>
                  </div>
                )
              })
            }
            <hr className='tw-border-icon' />
            <div className='tw-flex tw-flex-col tw-gap-2 tw-py-5'>
              {Object.entries(prices).map(([label, price], index) => (
                <div className='tw-flex tw-justify-between' key={index}>
                  <p className='tw-text-icon tw-font-bold'> {label.charAt(0).toUpperCase() + label.slice(1)}: </p>
                  <p>${price.toFixed(2)}</p>
                </div>
              ))}
            </div>
            <hr className='tw-border-icon' />
            <div className='tw-flex tw-justify-between tw-items-center'>
              <p className='tw-text-icon tw-font-bold tw-py-3'> Total: </p>
              <p>${total.toFixed(2)}</p>
            </div>
            <hr className='tw-border-icon' />

          </div>

        </div>
      </div>
    </>
  )
}

export default Checkout
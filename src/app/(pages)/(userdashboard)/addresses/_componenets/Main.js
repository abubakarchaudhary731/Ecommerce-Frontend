'use client'
import AbTable from '@/components/inputfields/AbTable';
import AddressForm from '@/components/shared/forms/AddressForm'
import React, { useState } from 'react'

const Main = () => {
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
  const columns = [
    { key: 'country', label: 'Country' },
    { key: 'state', label: 'State' },
    { key: 'city', label: 'City' },
    { key: 'area', label: 'Area' },
    { key: 'postal_code', label: 'Postal Code' },
    { key: 'phone', label: 'Phone' },
  ];

  const data = [
    { country: 'Pakistan', state: 'Punjab', city: 'Lahore', area: 'Lahore', postal_code: '123456', phone: '0300 123456' },
    { country: 'Pakistan', state: 'Punjab', city: 'Lahore', area: 'Lahore', postal_code: '123456', phone: '0300 123456' },
  ]

  return (
    <>
      <div className='tw-font-bold tw-text-xl'> MY Addresses: </div>
      <div className='tw-my-5'>
        <AbTable
          data={data}
          columns={columns}
        />
      </div>

      <div className='tw-font-bold tw-text-lg tw-my-5'> CREATE NEW Address: </div>
      <div>
        <AddressForm
          title='Add Address'
          data={address}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          defaultExpanded={true}
        />
      </div>

    </>
  )
}

export default Main
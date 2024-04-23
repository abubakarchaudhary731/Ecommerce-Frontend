'use client'
import React, { useState } from 'react'
import MasterPage from '@/components/shared/MasterPage'
import AbInputField from '@/components/inputfields/AbInputField';
import { Eye, EyeSlash, Sms } from 'iconsax-react';

const Main = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <>
      <MasterPage
        title='Login Your Account'
        description1='Need to get in touch?'
        description2='You can Login your account first.'
        handleSubmit={handleSubmit}
        buttonLabel='Login'
        login={true}
      >
        <AbInputField
          label='Enter Your Email'
          type='email'
          name='email'
          icon={<Sms />}
          variant='standard'
          value={data.email}
          onChange={handleChange}
        />
        <AbInputField
          label='Enter Your Password'
          type={showPassword ? 'text' : 'password'}
          name='password'
          variant='standard'
          handleClick={handleClickShowPassword}
          icon={showPassword ? <Eye /> : <EyeSlash />}
          value={data.password}
          onChange={handleChange}
        />
      </MasterPage>
    </>
  )
}

export default Main
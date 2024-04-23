'use client'
import React, { useState } from 'react'
import MasterPage from '@/components/shared/MasterPage'
import AbInputField from '@/components/inputfields/AbInputField';
import { Eye, EyeSlash, Sms, User } from 'iconsax-react';

const Main = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

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
        title='Register Your Account'
        description1='Need to get in touch?'
        description2='You can Register your account first.'
        handleSubmit={handleSubmit}
        buttonLabel='Register'
        register={true}
      >
        <AbInputField
          label='Enter Your Name'
          type='text'
          name='name'
          icon={<User />}
          variant='standard'
          value={data.name}
          onChange={handleChange}
        />
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
        <AbInputField
          label='Confirm Password'
          type={showConfirmPassword ? 'text' : 'password'}
          name='password_confirmation'
          variant='standard'
          handleClick={handleClickShowConfirmPassword}
          icon={showConfirmPassword ? <Eye /> : <EyeSlash />}
          value={data.password_confirmation}
          onChange={handleChange}
        />
      </MasterPage>
    </>
  )
}

export default Main
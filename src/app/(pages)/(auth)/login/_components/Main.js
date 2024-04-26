'use client'
import React, { useState } from 'react'
import MasterPage from '@/components/shared/MasterPage'
import AbInputField from '@/components/inputfields/AbInputField';
import { Eye, EyeSlash, Sms } from 'iconsax-react';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/reduxtoolkit/slices/auth/LoginSlice';
import { addSnackbarData, resetSnackbar } from '@/reduxtoolkit/slices/SnakMessageSlice';
import { useRouter } from 'next/navigation';

const Main = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

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
  const validateForm = () => {
    const errors = {};
    if (!data.email) errors.email = 'Email is required';
    if (!data.password) errors.password = 'Password is required'
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const router = useRouter();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(loginUser(data)).then((result) => {
        if(!result.payload.token) {
          dispatch(resetSnackbar());
          dispatch(addSnackbarData({ message: result.payload?.response?.data?.message, variant: 'error' }));
          setData({ email: '', password: '' });
        } else {
          dispatch(resetSnackbar());
          router.push('/');
          dispatch(addSnackbarData({ message: result.payload?.message, variant: 'success' }));
        }
      });
    }
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
          error={errors.email}
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
          error={errors.password}
        />
      </MasterPage>
    </>
  )
}

export default Main
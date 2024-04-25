'use client'
import React, { useState } from 'react';
import MasterPage from '@/components/shared/MasterPage';
import AbInputField from '@/components/inputfields/AbInputField';
import { Eye, EyeSlash, Sms, User } from 'iconsax-react';
import { registerUser } from '@/reduxtoolkit/slices/auth/RegisterSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { addSnackbarData, resetSnackbar } from '@/reduxtoolkit/slices/SnakMessageSlice';

const Main = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const router = useRouter();
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!data.name) errors.name = 'Name is required';
    if (!data.email) errors.email = 'Email is required';
    if (!data.password) {
      errors.password = 'Password is required';
    } else if (data.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }
    if (!data.password_confirmation) errors.password_confirmation = 'Confirm Password is required';
    if (data.password !== data.password_confirmation) errors.password_confirmation = 'Passwords do not match';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(registerUser(data)).then((result) => {
        if (!result.payload.id) {
          dispatch(resetSnackbar());
          dispatch(addSnackbarData({ message: result.payload.message, variant: 'error' })); 
          setData({ name: data.name, email: '', password: data.password, password_confirmation: data.password_confirmation });
        } else {
          dispatch(resetSnackbar());
          router.push('/login');
          dispatch(addSnackbarData({ message: 'Account created successfully. Please login.', variant: 'success' })); 
          setData({name: '', email: '', password: '', password_confirmation: ''});
        }
      });
    }
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
          error={errors.name}
        />
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
        <AbInputField
          label='Confirm Password'
          type={showConfirmPassword ? 'text' : 'password'}
          name='password_confirmation'
          variant='standard'
          handleClick={handleClickShowConfirmPassword}
          icon={showConfirmPassword ? <Eye /> : <EyeSlash />}
          value={data.password_confirmation}
          onChange={handleChange}
          error={errors.password_confirmation}
        />
      </MasterPage>
    </>
  );
};

export default Main;
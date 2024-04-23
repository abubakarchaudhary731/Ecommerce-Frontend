'use client'
import React, { useState } from 'react'
import MasterPage from '@/components/shared/MasterPage'
import AbInputField from '@/components/inputfields/AbInputField';
import { TextField } from '@mui/material';

const Main = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        message: ''
    });

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
                title='Contact Us'
                description1='Need to get in touch?'
                description2='Either Fill out the form with your details and I will get back to you as soon as possible.'
                handleSubmit={handleSubmit}
                buttonLabel='Submit'
            >
                <AbInputField
                    label='Enter Your Name'
                    type='text'
                    name='name'
                    variant='standard'
                    value={data.name}
                    onChange={handleChange}
                />
                <AbInputField
                    label='Enter Your Email'
                    type='email'
                    name='email'
                    variant='standard'
                    value={data.email}
                    onChange={handleChange}
                />
                <TextField
                    id="message"
                    label="Enter Message"
                    multiline
                    rows={2}
                    variant="standard"
                    name='message'
                    value={data.message}
                    onChange={handleChange}
                />
            </MasterPage>
        </>
    )
}

export default Main
'use client';
import React, {useState} from 'react';
import AbInputField from '@/components/inputfields/AbInputField';


const MailForm = () => {
    const [email, setEmail] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted', email);
        setEmail('');
    }
    return (
        <>
            <form className='tw-mt-2' onSubmit={handleSubmit}>
                <AbInputField
                    color={'warning'}
                    label='Enter Your Email'
                    type='email'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant='standard'
                    style={{
                        '& input': {
                            color: 'white', // Set text color to white
                        },
                    }}
                />
            </form>
        </>
    )
}

export default MailForm
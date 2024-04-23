import AbButton from '@/components/inputfields/AbButton'
import AbInputField from '@/components/inputfields/AbInputField'
import { TextField } from '@mui/material'
import React from 'react'

const Main = () => {
    return (
        <>
            <div className='md:tw-flex tw-justify-center tw-items-center md:tw-h-screen tw-w-full md:tw-mt-[-80px] tw-gap-10'>
                <div className='md:tw-basis-[60%]'>
                    <h1 className='tw-text-2xl md:tw-text-5xl tw-font-bold tw-text-primary tw-mb-3 md:tw-mb-6'> Contact Us </h1>
                    <p> Need to get in touch? <br /> Either Fill out the form with your details and I will get back to you as soon as possible.</p>
                </div>
                <div className='md:tw-basis-[40%] tw-my-5 md:tw-my-0 tw-shadow-lg'>
                    <div className='tw-rounded-xl tw-bg-whitee tw-p-10'>
                        <form className='tw-flex tw-flex-col tw-gap-5'>
                            <AbInputField
                                label='Enter Your Name'
                                type='text'
                                name='name'
                                variant='standard'
                            />
                            <AbInputField
                                label='Enter Your Email'
                                type='email'
                                name='email'
                                variant='standard'
                            />
                            <TextField
                                id="message"
                                label="Enter Message"
                                multiline
                                rows={2}
                                variant="standard"
                            />
                            <div className='tw-w-24'>
                                <AbButton type='submit' label='Submit' className='tw-px-3' />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Main
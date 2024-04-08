'use client';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import AbButton from '@/components/inputfields/AbButton';
import Cart from './Cart';
import Checkout from './Checkout';

const steps = ['Add To Cart', 'Proceed to checkout', 'Confirm Order'];

export default function HorizontalLinearStepper() {
    const [activeStep, setActiveStep] = useState(1);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className='tw-my-10'>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    return (
                        <Step key={index}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        Your Order has been Placed Successfully.
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <div className='tw-w-24'>
                            <AbButton
                                label={'Reset'}
                                contained={true}
                                handleClick={handleReset}
                            />
                        </div>
                    </Box>
                </>
            ) : (
                <>

                    {activeStep === 0 && <Cart />}
                    {activeStep === 1 && <Cart />}
                    {activeStep === 2 && <Checkout />}

                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', pt: 2 }}>
                        <div>
                            <AbButton
                                label={'Back'}
                                disabled={activeStep === 1}
                                handleClick={handleBack}
                                contained={true}
                                className={'tw-px-4'}
                            />

                        </div>
                        <div>
                            <AbButton
                                label={activeStep === steps.length - 1 ? 'Confirm Order' : `Proceed to Checkout`}
                                handleClick={handleNext}
                                className={'tw-px-4'}
                            />
                        </div>
                    </Box>
                </>
            )}
        </div>
    );
}
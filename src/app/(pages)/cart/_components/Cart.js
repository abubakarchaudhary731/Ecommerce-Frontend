'use client'
import React from 'react';
import CartItem from '@/components/shared/CartItem';
import AbInputField from '@/components/inputfields/AbInputField'

const Cart = () => {
    return (
        <>
            <div className='tw-my-10'>
                <div className='lg:tw-flex'>

                    <div className='tw-basis-full lg:tw-pr-10'>
                        <CartItem />
                    </div>

                    <div className='tw-basis-96'>
                        <div className='tw-bg-whitee tw-h-[70vh] tw-rounded-xl tw-px-5 tw-py-10 '>
                            <div className='tw-flex tw-flex-col tw-gap-3'>
                                <div className='tw-flex tw-justify-between'>
                                    <p className='tw-text-icon tw-font-bold'> Subtotal: </p>
                                    <p>$0.00</p>
                                </div>
                                <div className='tw-flex tw-justify-between'>
                                    <p className='tw-text-icon tw-font-bold'> Shipping: </p>
                                    <p>$0.00</p>
                                </div>
                                <div className='tw-flex tw-justify-between'>
                                    <p className='tw-text-icon tw-font-bold'> Tax: </p>
                                    <p>$0.00</p>
                                </div>
                                <div className='tw-flex tw-justify-between tw-mb-3'>
                                    <p className='tw-text-icon tw-font-bold'> Discount: </p>
                                    <p>$0.00</p>
                                </div>
                                <hr className='tw-border-icon' />
                                <div className='tw-flex tw-justify-between'>
                                    <p className='tw-text-icon tw-font-bold'> Total: </p>
                                    <p>$0.00</p>
                                </div>
                                <hr className='tw-border-icon' />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart
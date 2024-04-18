import { ShoppingBag } from 'iconsax-react'
import Image from 'next/image'
import React from 'react'

const Main = () => {
    return (
        <>
            <div className='tw-flex tw-gap-2 tw-items-center'>
                <ShoppingBag className='tw-text-primary' />
                <p className='tw-font-bold tw-text-2xl'> Order Details </p>
            </div>
            <div className='tw-mt-5 tw-bg-whitee tw-rounded-xl'>
                <div className='tw-py-5 tw-px-6 tw-flex tw-gap-3 tw-flex-wrap'>
                    <p><b className='tw-text-icon'>Order ID:</b> 1234567 </p>
                    <p><b className='tw-text-icon'>Placed On:</b> 03jan2021 </p>
                    <p><b className='tw-text-icon'>Delivered on:</b> 03jan2025 </p>
                </div>
                <hr className='tw-border-icon' />
                <div className='tw-p-6'>
                    {
                        [1, 2, 3].map((item, index) => {
                            return (
                                <div className='tw-flex tw-justify-between tw-items-center tw-mt-2' key={index}>
                                    <div className='tw-flex tw-gap-2 tw-items-center'>
                                        <Image
                                            src="/images/static/emelie.jpg"
                                            alt="product"
                                            width={100}
                                            height={100}
                                            className='tw-rounded-full'
                                        />
                                        <div className='tw-flex tw-flex-col'>
                                            <p className='tw-text-lg tw-font-bold'>Emelie Berghmans</p>
                                            <p className='tw-text-icon tw-font-bold'>price X quantity</p>
                                        </div>

                                    </div>
                                    <p className='tw-text-primary tw-font-bold'>Write a Review</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='sm:tw-flex tw-mt-5 tw-gap-8'>
                <div className='sm:tw-basis-[50%] tw-bg-white tw-rounded-xl tw-p-6'>
                    <p className='tw-font-bold tw-text-icon tw-text-xl'>Shipping Address: </p>
                    <p className='tw-mt-4 tw-font-bold'> UserName </p>
                    <p className='tw-text-sm'>Address Detail</p>
                </div>

                <div className='sm:tw-basis-[50%] tw-bg-white tw-rounded-xl tw-p-6 tw-mt-4 sm:tw-mt-0'>
                    <p className='tw-font-bold tw-text-xl tw-text-icon'> Total Summary: </p>
                    <div className='tw-mt-4 tw-flex tw-justify-between tw-items-center'>
                        <p className='tw-text-icon'>Subtotal</p>
                        <p>$100</p>
                    </div>
                    <div className='tw-mt-2 tw-flex tw-justify-between tw-items-center'>
                        <p className='tw-text-icon'>Shipping Fee</p>
                        <p>$5</p>
                    </div>
                    <div className='tw-mt-2 tw-mb-4 tw-flex tw-justify-between tw-items-center'>
                        <p className='tw-text-icon'>Discount</p>
                        <p> -$10 </p>
                    </div>
                    <hr />
                    <div className='tw-mt-4 tw-flex tw-justify-between tw-items-center'>
                        <p className='tw-text-icon'>Discount</p>
                        <p className='tw-text-primary'> $1000 </p>
                    </div>
                    <p className='tw-text-primary tw-font-bold tw-mt-2 tw-text-center'> Pay with Cash </p>
                </div>
            </div>
        </>
    )
}

export default Main
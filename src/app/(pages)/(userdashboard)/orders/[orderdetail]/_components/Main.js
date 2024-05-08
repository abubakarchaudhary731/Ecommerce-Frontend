'use client';
import React, { useEffect } from 'react'
import { ShoppingBag } from 'iconsax-react'
import { useDispatch, useSelector } from 'react-redux'
import { orderHistoryDetail } from '@/reduxtoolkit/slices/order/ConfirmOrderSlice';
import { usePathname } from 'next/navigation';
import AbDateFormat from '@/components/inputfields/AbDateFormat';

const Main = () => {
    const dispatch = useDispatch();
    const pathName = usePathname();
    const param = pathName.split('/').pop();
    const paramInt = Number(param);
    const { orderDetail } = useSelector((state) => state.Orders);
    const { token } = useSelector((state) => state.LoginUser);

    useEffect(() => {
        if (token) {
            dispatch(orderHistoryDetail(paramInt));
        }
    }, [dispatch, token])

    // ******************* Make Expected Delivery Date ******************** //
    const getDeliveryDate = (dateString) => {
        const date = new Date(dateString);

        date.setDate(date.getDate() + 3);
        const options = { month: 'long', day: '2-digit', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);

        return formattedDate;
    };

    return (
        <>
            <div className='tw-flex tw-gap-2 tw-items-center'>
                <ShoppingBag className='tw-text-primary' />
                <p className='tw-font-bold tw-text-2xl'> Order Details </p>
            </div>
            <div className='tw-mt-5 tw-bg-whitee tw-rounded-xl'>
                <div className='tw-py-5 tw-px-6 tw-flex tw-gap-3 tw-flex-wrap'>
                    <p><b className='tw-text-icon'>Order ID:</b> {orderDetail.order_number} </p>
                    <p><b className='tw-text-icon'>Placed On:</b> {AbDateFormat(orderDetail.created_at)} </p>
                    <p><b className='tw-text-icon'>Delivered on:</b> {getDeliveryDate(orderDetail.created_at)} </p>
                </div>
                <hr className='tw-border-icon' />
                <div className='tw-p-6'>
                    {
                        (orderDetail.order_items)?.map((item, index) => {
                            return (
                                <div className='tw-flex tw-justify-between tw-items-center tw-mt-2' key={index}>
                                    <div className='tw-flex tw-gap-2 tw-items-center'>
                                        <img
                                            src={item.product.thumbnail}
                                            alt="product"
                                            // width={100}
                                            // height={100}
                                            className='tw-rounded-lg tw-w-24 tw-h-24 tw-object-cover'
                                        />
                                        <div className='tw-flex tw-flex-col'>
                                            <p className='tw-text-lg tw-font-bold'> {item.product.name} </p>
                                            <p className='tw-text-icon tw-font-bold'>{item.price} X {item.quantity}</p>
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
                    <p className='tw-text-sm'>{orderDetail.address.address}, {orderDetail.address.city}. </p>
                    <p className='tw-text-sm'>{orderDetail.address.phone} </p>
                </div>

                <div className='sm:tw-basis-[50%] tw-bg-white tw-rounded-xl tw-p-6 tw-mt-4 sm:tw-mt-0'>
                    <p className='tw-font-bold tw-text-xl tw-text-icon'> Total Summary: </p>
                    <div className='tw-mt-4 tw-flex tw-justify-between tw-items-center'>
                        <p className='tw-text-icon'>Subtotal</p>
                        <p> {orderDetail.total_price - 90} </p>
                    </div>
                    <div className='tw-my-2 tw-flex tw-justify-between tw-items-center'>
                        <p className='tw-text-icon'>Shipping Fee</p>
                        <p> 90 </p>
                    </div>
                    {/* <div className='tw-mt-2 tw-mb-4 tw-flex tw-justify-between tw-items-center'>
                        <p className='tw-text-icon'>Discount</p>
                        <p> -$10 </p>
                    </div> */}
                    <hr />
                    <div className='tw-mt-4 tw-flex tw-justify-between tw-items-center'>
                        <p className='tw-text-icon'>Total</p>
                        <p className='tw-text-primary'> {orderDetail.total_price} PKR </p>
                    </div>
                    {
                        orderDetail.payment_method &&
                        <p className='tw-text-primary tw-font-bold tw-mt-2 tw-text-center'> Pay with Cash </p>
                    }

                </div>
            </div>
        </>
    )
}

export default Main
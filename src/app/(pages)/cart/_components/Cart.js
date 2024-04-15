import React from 'react';
import CartItem from '@/components/shared/CartItem';

const Cart = () => {
    // Sample prices, you can replace these with your actual prices
    const prices = {
        subtotal: 100.00,
        shipping: 10.00,
        tax: 5.00,
        discount: 15.00,
    };

    const total = Object.values(prices).reduce((acc, curr) => acc + curr, 0);

    return (
        <div className='tw-my-10'>
            <div className='lg:tw-flex'>

                <div className='tw-basis-full lg:tw-pr-10'>
                    <CartItem />
                </div>

                <div className='tw-basis-96'>
                    <div className='tw-bg-whitee tw-min-h-[70vh] tw-rounded-xl tw-px-5 tw-py-10 '>
                        <div className='tw-flex tw-flex-col tw-gap-3'>
                            {Object.entries(prices).map(([label, price], index) => (
                                <div className='tw-flex tw-justify-between' key={index}>
                                    <p className='tw-text-icon tw-font-bold'> {label.charAt(0).toUpperCase() + label.slice(1)}: </p>
                                    <p>${price.toFixed(2)}</p>
                                </div>
                            ))}
                            <hr className='tw-border-icon' />
                            <div className='tw-flex tw-justify-between'>
                                <p className='tw-text-icon tw-font-bold'> Total: </p>
                                <p>${total.toFixed(2)}</p>
                            </div>
                            <hr className='tw-border-icon' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;

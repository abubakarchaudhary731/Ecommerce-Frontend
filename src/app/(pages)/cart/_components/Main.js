'use client';
import React, { useEffect, useState } from 'react';
import CartItem from '@/app/(pages)/cart/_components/CartItem';
import AbAlertDialog from '@/components/inputfields/AbAlertDialog';
import { useDispatch, useSelector } from 'react-redux';
import AbButton from '@/components/inputfields/AbButton';
import { useRouter } from 'next/navigation';
import { deleteCartItem, getCartItems, updateCartItem } from '@/reduxtoolkit/slices/cart/CartSlice';
import { addSnackbarData } from '@/reduxtoolkit/slices/SnakMessageSlice';
import { proceedToCheckout } from '@/reduxtoolkit/slices/cart/CheckoutSlice';

const Main = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.Cart);
    const { token } = useSelector((state) => state.LoginUser);
    const [openAlert, setOpenAlert] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [selectAll, setSelectAll] = useState(false);
    const [checkedItems, setCheckedItems] = useState(cartItems?.map(item => item.id));
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        if (token) {
            dispatch(getCartItems());
        }
    }, [dispatch, token])

    useEffect(() => {
        const initialQuantities = {};
        cartItems.forEach((item) => {
            initialQuantities[item.id] = item.quantity || 1;
        });
        setQuantities(initialQuantities);
    }, [cartItems]);

    // ********************* Add and Subtract Quantity ********************** //
    const handleAddition = (itemId) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [itemId]: (prevQuantities[itemId] || 1) + 1,
        }));
        dispatch(updateCartItem({ id: itemId, quantity: quantities[itemId] + 1 })).then((result) => {
            if (!result?.payload?.message) {
                dispatch(addSnackbarData({ message: "Something went wrong", variant: 'error' }));
                dispatch(getCartItems());
            } else {
                dispatch(getCartItems());
            }
        });
    };

    const handleSubtraction = (itemId) => {
        if (quantities[itemId] > 1) {
            setQuantities((prevQuantities) => ({
                ...prevQuantities,
                [itemId]: prevQuantities[itemId] - 1,
            }));
            dispatch(updateCartItem({ id: itemId, quantity: quantities[itemId] - 1 })).then((result) => {
                if (!result?.payload?.message) {
                    dispatch(addSnackbarData({ message: "Something went wrong", variant: 'error' }));
                    dispatch(getCartItems());
                } else {
                    dispatch(getCartItems());
                }
            });
        }
    };

    // ************ Handle Alert Open ******************** //
    const handleClickAlertOpen = (id) => {
        setOpenAlert(true);
        setDeleteId(id);
    };
    const handleClickAlertClose = () => {
        setOpenAlert(false);
        setDeleteId(null);
    };

    // ******************* Delete Cart Items ****************** //
    const handleOnConfirm = () => {
        dispatch(deleteCartItem(deleteId)).then((result) => {
            if (result?.payload?.message) {
                dispatch(getCartItems());
                dispatch(addSnackbarData({ message: result?.payload?.message, variant: 'success' }));
            } else {
                dispatch(addSnackbarData({ message: 'Something went wrong', variant: 'error' }));
            }
        });
        setOpenAlert(false);
        setDeleteId(null);
    };

    // **************** Handle Header Checkbox Change ******************** //
    const handleHeaderCheckboxChange = (event) => {
        setSelectAll(!selectAll);
        setCheckedItems(selectAll ? [] : cartItems.map((item) => item.id));
    };

    const handleBodyCheckboxChange = (e) => {
        const itemId = parseInt(e.target.value);
        setCheckedItems(prevCheckedItems => {
            if (e.target.checked) {
                return [...prevCheckedItems, itemId];
            } else {
                return prevCheckedItems.filter(item => item !== itemId);
            }
        });
    };

    // ******************** Calculate total of checked items *********************** //
    const checkedItemsTotal = checkedItems?.reduce((acc, itemId) => {
        const item = cartItems.find(item => item.id === itemId);
        if (item) {
            return acc + item.product.price * quantities[item.id];
        } else {
            return acc;
        }
    }, 0);

    // ******************** Proceed To Checkout *********************** //
    const handleCheckout = () => {
        if (checkedItems.length === 0) {
            dispatch(addSnackbarData({ message: 'Please select at least one item', variant: 'error' }));
            return;
        }
        dispatch(proceedToCheckout({ cart_ids: checkedItems })).then((result) => {
            if (!result?.payload?.products) {
                dispatch(addSnackbarData({ message: 'Something went wrong', variant: 'error' }));
            } else {
                router.push('/checkout')
            }
        });
    };

    return (
        <>
            {
                cartItems.length ? (
                    <div className='tw-my-10'>
                        <div className='lg:tw-flex'>

                            <div className='tw-basis-full lg:tw-pr-10'>
                                <CartItem
                                    cartItems={cartItems}
                                    quantities={quantities}
                                    handleAddition={handleAddition}
                                    handleSubtraction={handleSubtraction}
                                    handleClickAlertOpen={(id) => handleClickAlertOpen(id)}
                                    checkedItems={checkedItems}
                                    handleHeaderCheckboxChange={handleHeaderCheckboxChange}
                                    handleBodyCheckboxChange={handleBodyCheckboxChange}
                                />
                            </div>

                            <div className='tw-basis-96'>
                                <div className='tw-bg-whitee lg:tw-min-h-[70vh] tw-rounded-xl tw-px-5 tw-py-10 '>
                                    <div className='tw-flex tw-flex-col tw-gap-3'>
                                        {cartItems?.map((item, index) => (
                                            checkedItems.includes(item.id) && (
                                                <div className='tw-flex tw-justify-between' key={index}>
                                                    <p className='tw-text-icon tw-font-bold'>{item.product.name}</p>
                                                    <p>${(item.product.price * (quantities[item.id] || 1)).toFixed(2)}</p>
                                                </div>
                                            )
                                        ))}
                                        <hr className='tw-border-icon' />
                                        <div className='tw-flex tw-justify-between'>
                                            <p className='tw-text-icon tw-font-bold'> Total: </p>
                                            <p>${checkedItemsTotal.toFixed(2)}</p>
                                        </div>
                                        <hr className='tw-border-icon' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='tw-mt-5 tw-flex tw-flex-col tw-gap-2 sm:tw-flex-row sm:tw-justify-between'>
                            <AbButton
                                label='Continue Shopping'
                                contained={true}
                                className='tw-px-4 tw-max-w-60'
                                handleClick={() => router.push('/products')}
                            />
                            <AbButton
                                label={`Proceed to Checkout (${checkedItems.length})`}
                                className='tw-px-4 tw-max-w-60'
                                handleClick={handleCheckout}
                            // disabled={!checkedItems.length}
                            />
                        </div>
                        {/* Alert dialog for deletion confirmation */}
                        <AbAlertDialog
                            open={openAlert}
                            onConfirm={() => handleOnConfirm()}
                            handleClose={handleClickAlertClose}
                            title='Confirm Deletion'
                            description='Are you sure you want to delete this item?'
                        />
                    </div>
                ) : (
                    <div className='tw-my-20'>
                        <p className='tw-font-bold tw-text-center tw-text-3xl sm:tw-text-4xl '> Your Cart is Empty </p>
                        <div className='tw-flex tw-justify-center tw-mt-8'>
                            <AbButton
                                label='Continue Shopping'
                                contained={true}
                                className='tw-px-4 tw-max-w-52'
                                handleClick={() => router.push('/products')}
                            />
                        </div>
                    </div>
                )
            }
        </>
    );
}

export default Main;
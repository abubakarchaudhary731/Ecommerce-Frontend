import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; 
import ClearIcon from '@mui/icons-material/Clear';
import Checkbox from '@mui/material/Checkbox';
import AbButton from '../inputfields/AbButton';
import AbAlertDialog from '../inputfields/AbAlertDialog';
import { ArrowDown2, ArrowUp2 } from 'iconsax-react';

const CartItem = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [showTableBody, setShowTableBody] = useState(false);
    const [checkedItems, setCheckedItems] = useState([]);

    const toggleTableBody = () => {
        setShowTableBody(!showTableBody);
    };

    const handleHeaderCheckboxChange = (event) => {
        const { checked } = event.target;
        if (checked) {
            const ids = [1, 2, 3, 4, 5, 6, 7, 8].map((item) => item.toString());
            setCheckedItems(ids);
        } else {
            setCheckedItems([]);
        }
    };

    const handleBodyCheckboxChange = (id, isChecked) => {
        if (isChecked) {
            setCheckedItems((prevChecked) => [...prevChecked, id]);
        } else {
            setCheckedItems((prevChecked) => prevChecked.filter((itemId) => itemId !== id));
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div> {/* Enclose the entire content in a div */}
            <table className='tw-w-full'>
                <thead>
                    <tr className='tw-flex tw-gap-2'>
                        <td>
                            <Checkbox onChange={handleHeaderCheckboxChange} />
                        </td>
                        <td
                            className='tw-w-full tw-bg-whitee tw-rounded-xl tw-mb-3 tw-shadow-md tw-py-3 tw-px-8 tw-font-bold tw-flex tw-justify-between tw-items-center'
                            onClick={toggleTableBody}
                            style={{ cursor: 'pointer' }}
                        >
                            <span>Cart Products</span>
                            <span> {showTableBody ? <ArrowUp2 /> : <ArrowDown2 />} </span>
                        </td>
                    </tr>
                </thead>
                {showTableBody && (
                    <tbody className='tw-transition-opacity tw-duration-1000 tw-opacity-100'>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                            <tr key={index} className='tw-flex tw-gap-2 tw-items-center'>
                                <td>
                                    <Checkbox
                                        onChange={(e) => handleBodyCheckboxChange(item.toString(), e.target.checked)}
                                        checked={checkedItems.includes(item.toString())}
                                    />
                                </td>
                                <td className='tw-w-full tw-bg-whitee tw-rounded-xl sm:tw-flex tw-items-center tw-mb-3 tw-shadow-sm'>
                                    <div className='tw-basis-44'>
                                        <Image
                                            src={'/images/static/emelie.jpg'}
                                            alt='Product Image'
                                            width={130}
                                            height={100}
                                            className='tw-rounded-l-xl'
                                        />
                                    </div>
                                    <div className='tw-basis-full tw-pl-2 tw-pr-2 sm:tw-pr-10'>
                                        <div className='tw-flex tw-justify-between tw-items-center tw-text-lg'>
                                            <h1 className='tw-font-bold'>Product Name</h1>
                                            <ClearIcon className='tw-cursor-pointer tw-text-icon' onClick={handleClickOpen} />
                                        </div>
                                        <br />
                                        <div className='tw-text-sm tw-flex tw-justify-between tw-items-center tw-flex-wrap'>
                                            <div className='tw-flex tw-gap-2 tw-text-icon'>
                                                <p>$Price</p>
                                                <p><b>X</b> Quantity = Total</p>
                                            </div>
                                            <div className='tw-flex tw-gap-2 tw-items-center'>
                                                <button className='tw-w-8 tw-text-2xl tw-border tw-border-primary tw-rounded-lg hover:tw-bg-primary hover:tw-text-whitee'>-</button>
                                                <p>Quantity</p>
                                                <button className='tw-w-8 tw-text-2xl tw-border tw-border-primary tw-rounded-lg hover:tw-bg-primary hover:tw-text-whitee'>+</button>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                )}
            </table>
            <div className='tw-mt-10'>
                <div className='tw-flex tw-justify-between'>
                    <div></div>
                    <div>
                        <AbButton
                            label='Continue Shopping'
                            contained={true}
                            className='tw-px-4'
                            handleClick={() => router.push('/products')}
                        />
                    </div>
                </div>
            </div>
            <AbAlertDialog
                open={open}
                handleClose={handleClose}
                title='Confirm Deletion'
                description='Are you sure you want to delete this item?'
            />
        </div>
    );
};

export default CartItem;

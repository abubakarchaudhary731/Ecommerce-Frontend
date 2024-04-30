import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ClearIcon from '@mui/icons-material/Clear';
import Checkbox from '@mui/material/Checkbox';
import AbButton from '../../../../components/inputfields/AbButton';
import AbAlertDialog from '../../../../components/inputfields/AbAlertDialog';
import { ArrowDown2, ArrowUp2 } from 'iconsax-react';
import QuantityButtons from '../../../../components/shared/QuantityButtons';

const CartItem = ({
    cartItems,
    quantities,
    handleAddition,
    handleSubtraction,
    handleClickAlertOpen,
    checkedItems,
    handleHeaderCheckboxChange,
    handleBodyCheckboxChange
}) => {
    const router = useRouter();
    const [showTableBody, setShowTableBody] = useState(false);

    const toggleTableBody = () => {
        setShowTableBody(!showTableBody);
    };

    return (
        <div>
            <table className='tw-w-full'>
                {/* Table header */}
                <thead>
                    {/* Header row */}
                    <tr className='tw-flex tw-gap-2'>
                        <td>
                            <Checkbox
                                onChange={handleHeaderCheckboxChange}
                                checked={checkedItems.length ? true : false}
                            />
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
                {/* Table body */}
                {showTableBody && (
                    <tbody className='tw-transition-opacity tw-duration-1000 tw-opacity-100'>
                        {/* Mapping through cart items */}
                        {cartItems?.map((item, index) => (
                            <tr key={index} className='tw-flex tw-gap-2 tw-items-center'>
                                <td>
                                    {/* Checkbox for each item */}
                                    <Checkbox
                                        checked={Array.from(checkedItems).includes(item.id)}
                                        onChange={handleBodyCheckboxChange}
                                        value={item.id}
                                    />
                                </td>
                                <td className='tw-w-full tw-bg-whitee tw-rounded-xl sm:tw-flex tw-items-center tw-mb-3 tw-shadow-sm'>
                                    {/* Item details */}
                                    <div className='tw-basis-44'>
                                        <img
                                            src={item.product.thumbnail}
                                            alt='Product Image'
                                            width={130}
                                            height={100}
                                            className='tw-rounded-l-xl tw-w-full sm:tw-w-32 tw-h-28 tw-object-cover'
                                        />
                                    </div>
                                    <div className='tw-basis-full tw-pl-2 tw-pr-2 sm:tw-pr-10 tw-my-3 sm:tw-my-0'>
                                        <div className='tw-flex tw-justify-between tw-items-center tw-text-lg'>
                                            <h1 className='tw-font-bold'> {item.product.name} </h1>
                                            <ClearIcon className='tw-cursor-pointer tw-text-icon' onClick={() => handleClickAlertOpen(item.id)} />
                                        </div>
                                        <br />
                                        <div className='tw-text-sm tw-flex tw-justify-between tw-items-center tw-flex-wrap'>
                                            <div className='tw-flex tw-gap-2 tw-text-icon'>
                                                <p>${item.product.price}</p>
                                                <p><b>X</b> {quantities[item.id]} = ${item.product.price * (quantities[item.id] || 1)} </p>
                                            </div>
                                            {/* Quantity buttons */}
                                            <QuantityButtons
                                                quantity={quantities[item.id]}
                                                handleAddition={() => handleAddition(item.id)}
                                                handleSubtraction={() => handleSubtraction(item.id)}
                                            />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                )}
            </table>
        </div>
    );
};

export default CartItem;

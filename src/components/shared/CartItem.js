import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ClearIcon from '@mui/icons-material/Clear';
import Checkbox from '@mui/material/Checkbox';
import AbButton from '../inputfields/AbButton';
import AbAlertDialog from '../inputfields/AbAlertDialog';

const CartItem = () => {
    const router = useRouter();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <table className='tw-w-full'>
                <thead>
                    <tr>
                        <td>
                            <Checkbox />
                        </td>
                        <td className='tw-w-full tw-bg-whitee tw-rounded-xl sm:tw-flex tw-items-center tw-mb-3 tw-shadow-md tw-p-2 tw-font-bold'>
                            Cart  Products
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <Checkbox />
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
                        ))
                    }
                </tbody>
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
        </>
    );
}

export default CartItem;
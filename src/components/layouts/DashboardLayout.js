'use client'
import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { CardTick, Heart, Location, Personalcard, TruckTick } from 'iconsax-react';
import { useDispatch, useSelector } from 'react-redux';
import { getAddress } from '@/reduxtoolkit/slices/auth/AddressSlice';

const DashboardLayout = ({ children, counts }) => {
    const dispatch = useDispatch();
    const { userAddresses } = useSelector((state) => state.UserAddress);
    useEffect(() => {
        dispatch(getAddress());
    }, [dispatch, counts]);

    return (
        <div className='md:tw-flex tw-flex-col md:tw-flex-row tw-my-10'>
            <div className='tw-basis-80 tw-bg-white tw-rounded-xl tw-h-[70vh] tw-py-5'>
                <h1 className='tw-text-icon tw-text-xl tw-font-bold tw-px-5'> Dashboard </h1>
                {renderNavItem(TruckTick, 'Orders', counts?.orders)}
                {renderNavItem(Heart, 'Wishlist', counts?.wishlist)}
                <h1 className='tw-pt-6 tw-text-icon tw-text-lg tw-font-bold tw-px-5'> Account Settings </h1>
                {renderNavItem(Personalcard, 'Profile', counts?.profile)}
                {renderNavItem(Location, 'Addresses', userAddresses?.length)}
                {renderNavItem(CardTick, 'Payment-Methods', 2)}
            </div>
            <div className='tw-basis-full md:tw-pl-10 tw-mt-5 md:tw-mt-0'>
                {children}
            </div>
        </div>
    );
}

const renderNavItem = (Icon, label, count) => {
    const router = useRouter();
    const pathName = usePathname();
    let isActive = pathName === '/' + label.toLowerCase();

    if ((pathName === '/orders' || pathName === '/orderdetail') && label.toLowerCase() === 'orders') {
        isActive = true;
    } else if (pathName === '/orders' || pathName === '/orderdetail') {
        isActive = false;
    }

    return (
        <div className={`tw-flex tw-justify-between tw-mt-5 tw-items-center ${isActive && 'tw-border-l-4 tw-border-primary tw-text-primary'} tw-px-5 tw-cursor-pointer`} onClick={() => router.push('/' + label.toLowerCase())}>
            <div className='tw-flex tw-gap-2 tw-items-center'>
                <Icon className={isActive ? 'tw-text-primary' : 'tw-text-icon'} size={16} />
                <p className='tw-text-sm'>{label}</p>
            </div>
            <p className={`${isActive ? 'tw-text-primary' : 'tw-text-icon'} tw-text-sm`}>{count}</p>
        </div>
    );
}


export default DashboardLayout;

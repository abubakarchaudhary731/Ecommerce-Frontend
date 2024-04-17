'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { MdOutlineSegment, MdSearch, MdAccountCircle, MdShoppingCart } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';
import { User, ShoppingCart, SearchNormal1 } from 'iconsax-react';
import Backdrop from '@mui/material/Backdrop';
import css from '@/components/style.module.css';
import { usePathname, useRouter } from 'next/navigation';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const router = useRouter();
    const pathName = usePathname();

    const toggleSearch = () => {
        setIsMenuOpen(false);
        setShowSearch(!showSearch);
    };

    const isActive = (path) => {
        if (showSearch) {
            return path === '/search';
        } else {
            if (Array.isArray(path)) {
                return path.includes(pathName); // Return true if the path matches any of the given paths
            } else {
                return path === pathName; // Return true if the path matches the current path
            }
        }
    };

    const links = [
        { href: '/', label: 'Home' },
        { href: '/products', label: 'Products' },
        { href: '/contact-us', label: 'Contact Us' },
    ];

    return (
        <div className="tw-bg-white tw-text-textColor tw-w-full tw-fixed tw-top-0 tw-left-0 tw-right-0 tw-px-5 md:tw-px-12 xl:tw-px-24 tw-z-50 tw-border-b-2 tw-border-white">
            <nav className="tw-flex tw-justify-between tw-my-5 tw-items-center tw-flex-col md:tw-flex-row">
                <div className="tw-flex tw-items-center tw-justify-between tw-w-full">
                    <h1 className="tw-font-[1000] tw-text-lg sm:tw-text-3xl tw-tracking-[0.2rem] tw-cursor-pointer" onClick={() => router.push('/')}>AB Store</h1>
                    <div className='tw-flex tw-gap-8'>
                        <ul className="tw-flex lg:tw-gap-4 xl:tw-gap-8 tw-font-bold tw-text-lg tw-items-center">
                            {links.map(({ href, label }, index) => (
                                <li key={index} className="tw-hidden lg:tw-block">
                                    {href && (
                                        <Link href={href}>
                                            <span className={isActive(href) ? css.active : ''}>{label}</span>
                                        </Link>
                                    )}
                                </li>
                            ))}
                            <div className="tw-ml-8 tw-flex tw-items-center tw-space-x-4">
                                <SearchNormal1 className={isActive('/search') ? css.active : 'tw-cursor-pointer'} onClick={toggleSearch} />
                                <User className={isActive(['/profile', '/orders', '/wishlist', '/addresses', '/payment-methods', '/orderdetail']) ? css.active : 'tw-cursor-pointer'} onClick={() => router.push('/profile')} />
                                <div className="tw-relative tw-cursor-pointer" onClick={() => router.push('/cart')}>
                                    <ShoppingCart className={isActive('/cart') ? css.active : ''} />
                                    <div className="tw-absolute tw-bottom-4 tw-left-5 tw-w-5 tw-h-5 tw-flex tw-items-center tw-justify-center tw-bg-red-500 tw-text-white tw-rounded-full tw-text-xs">4</div>
                                </div>
                            </div>
                        </ul>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:tw-hidden tw-text-4xl tw-font-bold">
                            {isMenuOpen ? <IoMdClose /> : <MdOutlineSegment />}
                        </button>
                    </div>
                </div>
            </nav>

            {isMenuOpen && (
                <div className="lg:tw-hidden">
                    <ul className="tw-flex tw-flex-col tw-gap-3 tw-font-bold tw-text-xl tw-py-4">
                        {links.map(({ href, label }, index) => (
                            <li key={index}>
                                {href && (
                                    <Link href={href}>
                                        <span className={isActive(href) ? css.active : ''}>{label}</span>
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {showSearch && (
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={showSearch}
                    onClick={toggleSearch}
                >
                    <div className='tw-max-w-[1111px] xl:tw-min-w-[1111px] tw-px-8 xl:tw-px-0'>
                        <div onClick={(e) => e.stopPropagation()}>
                            Hello Search
                        </div>
                    </div>
                </Backdrop>
            )}
        </div>
    );
};

export default Header;

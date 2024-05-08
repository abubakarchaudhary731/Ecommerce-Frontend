'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MdOutlineSegment } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';
import { User, ShoppingCart, SearchNormal1 } from 'iconsax-react';
import { usePathname, useRouter, redirect } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { addSnackbarData } from '@/reduxtoolkit/slices/SnakMessageSlice';
import Backdrop from '@mui/material/Backdrop';
import css from '@/components/style.module.css';
import { logoutUser } from '@/reduxtoolkit/slices/auth/LoginSlice';
import { getCartItems } from '@/reduxtoolkit/slices/cart/CartSlice';
import { resetCheckoutState } from '@/reduxtoolkit/slices/cart/CheckoutSlice';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();
    const pathName = usePathname();
    // Protected Routes
    const param = pathName.split('/').pop();
    const protectedRoutes = ['/cart', '/checkout', '/profile', '/orders', `/orders/${param}`, '/wishlist', '/addresses', '/payment-methods'];
    const { token } = useSelector((state) => state.LoginUser);
    const { cartItems } = useSelector((state) => state.Cart);
    const cartItemCount = cartItems?.length;

    useEffect(() => {
        if (token) {
            dispatch(getCartItems());
        }
    }, [token, dispatch]);

    useEffect(() => {
        if (!token && protectedRoutes.includes(pathName)) {
            dispatch(addSnackbarData({ message: 'Please login first', variant: 'error' }));
            redirect('/login');
        }
    }, [token, pathName]);
    useEffect(() => {
        if (token && ['/login', '/register'].includes(pathName)) {
            dispatch(addSnackbarData({ message: 'You are already logged in', variant: 'success' }));
            redirect('/');
        }
    })

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
                if (path === null) return false; // Handle null paths
                if (path === '/products') {
                    // Check if the current path starts with "/products"
                    return pathName.startsWith('/products');
                } else {
                    return path === pathName; // Return true if the path matches the current path
                }
            }
        }
    };

    const handleLogout = () => {
        router.push('/login');
        dispatch(logoutUser());
        dispatch(resetCheckoutState());
        dispatch(addSnackbarData({ message: 'Logged out successfully', variant: 'success' }));
    };

    const links = [
        { href: '/', label: 'Home' },
        { href: '/products', label: 'Products' },
        { href: '/contact-us', label: 'Contact Us' },
        { href: token ? null : '/login', label: token ? 'Logout' : 'Login', onClick: token ? handleLogout : null }, // Adjusted based on authentication status
    ];

    return (
        <div className="tw-bg-white tw-text-textColor tw-w-full tw-fixed tw-top-0 tw-left-0 tw-right-0 tw-px-5 md:tw-px-12 xl:tw-px-24 tw-z-50 tw-border-b-2 tw-border-white">
            <nav className="tw-flex tw-justify-between tw-my-5 tw-items-center tw-flex-col md:tw-flex-row">
                <div className="tw-flex tw-items-center tw-justify-between tw-w-full">
                    <h1 className="tw-font-[1000] tw-text-lg sm:tw-text-3xl tw-tracking-[0.2rem] tw-cursor-pointer" onClick={() => router.push('/')}>AB Store</h1>
                    <div className='tw-flex tw-gap-8'>
                        <ul className="tw-flex md:tw-gap-4 xl:tw-gap-8 tw-font-bold tw-text-lg tw-items-center">
                            {links.map(({ href, label, onClick }, index) => (
                                <li key={index} className="tw-hidden md:tw-block">
                                    {href ? (
                                        <Link href={href}>
                                            <span className={isActive(href) ? css.active : ''} onClick={onClick}>{label}</span>
                                        </Link>
                                    ) : (
                                        <span onClick={onClick} className='tw-cursor-pointer'>{label}</span>
                                    )}
                                </li>
                            ))}
                            <div className="tw-ml-8 tw-flex tw-items-center tw-space-x-4">
                                <SearchNormal1 className={isActive('/search') ? css.active : 'tw-cursor-pointer'} onClick={toggleSearch} />
                                <User className={isActive(['/profile', '/orders', '/wishlist', '/addresses', '/payment-methods', `/orders/${param}`]) ? css.active : 'tw-cursor-pointer'} onClick={() => router.push('/profile')} />
                                <div className="tw-relative tw-cursor-pointer" onClick={() => router.push('/cart')}>
                                    <ShoppingCart className={isActive('/cart') ? css.active : ''} />
                                    {
                                        token && cartItemCount > 0 && <div className="tw-absolute tw-bottom-4 tw-left-5 tw-w-5 tw-h-5 tw-flex tw-items-center tw-justify-center tw-bg-red-500 tw-text-white tw-rounded-full tw-text-xs"> {cartItemCount} </div>
                                    }
                                </div>
                            </div>
                        </ul>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:tw-hidden tw-text-4xl tw-font-bold">
                            {isMenuOpen ? <IoMdClose /> : <MdOutlineSegment />}
                        </button>
                    </div>
                </div>
            </nav>

            {isMenuOpen && (
                <div className="md:tw-hidden">
                    <ul className="tw-flex tw-flex-col tw-gap-3 tw-font-bold tw-text-xl tw-py-4">
                        {links.map(({ href, label, onClick }, index) => (
                            <li key={index}>
                                {href && (
                                    <Link href={href}>
                                        <span className={isActive(href) ? css.active : ''} onClick={onClick}>{label}</span>
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
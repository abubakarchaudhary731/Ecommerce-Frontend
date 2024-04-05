import React, { useState } from 'react';
import { MdOutlineKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import styles from '@/components/style.module.css';

const SideBar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
        <div className='tw-bg-whitee tw-rounded-xl tw-px-5 tw-pt-8 lg:tw-min-h-[80vh]'>
            <div className='tw-font-bold tw-cursor-pointer'>
                All
            </div>
            <br />
            <hr />
            <br />
            <div className='tw-flex tw-justify-between tw-items-center tw-cursor-pointer' onClick={toggleDropdown}>
                <p className='tw-font-bold tw-mb-3 lg:tw-mb-0'>Categories</p>
                {isDropdownOpen ? <MdKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}
            </div>
            {isDropdownOpen && (
                <div className={styles.dropdownContent}>
                    <div>
                        <ul>
                            {
                                list.map((item) => (
                                    <li key={item} className='tw-cursor-pointer tw-text-sm'>
                                        <p>Category {item}</p>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SideBar;

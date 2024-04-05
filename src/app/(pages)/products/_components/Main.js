'use client';
import React, { useState } from 'react'
import SideBar from '@/components/layouts/SideBar'
import ProductData from '@/components/ProductData';
import ProductCard from '@/components/shared/ProductCard';
import AbPagination from '@/components/inputfields/AbPagination';
import AbInputField from '@/components/inputfields/AbInputField';

const Main = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const totalPages = Math.ceil(ProductData?.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calculate current page items based on currentPage
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = ProductData?.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <>
            <div className='tw-my-10'>
                <div className='lg:tw-flex'>
                    <div className='tw-basis-96 tw-mb-10 lg:tw-mb-0'>
                        <SideBar />
                    </div>
                    <div className='tw-basis-full lg:tw-pl-10'>
                        <div className='tw-flex tw-justify-between tw-items-center tw-mb-4'>
                            <p className='tw-font-bold tw-text-2xl'> ALL Products </p>
                            <div className='tw-w-52'>
                                <AbInputField
                                    label='Search'
                                    type='search'
                                    name='search'
                                    variant={'outlined'}
                                />
                            </div>
                        </div>
                        <div className='tw-flex tw-justify-between tw-flex-wrap tw-gap-5'>
                            {
                                currentData.map((item, index) => (
                                    <div key={index} className='tw-w-full sm:tw-w-[290px] xl:tw-w-[345px]'>
                                        <ProductCard
                                            item={item}
                                        />
                                    </div>
                                ))
                            }

                        </div>
                        {
                            totalPages > 1 && (
                                <div className='tw-mt-8'>
                                    <AbPagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Main
'use client';
import React, { useEffect, useState } from 'react'
import SideBar from '@/components/layouts/SideBar'
import ProductData from '@/components/ProductData';
import ProductCard from '@/components/shared/ProductCard';
import AbPagination from '@/components/inputfields/AbPagination';
import AbInputField from '@/components/inputfields/AbInputField';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '@/reduxtoolkit/slices/products/ProductSlice';

const Main = () => {
    const [currentPage, setCurrentPage] = useState(1);

    //Get Products
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch]);
    const { products } = useSelector((state) => state.Products);

    //Apply pagination
    const itemsPerPage = 6;
    const totalPages = Math.ceil(products?.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calculate current page items based on currentPage
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = products?.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <>
            <div className='tw-my-10'>
                <div className='lg:tw-flex'>
                    <div className='tw-basis-96 tw-mb-10 lg:tw-mb-0'>
                        <SideBar />
                    </div>
                    <div className='tw-basis-full lg:tw-pl-10'>
                        <div className='sm:tw-flex tw-justify-between tw-items-center tw-mb-4'>
                            <p className='tw-font-bold tw-text-2xl'> ALL Products </p>
                            <div className='tw-w-52 tw-mt-2 sm:tw-mt-0'>
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
                                currentData?.map((item, index) => (
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
import AppLayout from '@/components/theme/AppLayout';
import React from 'react'
import Main from './_components/Main';

const ProductDetail = () => {
    return (
        <>
            <AppLayout>
                <Main />
            </AppLayout>
        </>
    )
}

export default ProductDetail

export function generateMetadata() {
    return {
        title: 'Product Detail Page',
        description: 'Product Detail Page',
    };
}
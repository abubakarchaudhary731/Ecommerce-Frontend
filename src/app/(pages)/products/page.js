import AppLayout from '@/components/theme/AppLayout';
import React from 'react'
import Main from './_components/Main';

const Products = () => {
    return (
        <>
            <AppLayout>
                <Main />
            </AppLayout>
        </>
    )
}

export default Products

export function generateMetadata() {
    return {
        title: 'Product Page',
        description: 'Products Page',
    };
}
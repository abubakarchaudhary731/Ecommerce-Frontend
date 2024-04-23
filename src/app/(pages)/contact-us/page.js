import React from 'react'
import AppLayout from '@/components/theme/AppLayout';
import Main from './_componenets/Main';

const Contact = () => {
    return (
        <>
            <AppLayout>
                <Main />
            </AppLayout>
        </>
    )
}

export default Contact

export function generateMetadata() {
    return {
        title: 'Contact Page',
        description: 'Contact-us Page',
    };
}
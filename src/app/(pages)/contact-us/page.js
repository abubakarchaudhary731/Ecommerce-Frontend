import AppLayout from '@/components/theme/AppLayout';
import React from 'react'

const Contact = () => {
    return (
        <>
            <AppLayout>
                This is Contact Us page
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
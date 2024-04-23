import React from 'react'
import AppLayout from '@/components/theme/AppLayout';
import Main from './_components/Main';

const Register = () => {
    return (
        <>
            <AppLayout>
                <Main />
            </AppLayout>
        </>
    )
}

export default Register

export function generateMetadata() {
    return {
        title: 'Register Your Account',
        description: 'Please Register Your Account',
    };
}
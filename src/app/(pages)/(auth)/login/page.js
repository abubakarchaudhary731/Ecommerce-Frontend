import React from 'react'
import AppLayout from '@/components/theme/AppLayout';
import Main from './_components/Main';

const Login = () => {
    return (
        <>
            <AppLayout>
                <Main />
            </AppLayout>
        </>
    )
}

export default Login

export function generateMetadata() {
    return {
        title: 'Login Your Account',
        description: 'Please Login Your Account',
    };
}
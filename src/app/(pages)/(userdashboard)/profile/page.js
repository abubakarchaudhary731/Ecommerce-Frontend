import AppLayout from '@/components/theme/AppLayout';
import React from 'react'
import Main from './_components/Main';

const Profile = () => {
    return (
        <>
            <AppLayout>
                <Main />
            </AppLayout>
        </>
    )
}

export default Profile

export function generateMetadata() {
    return {
        title: 'Profile Page',
        description: 'Profile Page',
    };
}
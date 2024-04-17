import React from 'react'
import AppLayout from '@/components/theme/AppLayout';
import DashboardLayout from '@/components/layouts/DashboardLayout'
import Main from './_components/Main';


const Profile = () => {
    return (
        <>
            <AppLayout>
                <DashboardLayout>
                    <Main />
                </DashboardLayout>
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
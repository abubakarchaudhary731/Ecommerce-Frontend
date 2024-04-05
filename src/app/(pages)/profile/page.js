import AppLayout from '@/components/theme/AppLayout';
import React from 'react'

const Profile = () => {
    return (
        <>
            <AppLayout>
                <div>Profile</div>
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
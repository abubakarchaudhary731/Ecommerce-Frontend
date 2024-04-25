'use client'
import React from 'react'
import AbSnackbar from '@/components/inputfields/AbSnackbar';
import { useDispatch, useSelector } from 'react-redux';
import { resetSnackbar } from '@/reduxtoolkit/slices/SnakMessageSlice';

const RanderSnakbar = () => {
    const { snackbarData } = useSelector((state) => state.SnakMessages);
    const dispatch = useDispatch();

    const handleClose = () => {
        // Dispatch an action to reset the Snackbar state to null
        dispatch(resetSnackbar());
    };

    return (
        <>
            {snackbarData && (
                <AbSnackbar
                    open={true}
                    handleClose={handleClose}
                    message={snackbarData.message}
                    variant={snackbarData.variant}
                />
            )}
        </>
    )
}

export default RanderSnakbar
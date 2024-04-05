import Typography from '@mui/material/Typography';
import Link from 'next/link';
import React from 'react'

const CopyRight = () => {
    return (
        <Typography variant="body2" align="center">
            {'Copyright © '}
            <Link color="inherit" href="/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default CopyRight
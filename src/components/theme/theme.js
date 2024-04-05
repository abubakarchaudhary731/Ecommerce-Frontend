'use client'
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
    palette: {
        primary: {
            main: '#D23F57',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#2B3445',
        },
        error: {
            main: '#D32F2F',
        },
        warning: {
            main: '#E3A008',
        },
        success: {
            main: '#05F724',
        },
        background: {
            default: '#D8E0E9',
        },
        text: {
        },
    },
});

export default theme;

// @ts-nocheck
import {RouterProvider} from "react-router-dom";

import {ThemeProvider, createTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';

import router from './router';
import ErrorBoundary from "./ErrorBoundary";

declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        customMain: true;
    }
}

const theme = createTheme({
    typography: {
        button: {
            textTransform: 'none',
            fontWeight: 400,
        },
    },
    components: {
        MuiButton: {
            variants: [
                {
                    props: {variant: 'customMain'},
                    style: {
                        minWidth: 'min-content',
                        minHeight: '3rem',
                        borderRadius: '12px',
                        padding: '12px 22px',
                        justifyContent: 'center',
                        display: 'flex',
                        fontSize: '1rem',
                        color: 'white',
                        backgroundColor: 'rgba(255,255,255,0.12)',
                        '&:hover': {
                            cursor: 'pointer',
                            backgroundColor: 'rgba(255,255,255,0.06)',
                            color: '#ffffff'
                        },
                        '&:active': {
                            backgroundColor: 'rgba(255,255,255,0.09)',
                        }
                    }
                }
            ],
            defaultProps: {
                sx: {
                    minHeight: '40px'
                }
            }
        },
    }
});

function App() {
    return (
        <ErrorBoundary>
            <ThemeProvider theme={theme}>
                <Box width='100%' height='100vh' position='relative'>
                    <RouterProvider router={router}/>
                </Box>
            </ThemeProvider>
        </ErrorBoundary>
    );
}

export default App;

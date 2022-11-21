import React from 'react'
import { useNavigate } from "react-router-dom"
import './Footer.scss'

// material UI
import {
    AppBar,
    Container,
    Toolbar,
    Box,
    Link,
    Button
} from '@mui/material';


const pages = [
    { alt: 'Link1', href: '/link1' },
    { alt: 'Link2', href: '/link2' },
];

function Footer() {
    const navigate = useNavigate();

    return (
        <AppBar position="static" className='footer'>
            <Container maxWidth="xl">
                <Toolbar disableGutters className='footer__content'>
                    <Box className='footer__content__links'>
                        {pages.map((page) => (
                            <Button
                                key={page.alt}
                                onClick={() => navigate(page.href)}
                                sx={{ my: 2, color: 'black', display: 'block' }}>
                                {page.alt}
                            </Button>
                        ))}
                    </Box>
                    <Box className='footer__content__copyright' sx={{ display: { xs: 'none', md: 'flex' } }}>
                        &copy; 2023 {'XYZ'} Wszystkie prawa zastrzeżone
                    </Box>
                    <Box className='footer__content__socials'>
                        <Link href='#' underline="none">
                            <i className="fa-brands fa-google-play"></i>
                        </Link>
                        <Link href='#' underline="none">
                            <i className="fa-brands fa-facebook-square"></i>
                        </Link>
                        <Link href='#' underline="none">
                            <i className="fa-brands fa-instagram-square"></i>
                        </Link>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Footer
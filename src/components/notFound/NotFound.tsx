import React from 'react'
import "./NotFound.scss"
import { Button, Container } from "@mui/material";
import { useNavigate } from 'react-router-dom';

function NotFound() {
    const navigate = useNavigate()

    return (
        <Container className='not_found' sx={{ display: 'flex', flexDirection: { md: 'row', xs: 'column' } }} maxWidth="lg">
            <div className='not_found__code'>
                <span className='code__part code__part--theme'>
                    4
                </span>
                <span className='code__part'>0</span>
                <span className='code__part code__part--theme'>
                    4
                </span>
            </div>
            <div>
                <h1 className='not_found__header'>
                    Oops! Strona nie znaleziona.
                </h1>
                <Button className='not_found__button' onClick={() => navigate('/')}>
                    Powrót
                </Button>
            </div>
        </Container>
    )
}

export default NotFound
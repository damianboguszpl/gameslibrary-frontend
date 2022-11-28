import { Box, Container, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import axios from '../../api/axios.js';
import './Details.scss'

function Details() {

    const navigate = useNavigate()

    const { id } = useParams()
    const [app, setApp] = useState<any>()

    useEffect(() => {
        axios.get(`/app/${id}`).then((response) => {

            if (response.data.id != id) {
                navigate('/')
            }
            else {
                response.data.publishers = JSON.parse(response.data.publishers)
                response.data.developers = JSON.parse(response.data.developers)
                setApp(response.data)
            }
        })
    }, [])

    return (
        <Container maxWidth="md" className='details'>
            <Paper elevation={4} className='details__card'>
                <Box className='details__card__header'>
                    {app?.title}
                </Box>
                <Box className='details__card__content'>
                    <img
                        className='content__image'
                        src={app?.screenshotLink}
                        alt={app?.title} />
                    <p
                        className='content__description'
                        dangerouslySetInnerHTML={{ __html: app?.description }}>
                    </p>
                </Box>
                <Box className='details__card__footer'>
                    <strong>
                        Publishers: {app?.publishers.map((publisher: string, key: number) => (key === 0 ? `${publisher}` : `, ${publisher}`))}
                    </strong>
                    <br />
                    <strong>
                        Developers: {app?.developers.map((developer: string, key: number) => (key === 0 ? `${developer}` : `, ${developer}`))}
                    </strong>
                </Box>
            </Paper>
        </Container>
    )
}

export default Details
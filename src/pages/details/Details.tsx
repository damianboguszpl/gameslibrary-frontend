import { Box, Container, Paper } from '@mui/material';
import React, { Suspense, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../../api/axios.js';
import './Details.scss';
const Favorites = React.lazy(() => import('../../components/favorites/Favorites'));

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container maxWidth="md" className='details'>
            <Paper elevation={4} className='details__card'>
                <Suspense fallback={'Loading...'}><Favorites app_id={app?.id} /></Suspense>
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
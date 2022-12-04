import { Box, Container, Paper, Button, Stack } from '@mui/material';
import React, { Suspense, useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { AuthContext } from '../../context/AuthContext'
import axios from '../../api/axios.js';
import './Details.scss';
import '../reviewList/ReviewList.scss'
const Favorites = React.lazy(() => import('../../components/favorites/Favorites'));

function Details() {
    const navigate = useNavigate()
    const axiosPrivate = useAxiosPrivate()

    const context = useContext(AuthContext)
    const { id } = useParams()
    const [app, setApp] = useState<any>()
    const [review, setReview] = useState<any>()
    const [allReviews, setAllReviews] = useState<any[]>([])

    useEffect(() => {
        axios.get(`/app/${id}`).then((response) => {

            if (response.data.id != id) {
                navigate('/')
            }
            else {
                response.data.publishers = JSON.parse(response.data.publishers)
                response.data.developers = JSON.parse(response.data.developers)
                setApp(response.data)

                axiosPrivate.get(`/review/user/${context?.authState.id}/app/${id}`, {
                    withCredentials: false
                }).then((response) => {
                    if (response.status === 200)
                        setReview(response.data)
                })
                axiosPrivate.get(`/review/app/${id}`, {
                    withCredentials: false
                }).then((response) => {
                    if (response.status === 200)
                        setAllReviews(response.data)
                    else setAllReviews([])
                    console.log(response.data)
                })
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context])

    return (
        <Container maxWidth="md" className='details'>
            <Paper elevation={4} className='details__card'>
                <Suspense fallback={'Loading...'}><Favorites app_id={app?.id} /></Suspense>
                <Suspense fallback={'Loading...'}>
                    {!review && (
                        <Button className='add_review__button' variant='contained' type='submit' onClick={() => { navigate(`/new-review/${id}`) }}>
                            Add a review
                        </Button>
                    )}
                </Suspense>
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
            <Paper className='details__card details__card--top_margin'>
                <Box className='details__card__header'>
                    Recenzje
                </Box>
                <Stack className='review_list' spacing={3}>
                    {allReviews?.map((value, key) =>
                        <Paper className='review_list__row' key={key} elevation={3} >
                            <img alt={value.app.title} src={value.app.screenshotLink} className='review_list__row__image' loading="lazy" onClick={() => navigate(`/details/${value.app.id}`)} />
                            <div className='review_list__row__details'>
                                <h1 className='review_list__row__title' onClick={() => navigate(`/details/${value.app.id}`)}>{value.app.title}</h1>
                                <div>
                                    <p className='review_list_row_rating'><strong>User: </strong>{value.user.login}</p>
                                    <p className='review_list_row_rating'><strong>Rating: </strong>{value.rating}</p>
                                    <strong>Text Review: </strong>
                                    <p className='review_list_row_text_review'>{value.textReview}</p>
                                </div>
                            </div>
                        </Paper>
                    )}
                </Stack>
            </Paper>
        </Container>
    )
}

export default Details
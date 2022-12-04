import { Stack, Paper, Button, Container } from '@mui/material'
import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import './ReviewList.scss'

function ReviewList() {
    const navigate = useNavigate()
    const context = useContext(AuthContext)
    const axiosPrivate = useAxiosPrivate()

    const [reviews, setReviews] = useState<any[]>([])
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        axiosPrivate.get(`/review/user/${context?.authState.id}`, {
            withCredentials: false
        }).then((response) => {
            if (response.status === 200) setReviews(response.data)
            else setReviews([])
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context, refresh])

    const deleteReview = (id: number) => {
        if (context?.authState.isLogged) {
            axiosPrivate.delete(`review/${id}`, {
                withCredentials: false
            }).then((response) => {
                setTimeout(() => {
                    (refresh ? setRefresh(false) : setRefresh(true))
                }, 50)
            })
        }
    }

    return (
        <Container>
            <Stack className='review_list' spacing={3}>
                {reviews?.map((value, key) =>
                    <Paper className='review_list__row' key={key} elevation={3} >
                        <img alt={value.app.title} src={value.app.screenshotLink} className='review_list__row__image' loading="lazy" onClick={() => navigate(`/details/${value.app.id}`)} />
                        <div className='review_list__row__details'>
                            <h1 className='review_list__row__title' onClick={() => navigate(`/details/${value.app.id}`)}>{value.app.title}</h1>
                            <div>
                                {/* <p className='review_list__row__description'>{value.app.shortDescription}</p> */}
                                <p className='review_list_row_rating'><strong>Rating: </strong>{value.rating}</p>
                                <strong>Text Review: </strong>
                                <p className='review_list_row_text_review'>{value.textReview}</p>
                            </div>
                        </div>
                        <div className='review_list__row__details'>
                            <Button className='review__button'
                                variant='contained'
                                fullWidth
                                onClick={() => {
                                    navigate(`/edit-review/${value.id}`)
                                }}
                            >
                                Edit
                            </Button>
                            <Button className='review__button'
                                variant='contained'
                                fullWidth
                                onClick={() => deleteReview(value.id)}
                            >
                                Delete
                            </Button>
                        </div>
                    </Paper>
                )}
            </Stack>
        </Container>
    )
}

export default ReviewList
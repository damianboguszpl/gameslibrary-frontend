import {
    Container,
    TextField,
    Button,
    Paper,
    Box,
} from "@mui/material";
import './NewReview.scss'
import { useFormik } from "formik"
import { NewReviewValidationSchema } from "../../validations/NewReviewValidationSchema";
import axios from '../../api/axios.js';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useParams } from 'react-router-dom'

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function NewReview() {
    const { id } = useParams()
    const [app, setApp] = useState<any>()
    const navigate = useNavigate()

    const context = useContext(AuthContext);
    const axiosPrivate = useAxiosPrivate();
    const [refresh, setRefresh] = useState(false)

    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("")
    const [isAlertSuccess, setIsAlertSuccess] = useState(true);
    const showAlert = () => { setOpen(true); };

    const closeAlert = function (_event: any, reason: string) {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    useEffect(() => {
        axios.get(`/app/${id}`).then((response) => {
            if (response.data.id != id) {
                alert("app does not exist")
                navigate('/')
            }
            else {
                response.data.publishers = JSON.parse(response.data.publishers)
                response.data.developers = JSON.parse(response.data.developers)
                setApp(response.data)
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const formik = useFormik({
        initialValues: {
            textReview: "",
            rating: 1
        },
        validationSchema: NewReviewValidationSchema,
        onSubmit: (values) => {
            if(context?.authState.isLogged) {
                const data = {
                    appId: id,
                    // userId: context?.authState.id,
                    userEmail: context?.authState.email,
                    textReview: values.textReview,
                    rating: values.rating
                }
                // console.log(data)
    
                const postReview = async () => {
                    await axiosPrivate.post('/review', data, {
                        withCredentials: false
                    }).then((response) => {
                        setIsAlertSuccess(true)
                        setAlertMessage("New Review added!")
                        showAlert()
                        if(response.data.code === "NEW_REVIEW_CREATED") {
                            setTimeout(() => {
                                navigate(`/details/${id}`)
                            },6100)
                        }

                    }).catch(({ response }) => {
                        if(response.status !== 201) {
                            setIsAlertSuccess(false)
                            setAlertMessage(response.data.message)
                            showAlert()
                            if(response.data.code === "REVIEW_ALREADY_EXISTS") {
                                setTimeout(() => {
                                    navigate(`/details/${id}`)
                                },6100)
                            }
                        }
                    });
                }
                postReview();
                setTimeout(() => {
                    (refresh ? setRefresh(false) : setRefresh(true))
                }, 50)
            } else {
                alert("You must be logged in to add reviews")
                navigate('/')
            }

        }
    });

    return (
        <Container maxWidth="sm" className='new_review'>
            <Snackbar open={open} autoHideDuration={6000} onClose={closeAlert}>
                <Alert severity={isAlertSuccess ? 'success' : 'error'} sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
            <Paper elevation={4} className='new_review__card'>
                <Box className='new_review__card__header'>
                    Add new Review
                </Box>
                <Box className='new_review__card__header_app_title' >
                    {app ? app.title : ""}
                </Box>
                <Box className='new_review__card__content'>
                    <form onSubmit={formik.handleSubmit}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <TextField
                                className='new_review__content__input'
                                id="Rating-select"
                                name='rating'
                                label="Rating"
                                fullWidth
                                autoFocus
                                value={formik.values.rating}
                                onChange={formik.handleChange}
                                error={formik.touched.rating && Boolean(formik.errors.rating)}
                                helperText={formik.touched.rating && formik.errors.rating}
                                type="number"
                                InputProps={{
                                    inputProps: { 
                                        max: 5, min: 1 
                                    }
                                }}
                                >
                            </TextField>
                        </div>
                        <TextField className='new_review__content__input'
                            variant='outlined'
                            label='Text Review'
                            fullWidth
                            name='textReview'
                            value={formik.values.textReview}
                            onChange={formik.handleChange}
                            error={formik.touched.textReview && Boolean(formik.errors.textReview)}
                            helperText={formik.touched.textReview && formik.errors.textReview}
                            multiline
                            rows={3}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        </div>
                        <Button className='new_review__content__button'
                            variant='contained'
                            fullWidth
                            type='submit'>
                            dodaj
                        </Button>
                    </form>
                </Box>
            </Paper>
        </Container >
    )
}

export default NewReview
import {
    Container,
    TextField,
    Button,
    Paper,
    Link,
    Box
} from "@mui/material";

import { useFormik } from "formik"
import { LoginValidationSchema } from "../../validations/LoginValidationSchema";
import './Login.scss'
import axios from '../../api/axios.js';
import { useContext, useEffect } from 'react';
// import { useState } from "react";
import { AuthContext } from '../../context/AuthContext';
// import useAxiosPrivate from "../../hooks/useAxiosPrivate";
// import useRefreshToken from "../../hooks/useRefreshToken";
import { useNavigate } from "react-router-dom"

function Login() {
    const navigate = useNavigate();

    const context = useContext(AuthContext);
    // const [users, setUsers] = useState();
    // const axiosPrivate = useAxiosPrivate();
    // const refresh = useRefreshToken();

    useEffect(() => {                       // przekierowanie dla zalogowanego usera próbującego wejść na /login ; rozwiązanie tymczasowe
        console.log("----login")
        console.log(context?.authState);
        if(context?.authState.isLogged) {
            // navigate('/')
            window.location.pathname = "/"
        }
        // console.log("user: "+user)
    }, [context])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: LoginValidationSchema,
        onSubmit: (values) => {
            axios.post("/auth/login", values,
                {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    // withCredentials: true
                }
            ).then((response) => {
                // if(response.)
                // console.log(response)
                localStorage.setItem("accessToken", response.data.token)
                axios.get(`/user/email/${values.email}`, {
                    headers: { accessToken: localStorage.getItem("accessToken"),
                    'Authorization' : `Bearer ${response.data.access_token}` },
                })
                .then((response2) => {
                    if(response2?.data != null) {
                        // console.log(response2.data)
                        localStorage.setItem("accessToken", response.data.access_token)
                        localStorage.setItem("refreshToken", response.data.refresh_token)
                        context?.setAuthState(prev => {
                            // console.log(JSON.stringify(prev));
                            // console.log(response.data.accessToken);
                            // console.log(response.data)
                            return {
                                ...prev,
                                isLogged: true,
                                accessToken: response.data.access_token,
                                refreshToken: response.data.refresh_token,
                                id: response2.data.id,
                                email: response2.data.email,
                                roles: response2.data.roles
                                // firstname: response.data.user.firstname,
                                // lastname: response.data.user.lastname,
                                // roleId: response.data.RoleId
                            }
                        });
                        setTimeout(() => {
                            console.log(context?.authState)
                        }, 600)
                    }
                });

                // axios.get(`/user/`, {
                //     headers: { 'Authorization' : `Bearer ${response.data.access_token}` },
                // }).then( (response) => {
                //     console.log(response)
                // })

                // window.location.pathname = "/"
                // window.location.href = "/"
            }).catch(({ response }) => {
                // if (response?.data?.error === 'Użytkownik nie istnieje')
                //     formik.setFieldError('email', response.data.error)
                // if (response?.data?.error === 'Hasło jest niepoprawne')
                //     formik.setFieldError('password', response.data.error)
                // else {
                //     console.log("some error")
                // }
                formik.setFieldError('email', "Dane nie są poprawne")
                formik.setFieldError('password', "Dane nie są poprawne")
            })
        }
    });

    return (
        <Container maxWidth="sm" className='login'>
            <Paper elevation={4} className='login__card'>
                <Box className='login__card__header'>
                    login
                </Box>
                <Box className='login__card__content'>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField className='login__content__input'
                            variant='outlined'
                            label='Adres email'
                            fullWidth
                            autoComplete='email'
                            autoFocus
                            name='email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField className='login__content__input'
                            variant='outlined'
                            label='Hasło'
                            fullWidth
                            autoComplete='current-password'
                            type='password'
                            name='password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}

                        />
                        <Button className='login__content__button'
                            variant='contained'
                            fullWidth
                            type='submit'
                        >
                            Zaloguj się
                        </Button>
                    </form>
                    <Link href="/reset-password" className='login__content__link'
                        underline='hover'>
                        Nie pamiętasz hasła?
                    </Link>
                </Box>
            </Paper>
        </Container>
    )
}

export default Login
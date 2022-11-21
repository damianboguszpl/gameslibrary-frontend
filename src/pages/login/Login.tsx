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

function Login() {

    const context = useContext(AuthContext);
    // const [users, setUsers] = useState();
    // const axiosPrivate = useAxiosPrivate();
    // const refresh = useRefreshToken();

    // useEffect(() => {
    //     console.log(context?.authState);
    //     // console.log("user: "+user)
    // }, [])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: LoginValidationSchema,
        onSubmit: (values) => {
            axios.post("/auth/login", values,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            ).then((response) => {
                window.location.href = "/"
            }).catch(({ response }) => {
                if (response.data?.error === 'Użytkownik nie istnieje')
                    formik.setFieldError('email', response.data.error)
                if (response.data?.error === 'Hasło jest niepoprawne')
                    formik.setFieldError('password', response.data.error)
            })
        }
    });
    // it show context
    // console.log(context?.authState)

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
import {
    Container,
    TextField,
    Button,
    Paper,
    Link,
    Box
} from "@mui/material";

import { useFormik } from "formik"

import { useNavigate } from 'react-router-dom'
import { RegisterValidationSchema } from "../../validations/RegisterValidationSchema";
import './Register.scss'
import axios from '../../api/axios.js';
import { RegisterInterface } from "../../interfaces/RegisterInterface";

function Register(props: RegisterInterface) {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            login: '',
            email: '',
            password: '',
            repeatPassword: '',
        },
        validationSchema: RegisterValidationSchema,
        onSubmit: (values) => {
                axios.post("/user/register", values).then((response) => {
                    if (response?.data?.code === 'USER_REGISTERED_SUCCESSFULLY')
                        navigate(`/login`)
                }).catch(({ response }) => {
                    console.log(response.data)
                    if (response?.data?.code === 'EMAIL_ALREADY_TAKEN')
                        formik.setFieldError('email', response.data.message)
                    if (response.data?.code === 'LOGIN_ALREADY_TAKEN')
                        formik.setFieldError('login', response.data.message)
                    if (response.data?.code === 'LOGIN_NOT_VALID')
                        formik.setFieldError('login', response.data.message)
                    if(response.data?.code === 'PASSWORD_NOT_VALID')
                    formik.setFieldError('password', response.data.message)
                })
        }
    });

    return (
        <Container maxWidth="sm" className='register'>
            <Paper elevation={4} className='register__card'>
                <Box className='register__card__header'>
                    {!props.isAdmin ? 'rejestracja' : 'dodawanie nowego pracownika'}
                </Box>
                <Box className='register__card__content'>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField className='register__content__input'
                            variant='outlined'
                            label='Login'
                            fullWidth
                            autoComplete='family-name'
                            name='login'
                            value={formik.values.login}
                            onChange={formik.handleChange}
                            error={formik.touched.login && Boolean(formik.errors.login)}
                            helperText={formik.touched.login && formik.errors.login}
                        />
                        <TextField className='register__content__input'
                            variant='outlined'
                            label='Adres email'
                            fullWidth
                            autoComplete='email'
                            name='email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField className='register__content__input'
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
                        <TextField className='register__content__input'
                            variant='outlined'
                            label='Powtórz hasło'
                            fullWidth
                            autoComplete='current-password'
                            type='password'
                            name='repeatPassword'
                            value={formik.values.repeatPassword}
                            onChange={formik.handleChange}
                            error={formik.touched.repeatPassword && Boolean(formik.errors.repeatPassword)}
                            helperText={formik.touched.repeatPassword && formik.errors.repeatPassword}

                        />
                        <Button className='register__content__button'
                            variant='contained'
                            fullWidth
                            type='submit'
                        >
                            Zarejestruj się
                        </Button>
                    </form>
                    <Link href="/login" className='register__content__link'
                        underline='hover'>
                        Masz już konto?
                    </Link>
                </Box>
            </Paper>
        </Container>
    )
}

export default Register
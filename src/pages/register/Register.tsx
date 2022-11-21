import {
    Container,
    TextField,
    Button,
    Paper,
    Link,
    Box,
    RadioGroup,
    Radio,
    FormControlLabel,
    FormLabel,
    FormHelperText
} from "@mui/material";

import { useFormik } from "formik"

import { useNavigate } from 'react-router-dom'
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { RegisterValidationSchema } from "../../validations/RegisterValidationSchema";
import './Register.scss'
import axios from '../../api/axios.js';
import { RegisterInterface } from "../../interfaces/RegisterInterface";

function Register(props: RegisterInterface) {
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            phoneNumber: '',
            password: '',
            repeatPassword: '',
            sex: ''
        },
        validationSchema: RegisterValidationSchema,
        onSubmit: (values) => {
            // FIXME: errors handler
            if (!props.isAdmin) {
                axios.post("/users/register", values).then((response) => {
                    navigate(`/login`)
                }).catch(({ response }) => {
                    if (response.data?.error === 'Użytkownik z podanym adresem email już istnieje')
                        formik.setFieldError('email', response.data.error)
                    if (response.data?.error === 'Użytkownik z podanym numerem telefonu już istnieje')
                        formik.setFieldError('phoneNumber', response.data.error)
                })
            }
            else {
                const data = {
                    firstname: values.firstname,
                    lastname: values.lastname,
                    email: values.email,
                    password: values.password,
                    phoneNumber: values.phoneNumber,
                    sex: values.sex,
                    RoleId: 3
                }
                const postEmployee = async () => {
                    await axiosPrivate.post('/users', data).then((response) => {
                        console.log(response.data)
                        formik.resetForm();
                    }).catch(({ response }) => {
                        if (response.data?.error === 'Użytkownik z podanym adresem email już istnieje')
                            formik.setFieldError('email', response.data.error)
                        if (response.data?.error === 'Użytkownik z podanym numerem telefonu już istnieje')
                            formik.setFieldError('phoneNumber', response.data.error)
                    })

                }
                postEmployee();
            }
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
                            label='Imię'
                            fullWidth
                            autoComplete='given-name'
                            autoFocus
                            name='firstname'
                            value={formik.values.firstname}
                            onChange={formik.handleChange}
                            error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                            helperText={formik.touched.firstname && formik.errors.firstname}
                        />
                        <TextField className='register__content__input'
                            variant='outlined'
                            label='Nazwisko'
                            fullWidth
                            autoComplete='family-name'
                            name='lastname'
                            value={formik.values.lastname}
                            onChange={formik.handleChange}
                            error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                            helperText={formik.touched.lastname && formik.errors.lastname}
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
                            label='Numer telefonu'
                            fullWidth
                            autoComplete='tel-national'
                            name='phoneNumber'
                            value={formik.values.phoneNumber}
                            onChange={formik.handleChange}
                            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
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
                        <FormLabel>Płeć</FormLabel>
                        <RadioGroup className="register__content__radio"
                            row
                            name='sex'
                            onChange={formik.handleChange}
                            value={formik.values.sex}
                        // error={formik.touched.sex && Boolean(formik.errors.sex)}
                        // helperText={formik.touched.sex && formik.errors.sex}
                        >
                            <FormControlLabel value="female" control={<Radio />} label="Kobieta" />
                            <FormControlLabel value="male" control={<Radio />} label="Mężczyzna" />
                            {/* <FormControlLabel value="Inna" control={<Radio />} label="Inna" /> */}
                        </RadioGroup>
                        {(formik.touched.sex && Boolean(formik.errors.sex)) ?
                            <FormHelperText className="register__content__radio-error">{formik.touched.sex && formik.errors.sex}</FormHelperText>
                            :
                            <FormHelperText className="register__content__radio-error"></FormHelperText>
                        }
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
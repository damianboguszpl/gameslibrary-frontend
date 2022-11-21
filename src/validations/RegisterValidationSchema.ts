import * as Yup from "yup"

export const RegisterValidationSchema = Yup.object({
    firstname: Yup
        .string()
        .required("Imię jest wymagane"),
    lastname: Yup
        .string()
        .required("Nazwisko jest wymagane"),
    email: Yup
        .string()
        .required("Email jest wymagany")
        .email("Wprowadź poprawny adres email"),
    phoneNumber: Yup
        .string()
        .required("Numer telefonu jest wymagany")
        .matches(/^[1-9][0-9]{8}$/, "Wpisz poprawny numer telefonu"),
    password: Yup
        .string()
        .required("Hasło jest wymagane")
        .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, "Hasło musi zawierać znak specjalny, cyfrę, wielką i małą literę oraz minimum 8 znaków"),
    repeatPassword: Yup
        .string()
        .required("Hasło jest wymagane")
        // check that password and repeatPassword are same
        .oneOf([Yup.ref('password')], "Hasło musi być identyczne"),
    sex: Yup
        .string()
        // add 'Inne' if we use third radio
        .required("Zaznaczenie jest wymagane").oneOf(["female", "male"])
});
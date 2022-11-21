import * as Yup from "yup"

export const LoginValidationSchema = Yup.object({
    email: Yup
        .string()
        .required("Email jest wymagany")
        .email("Wprowadź poprawny adres email"),
    password: Yup
        .string()
        .required("Hasło jest wymagane")
});
import * as Yup from "yup"

export const RegisterValidationSchema = Yup.object({
    login: Yup
        .string()
        .required("Login is required")
        .matches(/^[a-zA-Z0-9._-]{3,}$/, "Login should be 3 letter length"),
    email: Yup
        .string()
        .required("Email is required")
        .email("Enter a valid email"),
    password: Yup
        .string()
        .required("Password is required")
        .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, "Login should contain Uppercase letter, lowercase letter, number and special character, length min 8"),
    repeatPassword: Yup
        .string()
        .required("Password is required")
        // check that password and repeatPassword are same
        .oneOf([Yup.ref('password')], "Password isn't same"),
});
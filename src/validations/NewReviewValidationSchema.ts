import * as Yup from "yup"

export const NewReviewValidationSchema = Yup.object({
    textReview: Yup
        .string()
        .required("Review is required"),
    rating: Yup
        .number()
        .typeError("Rating must be a number")
        .required("Rating is required")
        .min(1, "Rating must not be lower than 1")
        .max(5, "Rating must not be higher than 5"),
});
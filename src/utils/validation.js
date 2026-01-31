import * as yup from "yup";

export const userSchema = yup.object({
    name: yup.string().required().min(3),
    email: yup.string().email().required(),
    phone: yup.string().matches(/^[0-9]{10}$/).required(),
    role: yup.string().required()
});

import * as yup from "yup"
import { minimumPasswordLength } from "instagram-clone-shared"
// import { loginValidationSchema } from "../../lib/yupSchemas"
export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  password: yup
    .string()
    .min(minimumPasswordLength, "Too short password min 6 character require")
    .max(255, "Too long password")
    .required()
})
export const registerValidationSchema =
  loginValidationSchema &&
  yup.object().shape({
    name: yup.string().min(5, "too short").max(20, "too long").required()
  })

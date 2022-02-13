import * as yup from "yup"
import { minimumPasswordLength } from "instagram-clone-shared"
// import { loginValidationSchema } from "../../lib/yupSchemas"
const emailAndPasswordValidation = {
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
}
export const loginValidationSchema = yup
  .object()
  .shape(emailAndPasswordValidation)
export const registerValidationSchema = yup.object().shape({
  ...emailAndPasswordValidation,
  name: yup.string().min(5, "too short").max(20, "too long").required()
})

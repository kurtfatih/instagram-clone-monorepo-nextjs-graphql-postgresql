import * as yup from "yup"
import { minimumPasswordLength } from "instagram-clone-shared"
// import { loginValidationSchema } from "../../lib/yupSchemas"
const emailValidation = yup
  .string()
  .email("Must be a valid email")
  .max(255)
  .required("Email is required")
const passwordValidation = yup
  .string()
  .min(minimumPasswordLength, "Too short password min 6 character require")
  .max(255, "Too long password")
  .required()

const emailAndPasswordValidation = {
  email: emailValidation,
  password: passwordValidation
}
export const loginValidationSchema = yup
  .object()
  .shape(emailAndPasswordValidation)

export const registerValidationSchema = yup.object().shape({
  ...emailAndPasswordValidation,
  name: yup.string().min(5, "too short").max(20, "too long").required()
})

export const forgotPasswordValidationSchema = yup.object().shape({
  email: emailValidation
})

export const resetPasswordValidationSchema = yup.object().shape({
  password: passwordValidation,
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required()
})

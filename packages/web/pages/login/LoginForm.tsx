import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input
} from "@chakra-ui/react"
import { useFormik } from "formik"
import ChakraFormikForm from "../../components/ChakraFormikForm"
import { loginValidationSchema } from "../../lib/yupSchemas"
interface LoginFormPropsI {
  onSubmit: ({ email, password }: { email: string; password: string }) => void
}
const LoginForm: React.FC<LoginFormPropsI> = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit: onSubmit,
    validationSchema: loginValidationSchema
  })
  return (
    <ChakraFormikForm
      onSubmit={onSubmit}
      validationSchema={loginValidationSchema}
      initialValues={{ email: "", password: "" }}
      formObjArr={[
        { type: "email", placeholder: "email", id: "email" },
        { type: "password", placeholder: "password", id: "password" }
      ]}
      submitButtonText="Log in"
    />
  )
}
export default LoginForm

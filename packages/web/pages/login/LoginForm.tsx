import ChakraFormikForm from "../../components/ChakraFormikForm"
import { useSignInMutation } from "../../generated/graphql.d"
import { loginValidationSchema } from "../../lib/yupSchemas"
interface LoginFormPropsI {
  onSubmit: ({ email, password }: { email: string; password: string }) => void
}
const LoginForm: React.FC<LoginFormPropsI> = ({ onSubmit }) => {
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

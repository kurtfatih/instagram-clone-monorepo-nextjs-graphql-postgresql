import ChakraFormikForm from "../../components/ChakraFormikForm"
import { forgotPasswordValidationSchema } from "../../lib/yupSchemas"

interface ForgotPasswordFormProps {
  onSubmit: ({ email }: { email: string }) => void
}
const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSubmit
}) => {
  return (
    <ChakraFormikForm
      onSubmit={onSubmit}
      validationSchema={forgotPasswordValidationSchema}
      initialValues={{ email: "" }}
      formObjArr={[{ type: "email", placeholder: "email", id: "email" }]}
      submitButtonText="Send password reset email"
    />
  )
}
export default ForgotPasswordForm

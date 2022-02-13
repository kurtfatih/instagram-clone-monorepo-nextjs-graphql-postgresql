import { useRouter } from "next/router"
import { NextPage } from "next/types"
import { useEffect } from "react"
import ChakraFormikForm from "../../../components/ChakraFormikForm"
import { useResetPasswordMutation } from "../../../generated/graphql.d"
import { resetPasswordValidationSchema } from "../../../lib/yupSchemas"

const ResetPassword: React.FC = () => {
  const [resetPassword] = useResetPasswordMutation()
  const router = useRouter()
  useEffect(() => {
    const hashedKey = document.location.hash
    localStorage.setItem("refresh-token", hashedKey.substring(1))
  }, [])

  const handlePasswordReset = async ({ password }: { password: string }) => {
    const key = localStorage.getItem("refresh-token")
    console.log("handler key", key)
    try {
      await resetPassword({
        variables: { password, confirmationPassword: password },
        context: {
          headers: {
            Authorization: key
          }
        }
      })
    } catch (e: any) {
      alert(e)
      router.push("/login")
    }
  }
  return (
    <ChakraFormikForm
      onSubmit={handlePasswordReset}
      validationSchema={resetPasswordValidationSchema}
      initialValues={{ password: "", passwordConfirmation: "" }}
      formObjArr={[
        { type: "password", placeholder: "password...", id: "password" },
        {
          type: "password",
          placeholder: "confirm password...",
          id: "passwordConfirmation"
        }
      ]}
      submitButtonText="Reset password"
    />
  )
}
export default ResetPassword

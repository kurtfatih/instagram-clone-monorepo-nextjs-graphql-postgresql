import { useRouter } from "next/router"
import { useEffect } from "react"
import ChakraFormikForm from "../../../components/ChakraFormikForm"
import { useResetPasswordMutation } from "instagram-clone-shared/generated/graphql.d"
import { resetPasswordValidationSchema } from "instagram-clone-shared/lib/yupSchemas"

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
      alert("Process time expired")
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

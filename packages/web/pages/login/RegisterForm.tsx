import React from "react"
import ChakraFormikForm from "../../components/ChakraFormikForm"
import { registerValidationSchema } from "instagram-clone-shared/lib/yupSchemas"

interface RegisterFormProps {
  onSubmit: ({
    email,
    password,
    name
  }: {
    email: string
    password: string
    name: string
  }) => void
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  return (
    <ChakraFormikForm
      onSubmit={onSubmit}
      validationSchema={registerValidationSchema}
      initialValues={{ email: "", password: "", name: "" }}
      formObjArr={[
        { type: "email", placeholder: "email", id: "email" },
        { type: "password", placeholder: "password", id: "password" },
        { type: "text", placeholder: "name", id: "name" }
      ]}
      submitButtonText="Sign up"
    />
  )
}

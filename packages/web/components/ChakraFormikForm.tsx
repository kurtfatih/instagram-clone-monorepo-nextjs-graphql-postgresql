import { Button, FormControl, FormErrorMessage, Input } from "@chakra-ui/react"
import { FormikHelpers, useFormik } from "formik"
import React from "react"

interface ChakraFormikFormPropsI {
  onSubmit: (
    values: any,
    formikHelpers: FormikHelpers<any>
  ) => void | Promise<any>
  initialValues: any
  formObjArr: { type: string; placeholder: string; id: string }[]
  validationSchema?: any
  submitButtonText?: string
}
const ChakraFormikForm: React.FC<ChakraFormikFormPropsI> = ({
  initialValues,
  formObjArr,
  onSubmit,
  validationSchema,
  submitButtonText
}) => {
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit,
    validationSchema
  })
  return (
    <FormControl
      as="form"
      isInvalid={!formik.isValid}
      flexDirection={"column"}
      justifyContent={"space-between"}
      height="50%"
      w="75%"
      display="flex"
      onSubmit={(e: any) => formik.handleSubmit(e)}
    >
      {formObjArr.map(({ type, placeholder, id }) => (
        <>
          <Input
            key={id}
            border="1px solid rgba(var(--b6a,219,219,219),1)"
            borderRadius={0}
            id={id}
            onChange={formik.handleChange}
            value={formik.values[id]}
            placeholder={placeholder}
            type={type}
          />

          {formik.errors[id] && formik.touched[id] ? (
            <FormErrorMessage>{formik.errors[id]}</FormErrorMessage>
          ) : null}
        </>
      ))}

      <Button w="100%" type="submit">
        {submitButtonText ?? "Submit"}
      </Button>
    </FormControl>
  )
}

export default ChakraFormikForm

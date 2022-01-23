import { validateOrReject, ValidationError } from "class-validator"

export const isValidateOrReject = async <T extends {}>(
  input: T,
  cb: () => Promise<T>
) => {
  try {
    await validateOrReject(input)
    await cb()
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}

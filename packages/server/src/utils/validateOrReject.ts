import { validate } from "class-validator"

export const validateWrap = async <T extends {}>(
  res: T,
  cb: () => Promise<T>
) => {
  await validate(res)
    .then(async (errors) => {
      // errors is an array of validation errors
      if (errors.length > 0) {
        console.log(errors)
        return false
      } else {
        await cb()
      }
    })
    .catch((e) => console.log(e))
}

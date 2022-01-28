import { validate } from "class-validator"
import { SaveOptions } from "typeorm"

export const validateAndSaveOrThrowError = async <
  T extends { save: (options?: SaveOptions | undefined) => Promise<T> }
>(
  model: T
) => {
  const errors = await validate(model)

  if (errors.length > 0) {
    const customMessages = errors.map(({ constraints }) => constraints)
    const customeFirstErrorObject = customMessages[0]
    if (customeFirstErrorObject) {
      const firstCustomeErrorValue = Object.values(customeFirstErrorObject)[0]
      return new Error(firstCustomeErrorValue)
    }
    return new Error(`Validation failed!`)
  } else {
    await model.save()
    return true
  }
}

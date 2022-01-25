const minimumDisplayNameLength = 3
const minimumPasswordLength = 6

const maxDescriptionLength = 6
const maxCommentLength = 2200
const getErrorMessageWithClassValidatorMessage = (
  property: string,
  max: boolean = false
) => {
  const errorMsg = `${property} is too ${max ? "long" : "short"}. ${
    max ? "Maximum" : "Minimum"
  } length is $constraint1 characters, but actual is $value`
  return errorMsg
}
export {
  minimumPasswordLength,
  maxDescriptionLength,
  getErrorMessageWithClassValidatorMessage,
  minimumDisplayNameLength,
  maxCommentLength
}

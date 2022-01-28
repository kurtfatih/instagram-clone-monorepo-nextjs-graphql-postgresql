const minimumDisplayNameLength = 3
const minimumPasswordLength = 6

const maxDescriptionLength = 300
const maxCommentLength = 2200

const mixedMessageWithClassValidatorForLengthError = ({
  property,
  max
}: {
  property: string
  max?: boolean
}) => {
  const errorMsg = `${property} is too ${max ? "long" : "short"}. ${
    max ? "Maximum" : "Minimum"
  } length is $constraint1 characters, but actual is $value`
  return errorMsg
}

export {
  minimumPasswordLength,
  maxDescriptionLength,
  mixedMessageWithClassValidatorForLengthError,
  minimumDisplayNameLength,
  maxCommentLength
}

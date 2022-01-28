import { InputType, Field } from "type-graphql"
import { User } from "../entities/User"

@InputType()
class UserLoginInput implements Partial<User> {
  @Field()
  email: string
  @Field()
  password: string
}

@InputType()
class UserCreateInput extends UserLoginInput {
  @Field()
  displayName: string
}

export { UserLoginInput, UserCreateInput }

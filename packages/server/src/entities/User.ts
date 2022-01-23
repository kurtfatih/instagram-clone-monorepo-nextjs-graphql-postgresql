import { IsHash, IsEmail, IsString } from "class-validator"
import { Field, ObjectType } from "type-graphql"
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("User")
@ObjectType()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true })
  @Field()
  @IsEmail()
  email: string

  @IsString()
  @Column()
  @Field()
  displayName: string

  @Column()
  @Field()
  password: string
}

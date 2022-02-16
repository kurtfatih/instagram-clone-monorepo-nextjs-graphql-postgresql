import { Center, Flex, Text } from "@chakra-ui/react"
import React from "react"
import Image from "next/image"
import { NextPage } from "next"
import LoginForm from "./LoginForm"
import { RegisterForm } from "./RegisterForm"
import {
  useForgotPasswordMutation,
  useSignInWithEmailAndPasswordMutation,
  useSignUpMutation
} from "instagram-clone-shared/generated/graphql.d"
import ForgotPasswordForm from "./ForgotPasswordForm"
interface LoginProps {}

const Login: NextPage = ({}) => {
  const [isLoginShow, setIsLoginShow] = React.useState(true)
  const [isShowForgotPassword, setIsShowForgotPassword] = React.useState(false)
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPasswordMutation()
  const [signUpWithEmailPasswordAndDisplayName] = useSignUpMutation()
  const [forgotPassword] = useForgotPasswordMutation()
  // whole page div
  //  all content div
  // upper content div
  // upper content left side
  // upper content right side (form)
  // buttom conteiner (footer)
  const handleLogin = async ({
    email,
    password
  }: {
    email: string
    password: string
  }) => {
    try {
      const token = await signInWithEmailAndPassword({
        variables: { emailAndPassword: { email, password } }
      })
      console.log(token)
      if (!token.data?.signIn) return
      localStorage.setItem("access-token", token?.data.signIn.access_token)
      localStorage.setItem("refresh-token", token?.data.signIn.refresh_token)
    } catch (e) {
      alert(e)
    }
  }
  const handleRegister = async ({
    email,
    password,
    name
  }: {
    email: string
    password: string
    name: string
  }) => {
    try {
      const res = await signUpWithEmailPasswordAndDisplayName({
        variables: { createUserInput: { email, password, displayName: name } }
      })
      if (res.data?.signUp === true) {
        const token = await signInWithEmailAndPassword({
          variables: { emailAndPassword: { email, password } }
        })
        if (!token.data?.signIn) return
        localStorage.setItem("access-token", token?.data.signIn.access_token)
        localStorage.setItem("refresh-token", token?.data.signIn.refresh_token)
        // console.log(token.data.signIn)
      }
    } catch (e) {
      alert(e)
    }
  }
  const handleForgotPassword = async ({ email }: { email: string }) => {
    const getRefreshToken = localStorage.getItem("refresh-token")
    try {
      await forgotPassword({
        variables: { email }
      })
    } catch (e) {
      alert(e)
    }
  }

  return (
    <Center backgroundColor="rgba(var(--b3f,250,250,250),1)" w="100%" h="100vh">
      <Center
        key="all-content"
        w="100%"
        h="80%"
        justifyContent={"space-between"}
        flexDirection="column"
      >
        <Flex
          id="upper-content"
          w="50%"
          justifyContent={"space-between"}
          key="upper-content"
        >
          <Flex
            h="618px"
            flexBasis="454px"
            id="upper-content-left"
            key="upper-content-left"
          >
            <Image
              alt="intagram_phone"
              src="https://www.instagram.com/static/images/homepage/home-phones.png/43cc71bb1b43.png"
              quality="100%"
              height="618px"
              width="454px"
            />
          </Flex>
          <Center
            h="60%"
            width="45%"
            alignSelf="center"
            flexDirection="column"
            justifyContent="space-around"
            border="1px solid rgba(var(--b6a,219,219,219),1)"
            id="upper-content-right"
            key="upper-content-right"
          >
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png"
              alt="instagram-logo"
              width="150px"
              quality="100%"
              height="51px"
            />
            {isLoginShow ? (
              <LoginForm onSubmit={handleLogin} />
            ) : !isShowForgotPassword ? (
              <RegisterForm onSubmit={handleRegister}></RegisterForm>
            ) : null}

            {!isLoginShow && isShowForgotPassword ? (
              <ForgotPasswordForm onSubmit={handleForgotPassword} />
            ) : null}

            {isLoginShow && !isShowForgotPassword ? (
              <>
                <Text
                  cursor={"pointer"}
                  onClick={() => {
                    setIsLoginShow(false)
                    setIsShowForgotPassword(false)
                  }}
                >
                  You haven not signed up yet ?{" "}
                </Text>
                <Text
                  cursor={"pointer"}
                  onClick={() => {
                    setIsShowForgotPassword(true)
                    setIsLoginShow(false)
                  }}
                >
                  You forgot your password ?
                </Text>
              </>
            ) : (
              <Text
                cursor={"pointer"}
                onClick={() => {
                  setIsLoginShow(true)
                  setIsShowForgotPassword(false)
                }}
              >
                You have already sign up ?{" "}
              </Text>
            )}
          </Center>
        </Flex>
        {/* <Flex id="buttom-container" key="buttom-container">
          buttom content
        </Flex> */}
      </Center>
    </Center>
  )
}

export default Login

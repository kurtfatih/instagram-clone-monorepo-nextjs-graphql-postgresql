import { Center, Flex, Text } from "@chakra-ui/react"
import React from "react"
import Image from "next/image"
import { NextPage } from "next"
import { FlexContainer, MainContainer } from "../../components/Layout"
import LoginForm from "./LoginForm"
import { FormikProvider } from "formik"
import { RegisterForm } from "./RegisterForm"
interface LoginProps {}

const Login: NextPage = ({}) => {
  const [isLoginShow, setIsLoginShow] = React.useState(true)
  // whole page div
  //  all content div
  // upper content div
  // upper content left side
  // upper content right side (form)
  // buttom conteiner (footer)
  const handleLogin = ({
    email,
    password
  }: {
    email: string
    password: string
  }) => {
    console.log(email, password)
  }
  const handleRegister = ({
    email,
    password,
    name
  }: {
    email: string
    password: string
    name: string
  }) => {
    console.log(email, password, name)
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
            ) : (
              <RegisterForm onSubmit={handleRegister}></RegisterForm>
            )}

            {isLoginShow ? (
              <Text cursor={"pointer"} onClick={() => setIsLoginShow(false)}>
                You haven't signed up yet ?{" "}
              </Text>
            ) : (
              <Text cursor={"pointer"} onClick={() => setIsLoginShow(true)}>
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

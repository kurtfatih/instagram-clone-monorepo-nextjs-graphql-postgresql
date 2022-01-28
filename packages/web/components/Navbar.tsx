import { Text, Box, Flex } from "@chakra-ui/react"
import Link from "next/link"
import React from "react"

export const Navbar: React.FC = ({}) => {
  return (
    <Flex
      height="60px"
      position="fixed"
      top={0}
      border="1px"
      borderStyle="solid"
      borderColor="#dbdbdb"
      width="100%"
      zIndex={3}
      direction="column"
      margin={0}
      padding={0}
      alignItems="center"
    >
      <Flex justifyContent={"space-between"}>
        <Link href="/" passHref>
          <Text>Home</Text>
        </Link>
        <Link href="/" passHref>
          <Text>Add</Text>
        </Link>
        <Link href="/" passHref>
          <Text>Profile</Text>
        </Link>
      </Flex>
    </Flex>
  )
}

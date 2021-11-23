import React from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Spacer,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { HeaderContainer } from "../components/styledComponents/MainContent.styled";

const MainLayout = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <HeaderContainer>
        <Flex>
          <Box>
            <Heading>SOA</Heading>
          </Box>
          <Box>
            <Heading fontSize={"md"}>-LAB8</Heading>
          </Box>
          <Box pl={4} paddingTop={3}>
            <Text fontSize={"lg"}>Phone Book</Text>
          </Box>
          <Spacer />
          <Box>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Box>
        </Flex>
      </HeaderContainer>
      <Box w={"100%"}>
        <Center>{children}</Center>
      </Box>
    </>
  );
};

export default MainLayout;

import {
  Container,
  Link,
  VStack,
  Text,
  Flex,
  Button,
  Box,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import Image from "next/image";
import Logo from "../../public/logo.png";

export const Login = () => {
  return (
    <Container marginTop={10} maxW={600} centerContent>
      <Box maxW={400}>
        <Image src={Logo} alt="Hospital Moinho dos ventos" />
      </Box>
      <VStack paddingY={4} spacing={-1}>
        <Text fontWeight="bold" fontSize={26}>
          Cadastro
        </Text>
      </VStack>
      <VStack width="100%">
        <Button
          colorScheme="color"
          color="white"
          bgColor="brand.700"
          isFullWidth
          maxW={400}
        >
          Cadastre-se
        </Button>
      </VStack>
      <Flex marginTop={6}>
        <Text>Já possui uma conta?</Text>
        <NextLink href="/login" passHref>
          <Link
            color="brand.700"
            fontWeight="bold"
            textDecoration="underline"
            marginLeft={1}
          >
            Entre aqui
          </Link>
        </NextLink>
      </Flex>
    </Container>
  );
};

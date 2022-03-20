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
import Image from "next/image";
import Logo from "../../public/logo.png";
import { useRouter } from "next/router";

export const Home = () => {
  const router = useRouter();

  return (
    <Container marginTop={10} maxW={400} centerContent>
      <Box maxW={400}>
        <Image src={Logo} alt="Hospital Moinho dos ventos" />
      </Box>
      <VStack paddingY={12} spacing={-1}>
        <Text fontWeight="bold" fontSize={26}>
          Redefinindo o impossível
        </Text>
        <Text fontSize={18}>Juntos, movemos essa história</Text>
      </VStack>
      <VStack width="100%" marginTop={2}>
        <Button
          colorScheme="color"
          color="white"
          bgColor="brand.700"
          isFullWidth
          maxW={400}
          onClick={() => router.push("/login")}
        >
          Entre aqui
        </Button>
      </VStack>
    </Container>
  );
};

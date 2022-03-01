import { Container, Link, Text } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

export const Home = () => {
  return (
    <Container maxW={600} centerContent>
      <div>image</div>
      <Text>Redefinindo o impossível</Text>
      <Text>Juntos, movemos essa história</Text>
      <div>
        <Text>Já possui uma conta?</Text>
        <NextLink href="/login" passHref>
          <Link>Acesse aqui</Link>
        </NextLink>
      </div>
    </Container>
  );
};

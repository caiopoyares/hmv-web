import {
  Container,
  Link,
  VStack,
  Text,
  Flex,
  Button,
  Box,
  Input,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import NextLink from "next/link";
import Image from "next/image";
import Logo from "../../public/logo.png";
import { useForm } from "react-hook-form";
import { PasswordInput } from "../../components/form/passwordInput";
import styled from "@emotion/styled";
import { useLogin } from "./hook";

const ErrorMessage = styled(Text)`
  font-size: 0.8rem;
  color: red;
  margin-top: 0;
`;

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const toast = useToast();

  const { mutate, isLoading, error: loginError } = useLogin();

  const onSubmit = (data: { [x: string]: any }) => {
    const payload = {
      cpf: data.cpf.replace(/\D/g, ""),
      password: data.password,
    };

    mutate(payload);
  };

  useEffect(() => {
    if (loginError) {
      toast({
        title: "Erro ao fazer login",
        description: "Verifique suas credenciais e tente novamente.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [loginError, toast]);

  return (
    <Container marginTop={10} maxW={400} centerContent>
      <Box maxW={400}>
        <Image src={Logo} alt="Hospital Moinho dos ventos" />
      </Box>
      <VStack width="100%" marginTop={8}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100% " }}>
          <VStack spacing={3} marginBottom={4}>
            <Input
              placeholder="CPF"
              {...register("cpf", { required: true })}
              isInvalid={errors.cpf}
            />
            <PasswordInput
              register={register}
              isRequired
              placeholder={"Senha"}
              isInvalid={errors.password}
            />
            <Button
              cursor="pointer"
              colorScheme="blue"
              type="submit"
              isFullWidth
              isLoading={isLoading}
              disabled={isLoading}
            >
              Acessar conta
            </Button>
          </VStack>
        </form>
      </VStack>
      <Flex marginTop={0}>
        <NextLink href="/" passHref>
          <Link
            color="brand.700"
            fontWeight="bold"
            textDecoration="underline"
            marginLeft={1}
          >
            Voltar ao início
          </Link>
        </NextLink>
      </Flex>
    </Container>
  );
};

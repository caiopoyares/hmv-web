import {
  Container,
  Link,
  VStack,
  Text,
  Flex,
  Box,
  Input,
  Button,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import Image from "next/image";
import Logo from "../../public/logo.png";
import { useForm } from "react-hook-form";
import { PasswordInput } from "../../components/form/passwordInput";

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => console.log(data);

  return (
    <Container marginTop={10} maxW={500} centerContent>
      <Box maxW={400}>
        <Image src={Logo} alt="Hospital Moinho dos ventos" />
      </Box>
      <Box width="100%" textAlign="center">
        <Heading fontSize={24} marginBottom={6}>
          Cadastro
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={3} marginBottom={4}>
            <Input
              placeholder="Nome completo"
              {...register("name", { required: true })}
            />
            {errors.name && <span>This field is required</span>}
            <Input placeholder="CPF" {...register("cpf", { required: true })} />
            {errors.cpf && <span>This field is required</span>}
            <Input
              placeholder="Data de nascimento"
              {...register("birthDate", { required: true })}
            />
            {errors.birthDate && <span>This field is required</span>}
            <PasswordInput
              register={register}
              isRequired
              placeholder={"Senha"}
            />
            {errors.password && <span>This field is required</span>}
            <Input bgColor="brand.700" color="white" type="submit" />
          </VStack>
        </form>
      </Box>
      <Flex>
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

import React from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import Router, { useRouter } from "next/router";
import { ArrowBackIcon } from "@chakra-ui/icons";

const ErrorMessage = styled(Text)`
  font-size: 0.8rem;
  color: red;
  margin-top: 0;
`;

export const NewOrder = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const toast = useToast();

  const onSubmit = (data: any) => {
    console.log(data);
    toast({
      title: "Ficha criada com sucesso!",
      description: "Nova ficha de emergência criada com sucesso.",
      status: "success",
      duration: 5000,
    });
    router.push("/dashboard");
  };

  return (
    <Container maxW={1200} mt={8} mb={4}>
      <Button
        leftIcon={<ArrowBackIcon />}
        mb={4}
        onClick={() => router.back()}
        variant="outline"
        colorScheme="orange"
      >
        Voltar
      </Button>
      <Heading as="h4" size="lg">
        Nova ficha de emergência
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack mt={4} spacing={3}>
          <Box w="100%">
            <Heading as="h5" color="gray.600" size="sm">
              Informações do paciente
            </Heading>
          </Box>
          <Input
            placeholder="Nome"
            {...register("name", { required: true })}
            isInvalid={errors.name}
          />
          <Input
            placeholder="Sobrenome"
            {...register("surname", { required: true })}
            isInvalid={errors.surname}
          />
          <Input
            placeholder="E-mail"
            {...register("email", { required: true })}
            isInvalid={errors.email}
          />
          <Input
            type="number"
            placeholder="Idade"
            {...register("age", { required: true })}
            isInvalid={errors.age}
          />
        </VStack>
        <Box my={6} w="100%">
          <Box w="100%">
            <Heading as="h5" color="gray.600" size="sm">
              Informações da emergência
            </Heading>
            <VStack spacing={3} mt={2}>
              <Select
                {...register("unit", { required: true })}
                placeholder="Selecione a unidade"
                isInvalid={errors.unit}
              >
                <option value="iguatemi">Iguatemi</option>
                <option value="canoas">Canoas</option>
              </Select>
              <Input
                placeholder="Data de entrada"
                {...register("arrivalDate", { required: true })}
                isInvalid={errors.arrivalDate}
              />
              <Input
                placeholder="Horário de entrada"
                {...register("arrivalTime", { required: true })}
                isInvalid={errors.arrivalTime}
              />
              <Select
                {...register("reason", { required: true })}
                placeholder="Selecione um motivo"
                isInvalid={errors.reason}
              >
                <option value="infarto">Infarto</option>
                <option value="arritmia">Arritmia</option>
                <option value="arteriosclerose">Arteriosclerose</option>
                <option value="endocardite">Endocardite</option>
                <option value="cardiomiopatia">Cardiomiopatia</option>
                <option value="insuficiencia">Insuficiência cardíaca</option>
                <option value="angina">Angina</option>
                <option value="outro">Outro</option>
              </Select>
              <Textarea
                {...register("description", { required: false })}
                placeholder="Descrição da emergência"
              />
            </VStack>
          </Box>
        </Box>
        <Button
          cursor="pointer"
          colorScheme="blue"
          type="submit"
          isFullWidth
          //   isLoading={isLoading}
          //   disabled={isLoading}
        >
          Criar ficha
        </Button>
      </form>
    </Container>
  );
};

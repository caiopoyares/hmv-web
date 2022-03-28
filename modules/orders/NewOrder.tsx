import React, { useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Select,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useCreateEmergencyOrder } from "./hook";
import { parseDate } from "../../helpers";

export const NewOrder = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const toast = useToast();
  const { mutate, isLoading, isSuccess, isError } = useCreateEmergencyOrder();

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Ficha criada com sucesso!",
        description: "Nova ficha de emergência criada com sucesso.",
        status: "success",
        duration: 5000,
      });
      router.push("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast({
        title: "Erro ao criar ficha!",
        description:
          "Ops, algo deu errado. Por favor, revise os dados e tente novamente.",
        status: "error",
        duration: 5000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  const onSubmit = async (data: { [x: string]: any }) => {
    mutate({
      ...data,
      arrivalDate: parseDate(data.arrivalDate),
    });
  };

  return (
    <Container maxW={1200} mt={8} mb={4}>
      <Button
        leftIcon={<ArrowBackIcon />}
        mb={4}
        onClick={() => router.push("/dashboard")}
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
            {...register("patientFirstName", { required: true })}
            isInvalid={errors.patientFirstName}
          />
          <Input
            placeholder="Sobrenome"
            {...register("patientLastName", { required: true })}
            isInvalid={errors.patientLastName}
          />
          <Input
            placeholder="E-mail"
            {...register("patientEmail", { required: true })}
            isInvalid={errors.patientEmail}
          />
          <Input
            type="number"
            placeholder="CPF"
            {...register("patientCPF", { required: true })}
            isInvalid={errors.patientCPF}
          />
          <Input
            type="number"
            placeholder="Idade"
            {...register("patientAge", { required: true })}
            isInvalid={errors.patientAge}
          />
        </VStack>
        <Box my={6} w="100%">
          <Box w="100%">
            <Heading as="h5" color="gray.600" size="sm">
              Informações da emergência
            </Heading>
            <VStack spacing={3} mt={2}>
              <Select
                {...register("hospitalId", { required: true })}
                placeholder="Selecione a unidade"
                isInvalid={errors.hospitalId}
              >
                <option value="1">Iguatemi</option>
                <option value="2">Canoas</option>
              </Select>
              <Input
                placeholder="Data de entrada (dd/mm/aaaa)"
                {...register("arrivalDate", {
                  required: true,
                  pattern: /^(0[1-9]|[12][\d]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
                })}
                isInvalid={errors.arrivalDate}
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
          isLoading={isLoading}
          disabled={isLoading}
        >
          Criar ficha
        </Button>
      </form>
    </Container>
  );
};

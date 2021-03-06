import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Heading,
  Input,
  Textarea,
  useToast,
  Text,
  VStack,
  Tag,
  Select,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { Loading } from "../../components/loading/Loading";
import api from "../../core/api";
import { parseDate } from "../../helpers";
import { getAuthToken } from "../../helpers/auth";
import { Doctor } from "../../types";
import { useDoctors, useFinishEmergencyOrder } from "./hook";

interface Props {
  orderId: string;
}

const useEmergencyOrder = (orderId: string) => {
  return useQuery(
    ["emergencyOrder", orderId],
    async () => {
      const { data } = await api.get(`/emergency-orders/${orderId}`, {
        headers: {
          authorization: getAuthToken() || "",
        },
      });
      return data;
    },
    {
      enabled: !!orderId,
    }
  );
};

export const OpenOrder: FC<Props> = ({ orderId }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const toast = useToast();
  const { data: order, status } = useEmergencyOrder(router.query.id as string);
  const { data: doctors } = useDoctors();

  const { mutate, isLoading, isSuccess, isError } =
    useFinishEmergencyOrder(orderId);

  const onSubmit = (data: { [x: string]: any }) => {
    mutate({
      ...data,
      finishDate: parseDate(data.finishDate),
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Ficha finalizada com sucesso!",
        description: "Ficha de emergĂȘncia finalizada com sucesso.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      router.push("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast({
        title: "Erro ao finalizar a ficha!",
        description: "Revise seus dados e tente novamente.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  if (status === "loading") return <Loading />;
  if (!doctors || !order) return null;

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
      <Box
        mb={8}
        border="1px solid"
        borderColor="gray.300"
        p={4}
        borderRadius={4}
      >
        <Heading as="h4" size="md" mb={2}>
          Detalhes da ficha de emergĂȘncia
        </Heading>
        <Box display="flex">
          <Text mr={2}>Status:</Text>
          <Tag
            size="md"
            variant="solid"
            bgColor="orange.400"
            textTransform="uppercase"
            fontSize="12"
          >
            Em aberto
          </Tag>
        </Box>
        <Box display="flex">
          <Text mr={2}>Nome do paciente:</Text>
          <Text color="gray.500">
            {`${order.user.firstName} ${order.user.lastName}`}
          </Text>
        </Box>
        <Box display="flex">
          <Text mr={2}>ID da ficha:</Text>
          <Text color="gray.500">{orderId}</Text>
        </Box>
        <Box display="flex">
          <Text mr={2}>Idade do paciente:</Text>
          <Text color="gray.500">{order.user.age}</Text>
        </Box>
        <Box display="flex">
          <Text mr={2}>Motivo da emergĂȘncia:</Text>
          <Text color="gray.500">{order.reason}</Text>
        </Box>
        <Box display="flex">
          <Text mr={2}>Hospital de entrada:</Text>
          <Text color="gray.500">{order.hospital.name}</Text>
        </Box>
        <Box display="flex">
          <Text mr={2}>EndereĂ§o do hospital:</Text>
          <Text color="gray.500">{order.hospital.address}</Text>
        </Box>
      </Box>
      <Heading as="h4" size="lg">
        Finalizar ficha de emergĂȘncia
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack mt={4} spacing={3}>
          <Input
            placeholder="Data de saĂ­da"
            {...register("finishDate", {
              required: true,
              pattern: /^(0[1-9]|[12][\d]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
            })}
            isInvalid={errors.finishDate}
          />
          <Input
            type="number"
            placeholder="Prazo recomendado para retorno (em semanas)"
            {...register("weeksUntilReturn", { required: true })}
            isInvalid={errors.weeksUntilReturn}
          />
          <Select
            {...register("doctorId", { required: true })}
            placeholder="Selecione o mĂ©dico responsĂĄvel"
            isInvalid={errors.doctorId}
          >
            {doctors.map((doctor: Doctor) => (
              <option
                key={doctor.id}
                value={doctor.id}
              >{`${doctor.firstName} ${doctor.lastName} (CRM: ${doctor.crm})`}</option>
            ))}
          </Select>
          <Textarea
            placeholder="SugestĂ”es ao paciente"
            {...register("suggestions", { required: true })}
            isInvalid={errors.suggestions}
            rows={5}
          />
          <Box width="100%">
            <Checkbox
              size="md"
              {...register("shouldSendToUser", { required: true })}
              defaultChecked
            >
              Enviar por email o login ao paciente?
            </Checkbox>
          </Box>
        </VStack>
        <Button
          cursor="pointer"
          colorScheme="blue"
          type="submit"
          isFullWidth
          mt={6}
          isLoading={isLoading}
          disabled={isLoading}
        >
          Finalizar ficha
        </Button>
      </form>
    </Container>
  );
};

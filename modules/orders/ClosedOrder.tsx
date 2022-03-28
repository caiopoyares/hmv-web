import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  Tag,
  useToast,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";
import { Loading } from "../../components/loading/Loading";
import { useEmergencyOrder } from "./hook";

interface Props {
  orderId: string;
}

export const ClosedOrder: FC<Props> = ({ orderId }) => {
  const router = useRouter();
  const toast = useToast();

  const {
    data: order,
    status,
    isError,
  } = useEmergencyOrder(router.query.id as string);

  useEffect(() => {
    if (isError) {
      toast({
        title: "Erro ao buscar ficha de emergência",
        description: "Ocorreu um erro, tente novamente mais tarde.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isError, toast]);

  if (status === "loading") return <Loading />;
  if (!order) return null;

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
      <VStack
        mb={8}
        border="1px solid"
        borderColor="gray.300"
        p={4}
        borderRadius={4}
        align="flex-start"
      >
        <Heading as="h4" size="md" mb={2}>
          Detalhes da ficha de emergência
        </Heading>
        <Box display="flex">
          <Text mr={2}>Status:</Text>
          <Tag
            size="md"
            variant="solid"
            bgColor="brown"
            textTransform="uppercase"
            fontSize="12"
          >
            Encerrado
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
          <Text mr={2}>Motivo da emergência:</Text>
          <Text color="gray.500">{order.reason}</Text>
        </Box>
        <Box display="flex">
          <Text mr={2}>Descrição da emergência:</Text>
          <Text color="gray.500">{order.description}</Text>
        </Box>
        <Box display="flex">
          <Text mr={2}>Hospital de entrada:</Text>
          <Text color="gray.500">{order.hospital.name}</Text>
        </Box>
        <Box display="flex">
          <Text mr={2}>Endereço do hospital:</Text>
          <Text color="gray.500">{order.hospital.address}</Text>
        </Box>
        <Box display="flex">
          <Text mr={2}>Data de entrada:</Text>
          <Text color="gray.500">
            {dayjs(order.arrivalDate).format("DD/MM/YYYY")}
          </Text>
        </Box>
        <Box display="flex">
          <Text mr={2}>Data de saída:</Text>
          <Text color="gray.500">
            {dayjs(order.finishDate).format("DD/MM/YYYY")}
          </Text>
        </Box>
        <Box display="flex">
          <Text mr={2}>Médico responsável:</Text>
          <Text color="gray.500">{`${order.doctor.firstName} ${order.doctor.lastName}`}</Text>
        </Box>
        <Box display="flex">
          <Text mr={2}>CRM do médico responsável:</Text>
          <Text color="gray.500">{order.doctor.crm}</Text>
        </Box>
        <Box display="flex">
          <Text mr={2}>Tempo de retorno sugerido:</Text>
          <Text color="gray.500">
            {order.weeksUntilReturn}{" "}
            {order.weeksUntilReturn > 1 ? "semanas" : "semana"}
          </Text>
        </Box>
        <Box display="flex">
          <Text mr={2}>Recomendações ao paciente:</Text>
          <Text color="gray.500">{order.suggestions}</Text>
        </Box>
      </VStack>
    </Container>
  );
};

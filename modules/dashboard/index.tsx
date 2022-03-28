import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Heading,
  Button,
  Divider,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Loading } from "../../components/loading/Loading";
import { ClosedOrders } from "../../components/orders/ClosedOrders";
import { OpenOrders } from "../../components/orders/OpenOrders";
import { useEmergencyOrders } from "./hook";

export const Dashboard = () => {
  const router = useRouter();
  const toast = useToast();

  const { data: orders, status, isError } = useEmergencyOrders();

  useEffect(() => {
    if (isError) {
      toast({
        title: "Erro ao buscar fichas de emergência",
        description: "Ocorreu um erro.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isError, toast]);

  if (status === "loading") return <Loading />;
  return (
    <Container maxW={1200} mt={[4, 8]} mb={8}>
      <Box>
        <Button
          colorScheme="blue"
          color="white"
          leftIcon={<AddIcon />}
          onClick={() => router.push("/orders/new")}
        >
          Nova ficha
        </Button>
      </Box>
      <Box mt={6}>
        <Heading as="h4" size="lg">
          Fichas em andamento
        </Heading>
        <Box display="flex" flexDir={["column", "row"]} mt={4}>
          <OpenOrders orders={orders} />
        </Box>
      </Box>
      <Divider mt={8} />
      <Box mt={6}>
        <Heading as="h4" size="lg">
          Fichas encerradas
        </Heading>
        <Box display="flex" flexDir={["column", "row"]} mt={4}>
          <ClosedOrders orders={orders} />
        </Box>
      </Box>
    </Container>
  );
};

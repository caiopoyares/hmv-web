import { AddIcon } from "@chakra-ui/icons";
import { Box, Container, Heading, Button, Divider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ClosedOrders } from "../../components/orders/ClosedOrders";
import { OpenOrders } from "../../components/orders/OpenOrders";
import { useEmergencyOrders } from "./hook";

export const Dashboard = () => {
  const router = useRouter();

  const { data: orders, status } = useEmergencyOrders();

  if (status === "loading") return <div>loading</div>;

  if (status === "error") return <div>something went wrong</div>;

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

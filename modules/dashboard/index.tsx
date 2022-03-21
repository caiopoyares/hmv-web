import { AddIcon } from "@chakra-ui/icons";
import { Box, Container, Heading, Button, Divider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ClosedOrders } from "../../components/orders/ClosedOrders";
import { OpenOrders } from "../../components/orders/OpenOrders";

const fichas = [
  {
    id: 14324,
    nome: "Caio Poyares",
    pacienteId: 113131,
    date: "15/02/2020",
    motivo: "Parada respiratória",
    assuntos: ["miocárdio", "coração"],
  },
  {
    id: 2431241,
    nome: "Laura Poyares",
    pacienteId: 113131,
    date: "16/02/2020",
    motivo: "Crise do miocárdio aguda",
    assuntos: ["miocárdio", "coração"],
  },
  {
    id: 34132,
    nome: "Rodrigo Carvalho",
    pacienteId: 113131,
    date: "07/03/2020",
    motivo: "Taquicardia respiratória",
    assuntos: ["miocárdio", "coração"],
  },
];

export const Dashboard = () => {
  const router = useRouter();

  return (
    <Container maxW={1200} mt={[4, 8]}>
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
          <OpenOrders orders={fichas} />
        </Box>
      </Box>
      <Divider mt={8} />
      <Box mt={6}>
        <Heading as="h4" size="lg">
          Fichas encerradas
        </Heading>
        <Box display="flex" flexDir={["column", "row"]} mt={4}>
          <ClosedOrders orders={fichas} />
        </Box>
      </Box>
    </Container>
  );
};

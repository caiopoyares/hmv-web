import {
  Box,
  Heading,
  HStack,
  LinkBox,
  LinkOverlay,
  Tag,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

interface Props {
  orders: any[];
}

export const OpenOrders = ({ orders }: Props) => {
  const router = useRouter();

  const onOrderClick = (orderId: string) => {
    router.push(`/orders/${orderId}/open`);
  };

  return (
    <Box display="flex" flexDir={["column", "row"]} mt={4}>
      {orders.map((order: any) => (
        <LinkBox
          key={order.id}
          as="article"
          maxW="sm"
          p="5"
          borderWidth="1px"
          rounded="md"
          w={["100%", 300]}
          marginRight={[0, 2]}
          marginBottom={[4, 0]}
          onClick={() => onOrderClick(order.id)}
          cursor="pointer"
        >
          <Heading size="md">
            <LinkOverlay>{order.nome}</LinkOverlay>
          </Heading>
          <Text mb={4}>ID do paciente: {order.pacienteId}</Text>
          <Text textTransform="uppercase" fontWeight="bold">
            Ficha nº {order.id}
          </Text>
          <Text mb={4} color="gray.500">
            Criado em {order.date}
          </Text>
          <HStack>
            {order.assuntos.map((assunto: any, i: number) => (
              <Tag key={i} size="md" variant="solid" bgColor="teal">
                {assunto}
              </Tag>
            ))}
          </HStack>
        </LinkBox>
      ))}
    </Box>
  );
};

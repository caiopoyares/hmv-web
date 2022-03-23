import {
  Box,
  Heading,
  LinkBox,
  LinkOverlay,
  Tag,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

interface Props {
  orders: any[];
}

export const ClosedOrders = ({ orders: allOrders }: Props) => {
  const router = useRouter();
  const closedOrders = allOrders.filter((order) => order.status === "complete");

  const onOrderClick = (orderId: string) => {
    router.push(`/orders/${orderId}/closed`);
  };

  return (
    <Box display="flex" flexDir={["column", "row"]} mt={4}>
      {closedOrders.length < 1 ? (
        <div>
          <Text color="gray.500">Nenhuma ficha encerrada.</Text>
        </div>
      ) : (
        <div>
          {closedOrders.map((order: any) => (
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
                <LinkOverlay>{`${order.user.firstName} ${order.user.lastName}`}</LinkOverlay>
              </Heading>
              <Text color="gray.500">ID do paciente: {order.user.id}</Text>
              <Text mb={4} color="gray.500">
                CPF do paciente: {order.user.cpf}
              </Text>

              <Text mt={4} fontWeight="bold">
                Ficha nº {order.id}
              </Text>
              <Text mb={4} color="gray.500">
                Criado em {order.arrivalDate}
              </Text>
              <Tag
                size="md"
                variant="solid"
                bgColor="teal"
                textTransform="uppercase"
              >
                {order.reason}
              </Tag>
            </LinkBox>
          ))}
        </div>
      )}
    </Box>
  );
};

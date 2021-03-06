import {
  Box,
  Heading,
  HStack,
  LinkBox,
  LinkOverlay,
  Tag,
  Text,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { Order } from "../../types";

interface Props {
  orders: Order[];
}

export const ClosedOrders = ({ orders: allOrders }: Props) => {
  const router = useRouter();
  const closedOrders = allOrders.filter((order) => order.status === "complete");

  const onOrderClick = (orderId: string) => {
    router.push(`/orders/${orderId}/closed`);
  };

  return (
    <Box display="flex" flexDir={["column", "row"]} mt={2}>
      {closedOrders.length < 1 ? (
        <>
          <Text color="gray.500">Nenhuma ficha encerrada.</Text>
        </>
      ) : (
        <>
          {closedOrders.map((order: Order) => (
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
              marginTop={2}
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
              <Text color="gray.500">
                Criado em {dayjs(order.arrivalDate).format("DD/MM/YYYY")}
              </Text>
              <Text mb={4} color="gray.500">
                Hospital: {order.hospital.name}
              </Text>
              <HStack>
                <Tag
                  size="md"
                  variant="solid"
                  bgColor="teal"
                  textTransform="uppercase"
                  fontSize="12"
                >
                  {order.reason}
                </Tag>
                <Tag
                  size="md"
                  variant="solid"
                  bgColor="brown"
                  textTransform="uppercase"
                  fontSize="12"
                >
                  Encerrada
                </Tag>
              </HStack>
            </LinkBox>
          ))}
        </>
      )}
    </Box>
  );
};

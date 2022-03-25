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

interface Props {
  orders: any[];
}

export const OpenOrders = ({ orders: allOrders }: Props) => {
  const router = useRouter();
  const openOrders = allOrders.filter((order) => order.status === "open");

  const onOrderClick = (orderId: string) => {
    router.push(`/orders/${orderId}/open`);
  };

  return (
    <Box display="flex" flexWrap="wrap" flexDir={["column", "row"]} mt={2}>
      {openOrders.length < 1 ? (
        <>
          <Text color="gray.500">Nenhuma ficha em andamento.</Text>
        </>
      ) : (
        <>
          {openOrders.map((order: any) => (
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
                  fontSize="12"
                  bgColor="orange.400"
                  textTransform="uppercase"
                >
                  Em aberto
                </Tag>
              </HStack>
            </LinkBox>
          ))}
        </>
      )}
    </Box>
  );
};

import { ArrowBackIcon, WarningIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Heading,
  Input,
  Modal,
  Textarea,
  useToast,
  Text,
  VStack,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Alert,
  Spinner,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import api from "../../core/api";
import { getAuthToken } from "../../helpers/auth";

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
  const [showModal, setShowModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const toast = useToast();

  const { data: order, status } = useEmergencyOrder(router.query.id as string);

  const onSubmit = (data: any) => {
    console.log(data);

    if (data.shouldCreateUser) {
      return setShowModal(true);
    }

    toast({
      title: "Ficha finalizada com sucesso!",
      description: "Ficha de emergência finalizada com sucesso.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    router.push("/dashboard");
  };

  const onContinue = () => {
    toast({
      title: "Ficha finalizada com sucesso!",
      description: "Ficha de emergência finalizada com sucesso.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    router.push("/dashboard");
  };

  if (status === "loading") return <Spinner />;
  if (status === "error") return <div>something went wrong</div>;

  console.log(order);

  return (
    <Container maxW={1200} mt={8} mb={4}>
      <Button
        leftIcon={<ArrowBackIcon />}
        mb={4}
        onClick={() => router.back()}
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
          Detalhes da ficha de emergência
        </Heading>
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
          <Text mr={2}>Detalhes da emergência:</Text>
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
      </Box>
      <Heading as="h4" size="lg">
        Finalizar ficha de emergência
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack mt={4} spacing={3}>
          <Input
            placeholder="Data de saída"
            {...register("finishDate", { required: true })}
            isInvalid={errors.finishDate}
          />
          <Input
            placeholder="Horário de saída"
            {...register("finishTime", { required: true })}
            isInvalid={errors.finishTime}
          />
          <Input
            placeholder="Prazo recomendado para retorno"
            {...register("returnAfter", { required: true })}
            isInvalid={errors.returnAfter}
          />
          <Input
            placeholder="Médico responsável"
            {...register("doctor", { required: true })}
            isInvalid={errors.doctor}
          />
          <Textarea
            placeholder="Sugestões ao paciente"
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
          //   isLoading={isLoading}
          //   disabled={isLoading}
        >
          Finalizar ficha
        </Button>
      </form>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Box display="flex" alignItems="center">
              <WarningIcon mr={2} color="orange.500" />
              <Text color="orange.500">Atenção</Text>
            </Box>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <Text mb={2} fontWeight="bold">
              Usuário criado com sucesso.
            </Text>
            <Text>
              Antes de continuar, certifique-se de que você anotou as
              credenciais do cliente.{" "}
              <Text fontWeight="bold" my={4}>
                Essas informações não serão exibidas novamente.
              </Text>
            </Text>
            <Box mt={2}>
              <Alert status="warning" borderRadius={4}>
                <Box fontSize="14">
                  <Box mb={3} display="flex">
                    CPF do usuário:
                    <Text ml={2} fontWeight="bold">
                      420132788848
                    </Text>
                  </Box>
                  <Box mb={3} display="flex">
                    Senha do usuário:
                    <Text ml={2} fontWeight="bold">
                      nFfdAffdD
                    </Text>
                  </Box>
                </Box>
              </Alert>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onContinue}>
              Continuar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

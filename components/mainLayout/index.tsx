import styled from "@emotion/styled";
import { FC } from "react";
import HmvLogo from "../../public/logo-hmv.jpeg";
import Image from "next/image";
import { Box, Flex, Text } from "@chakra-ui/react";
import cookie from "cookie";
import { useRouter } from "next/router";

const Menu = styled(Box)`
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.2);
`;

export const MainLayout: FC = ({ children }) => {
  const router = useRouter();

  const onLogout = () => {
    document.cookie = cookie.serialize("_jwt", "");
    router.push("/");
  };

  return (
    <div>
      <Menu p="0.25rem" paddingX={["0.5rem", "1rem"]}>
        <Flex alignItems="center">
          <Box
            display="flex"
            alignItems="center"
            onClick={() => router.push("/dashboard")}
            cursor="pointer"
          >
            <Image
              src={HmvLogo}
              alt="Hospital Moinho dos ventos"
              width={50}
              height={50}
            />
            <Text cursor="pointer" marginLeft={0} fontWeight="bold">
              HMV
            </Text>
          </Box>
          <Box p={4} marginLeft="auto" cursor="pointer" onClick={onLogout}>
            <Text fontSize="14" textTransform="uppercase">
              Sair
            </Text>
          </Box>
        </Flex>
      </Menu>
      {children}
    </div>
  );
};

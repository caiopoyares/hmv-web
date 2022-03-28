import { Box, Spinner } from "@chakra-ui/react";

export const Loading = () => (
  <Box
    position="absolute"
    height="100vh"
    left="50%"
    transform="translate(-50%, 40%)"
  >
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
    />
  </Box>
);

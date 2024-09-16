import React, { useState } from "react";
import { ChakraProvider, Box, Button, Spinner, Text, VStack } from "@chakra-ui/react";
import { FaPowerOff } from "react-icons/fa";

const ConnectButton = () => {
  const [status, setStatus] = useState("disconnected"); // Possible values: disconnected, connecting, connected

  const handleClick = () => {
    if (status === "disconnected") {
      setStatus("connecting");
      // Simulate connecting process
      setTimeout(() => {
        setStatus("connected");
      }, 3000); // 3-second delay to simulate connecting
    } else if (status === "connected") {
      setStatus("disconnected");
    }
  };

  return (
    <Box
      w="100vw"
      h="100vh"
      bgGradient="linear(to-r, teal.500, green.500)"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
    <VStack spacing={4} align="center">
      <Box
        w="300px"
        h="300px"
        bgGradient="linear(to-r, purple.500, purple.300)"
        borderRadius="full"
        display="flex"
        justifyContent="center"
        alignItems="center"
        boxShadow="lg"
        position="relative"
        mt={20}
      >
        <Button
          onClick={handleClick}
          isDisabled={status === "connecting"}
          colorScheme="purple"
          size="lg"
          height="100px"
          width="100px"
          borderRadius="full"
          fontSize="4xl"
          p={8}
          position="relative"
          leftIcon={
            status === "connecting" ? (
              <Spinner size="lg" />
            ) : (
              <FaPowerOff />
            )
          }
        >
          {status === "disconnected" && "Tap to Connect"}
          {status === "connecting" && "Connecting..."}
          {status === "connected" && "Connected"}
        </Button>
      </Box>

      <Box mt={4}>
        <Text fontSize="lg" color="gray.600">
          {status === "disconnected" && "Tap to connect"}
          {status === "connecting" && "Please wait while connecting..."}
          {status === "connected" && "You're connected. Tap to disconnect"}
        </Text>
      </Box>
    </VStack>
    </Box>
  );
};

const App = () => (
  <ChakraProvider>
    <ConnectButton />
  </ChakraProvider>
);

export default App;

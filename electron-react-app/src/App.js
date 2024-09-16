import React, { useState } from "react";
import { ChakraProvider, Box, Button, Spinner, Text, VStack } from "@chakra-ui/react";
import { FaPowerOff } from "react-icons/fa";

const ConnectButton = () => {
  const [status, setStatus] = useState("disconnected");

  const handleClick = async () => {
    if (status === "disconnected") {
      setStatus("connecting");
      try {
        const result = await window.electronAPI.startBroadcasting();
        if (result === 'connected') {
          await window.electronAPI.startWebSocketServer();
          await window.electronAPI.stopBroadcasting();
          setStatus("connected");
        }
      } catch (error) {
        console.error('Failed to start broadcasting:', error);
        setStatus("disconnected");
      }
    } else if (status === "connected") {
      try {
        await window.electronAPI.stopWebSocketServer();
        const result = await window.electronAPI.startBroadcasting();
        if (result === 'connected') {
          setStatus("disconnected");
        }
      } catch (error) {
        console.error('Failed to stop broadcasting:', error);
      }
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
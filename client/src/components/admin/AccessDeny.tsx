import { Box, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const AccessDeny = () => {
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => Math.max(prev - 1, 0));
    }, 1000);

    const redirectTimeout = setTimeout(() => {
      window.location.href = "/";
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(redirectTimeout);
    };
  }, []);

  return (
    <Box textAlign="center" mt={10}>
      <Heading as="h1" mb={4}>Access Denied</Heading>
      <Text mb={2}>
        You don't have permission to access "https://callofdragonswiki.com/admin" on this server.
      </Text>
      <Text>Redirecting to home page in {seconds}...</Text>
    </Box>
  );
};

export default AccessDeny;

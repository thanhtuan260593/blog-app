import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Center,
} from "@chakra-ui/react";
import React from "react";
export const NotAuthorized = () => (
  <Box px={8}>
    <Center>
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        rounded="md"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Not authrorized
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          Tài khoản của bạn không được phép truy cập khu vực này
        </AlertDescription>
      </Alert>
    </Center>
  </Box>
);

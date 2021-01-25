import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
} from "@chakra-ui/react";
import { useReactOidc } from "@axa-fr/react-oidc-context";
import React from "react";
import queryString from "query-string";
export const NotAuthenticated = () => {
  const { login } = useReactOidc();
  const query = queryString.parse(window.location.search);
  const message = query.message as string;
  return (
    <Box>
      <Center>
        <Alert
          status="error"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="200px"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Not authenticated
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            <Box>{message.replace("+", " ")}</Box>
            <Box>Bạn phải đăng nhập để truy cập đường dẫn này</Box>
            <Button variant="link" onClick={() => login()}>
              Đăng nhập
            </Button>
          </AlertDescription>
        </Alert>
      </Center>
    </Box>
  );
};

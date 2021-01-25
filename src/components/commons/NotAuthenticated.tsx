import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { useReactOidc } from "@axa-fr/react-oidc-context";
import React from "react";
import { useHistory } from "react-router-dom";
import { MdArrowBack, MdPermIdentity } from "react-icons/md";
export const NotAuthenticated = () => {
  const { login } = useReactOidc();
  const history = useHistory();
  return (
    <Box px={8}>
      <Center>
        <Alert
          rounded="md"
          status="error"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Not authenticated
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            <Box>Bạn phải đăng nhập để truy cập trang này</Box>
            <HStack mt={12} spacing={6} justify="center" w="100%">
              <Button
                leftIcon={<Icon as={MdArrowBack} />}
                variant="link"
                onClick={() => history.goBack()}
              >
                Trở về
              </Button>
              <Button
                leftIcon={<Icon as={MdPermIdentity} />}
                variant="link"
                onClick={() => login()}
              >
                Đăng nhập
              </Button>
            </HStack>
          </AlertDescription>
        </Alert>
      </Center>
    </Box>
  );
};

import React from "react";
import { OidcSecure, useReactOidc } from "@axa-fr/react-oidc-context";
import { PostsByUser } from "components/post/PostsByUser";
import { Center, Spinner } from "@chakra-ui/react";
const Page = () => {
  const { oidcUser } = useReactOidc();
  if (oidcUser == null)
    return (
      <Center>
        <Spinner />
      </Center>
    );
  return <PostsByUser user={oidcUser.profile.sub} />;
};
export const MyPostsPage = () => {
  return (
    <OidcSecure>
      <Page />
    </OidcSecure>
  );
};

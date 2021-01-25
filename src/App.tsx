import React from "react";
import { Footer } from "components/layout/Footer";
import { Switch, Route, Redirect } from "react-router-dom";
import "styles/App.css";
import { routes } from "constants/routes";
import { Box, ChakraProvider, Flex, Center, Spinner } from "@chakra-ui/react";
import { NavMenu } from "components/layout/NavMenu";
import "moment/locale/vi";
import Moment from "react-moment";
import { LoginCallback } from "page/LoginCallback";
import { TagProvider } from "components/tag/TagProvider";
import { AuthenticationProvider, oidcLog } from "@axa-fr/react-oidc-context";
import { NotAuthorized } from "page/NotAuthorized";
import { NotAuthenticated } from "page/NotAuthenticated";
import { oidcConfiguration } from "constants/oidcConfiguration";
Moment.globalLocale = "vi";
const RedirectHome = () => <Redirect to="/" />;
const rootRoutes = [
  routes.home,
  routes.user,
  routes.search,
  routes.admin,
  routes.me,
  routes.post,
  routes.tag,
];
const Loading = () => (
  <Center>
    <Spinner />
  </Center>
);
function App() {
  return (
    <ChakraProvider>
      <AuthenticationProvider
        // isEnabled={false}
        loggerLevel={oidcLog.DEBUG}
        configuration={oidcConfiguration}
        notAuthenticated={NotAuthenticated}
        notAuthorized={NotAuthorized}
        authenticating={Loading}
        callbackComponentOverride={Loading}
        sessionLostComponent={Loading}
      >
        <TagProvider>
          <Flex
            pb={6}
            w="100%"
            h="100%"
            pt={20}
            bgColor="gray.100"
            color="gray.600"
          >
            <NavMenu />
            <Box w="100%" pb={20}>
              <Switch>
                {rootRoutes.map((route) => {
                  return (
                    <Route
                      key={route.path}
                      exact={route.exact}
                      path={route.path}
                      component={route.component}
                    />
                  );
                })}
                <Route path="/callback" component={LoginCallback} />
                <Route path="/" component={RedirectHome} />
              </Switch>
            </Box>
            <Footer />
          </Flex>
        </TagProvider>
      </AuthenticationProvider>
    </ChakraProvider>
  );
}

export default App;

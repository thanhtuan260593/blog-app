import React, { Suspense, useState } from "react";
import { Footer } from "layout/Footer";
import { Header } from "layout/Header";
import { Switch, Route } from "react-router-dom";
import "../node_modules/normalize.css/normalize.css";
import "../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css";
import "../node_modules/@blueprintjs/core/lib/css/blueprint.css";
import "styles/App.scss";
import { Slideshow } from "components/Slideshow/Slideshow";
import useScreenSize, { ScreenSize } from "layout/useScreenSize";
import { routes } from "constants/routes";
import {
  Breadcrumbs,
  BreadscrumbContext,
} from "components/Commons/Breadscrumbs";
import { IBreadcrumbProps } from "@blueprintjs/core";

const renderLoader = () => <p>Loading</p>;
function App() {
  const [breadscrumbs, setBreadscrumbs] = useState<IBreadcrumbProps[]>([]);
  const size = useScreenSize();
  return (
    <div className="App">
      <Header />
      <section className="app-content">
        {size === ScreenSize.LARGE && <Slideshow />}
        <Suspense fallback={renderLoader}>
          <Route path="/">
            <BreadscrumbContext.Provider
              value={{
                breadscrumbs,
                setBreadscrumbs,
              }}
            >
              <Breadcrumbs />
              <Switch>
                {Object.keys(routes).map((key) => {
                  const route = routes[key];
                  return (
                    <Route
                      key={route.path}
                      exact={route.exact}
                      path={route.path}
                      component={route.component}
                    />
                  );
                })}
              </Switch>
            </BreadscrumbContext.Provider>
          </Route>
        </Suspense>
      </section>
      <Footer />
    </div>
  );
}

export default App;

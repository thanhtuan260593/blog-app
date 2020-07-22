import React from "react";
import "styles/App.css";
import { Footer } from "layout/Footer";
import { Header } from "layout/Header";
import { Home } from "views/Home";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "../node_modules/normalize.css/normalize.css";
import "../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css";
import "../node_modules/@blueprintjs/core/lib/css/blueprint.css";
import { ComposePost } from "views/ComposePost";
import { PostView } from "views/Post";
import * as dotenv from "dotenv";
import { UpdatePost } from "views/UpdatePost";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <section className="content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/create" component={ComposePost} />
            <Route exact path="/update/:id" component={UpdatePost} />
            <Route exact path="/post/:id" component={PostView} />
          </Switch>
        </section>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

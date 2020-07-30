import React from "react";
import { Footer } from "layout/Footer";
import { Header } from "layout/Header";
import { Home } from "views/Home";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "../node_modules/normalize.css/normalize.css";
import "../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css";
import "../node_modules/@blueprintjs/core/lib/css/blueprint.css";
import "styles/App.scss";
import { ComposePost } from "views/ComposePost";
import { PostDetailView } from "views/PostDetail";
import { UpdatePost } from "views/UpdatePost";
import { Slideshow } from "components/Slideshow/Slideshow";
import useScreenSize, { ScreenSize } from "layout/useScreenSize";
import { PostTagView } from "views/PostTag";

function App() {
  const size = useScreenSize();
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <section className="app-content">
          {size === ScreenSize.LARGE && <Slideshow />}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/post/tags" component={PostTagView} />
            <Route exact path="/create" component={ComposePost} />
            <Route exact path="/post/update/:id" component={UpdatePost} />
            <Route exact path="/post/:id" component={PostDetailView} />
          </Switch>
        </section>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

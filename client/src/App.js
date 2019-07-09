import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Redux
import { Provider } from "react-redux";
import store from "./store";

//Components
import Landing from "./components/Landing";
import NavbarTop from "./components/layout/NavbarTop";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <NavbarTop />
        <Switch>
          <Route exact path="/" component={Landing} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;

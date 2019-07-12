import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

//redux
import { Provider } from "react-redux";
import store from "./store";

//Read Bootstrap css//
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();

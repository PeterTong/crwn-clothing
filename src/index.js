import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
// Provider is a component that we want to wrap around the entire application,
// so everything can access to this store object
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "./index.css";
import App from "./App";

import { store, persistor } from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>,

  document.getElementById("root")
);

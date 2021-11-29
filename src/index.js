import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// curl 'https://calendarific.com/api/v2/holidays?&api_key=43f7a270aab91991f5eadc812d397f3ea9def7d7&country=US&year=2019'

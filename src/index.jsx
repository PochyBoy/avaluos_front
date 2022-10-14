import "react-app-polyfill/ie11";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
//import * as serviceWorker from './serviceWorker';
import { HashRouter } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
// Redux Toolkip
import { Provider } from "react-redux";
import { store } from "./store";
import axios from "axios"
axios.defaults.baseURL=process.env.REACT_APP_API || "http://localhost:3001";
ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <ScrollToTop>
        <App/>
      </ScrollToTop>
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();

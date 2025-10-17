import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";

import App from "@src/App";

import { store } from "@src/app/store";

import "@src/index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <App></App>
  </Provider>
);

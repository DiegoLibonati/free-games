import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";

import { GamesRouter } from "@/router/GamesRouter";

import { store } from "@/app/store";

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <GamesRouter></GamesRouter>
      </HashRouter>
    </Provider>
  );
}

export default App;

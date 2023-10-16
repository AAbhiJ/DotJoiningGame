import * as React from "react";
import { Provider } from "react-redux";
import "./App.css";

import { BrowserRouter } from "react-router-dom";
import RootNavigator from "./routes/RootNavigator";
import { store } from "./store";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
      <Provider store={store}>
        <RootNavigator />
        {/* <Dashboard /> */}
      </Provider>
      </BrowserRouter>
    </>
  );
};

export default App;

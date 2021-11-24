import React from "react";
import Main from "./components/MainComponent";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore";

const store = ConfigureStore();

export default function App() {
  return (
    /* wrapping Main inside Provider and passing the store to Provider component as a prop, 
    gives MainComponent ability to connect to redux store */
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

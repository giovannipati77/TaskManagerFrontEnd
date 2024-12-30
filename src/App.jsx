import React from "react";
import "./App.css";
import TaskScreen from "./screen/TaskScreen";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <div className="mx-auto pt-5 max-sm:pt-0">
        <TaskScreen />
      </div>
    </Provider>
  );
}

export default App;

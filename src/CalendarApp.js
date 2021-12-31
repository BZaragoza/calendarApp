import React from "react";
import { Provider } from "react-redux";
import AppRouter from "./Router/AppRouter";

import { store } from './redux/store/store'

const CalendarApp = () => {
  return (
    <Provider store={store}>
      <div>
        <AppRouter />
      </div>
    </Provider>
  );
};

export default CalendarApp;

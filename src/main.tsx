import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/tooltip';
import 'react-calendar/dist/Calendar.css';

import { Provider } from "react-redux";
import store, { persistor } from "./store";

import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>

      <App />

    </PersistGate>
  </Provider>
  ,)

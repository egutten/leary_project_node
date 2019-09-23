import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import reducers from './store/reducers';
import thunk from 'redux-thunk';
import {persistReducer, persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/lib/integration/react';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2
};
const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer, compose(applyMiddleware(thunk)));

const persistor = persistStore(store);

const app = (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
serviceWorker.unregister();

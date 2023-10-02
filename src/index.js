import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import configureStore from './Components/Authentication';
import * as sessionActions from './Components/Authentication/session';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { createRoot } from 'react-dom/client';

const store = configureStore();

const renderApplication = () => {
  const root = createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <QueryParamProvider adapter={ReactRouter6Adapter}>
            <App />
          </QueryParamProvider>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
};

if (
  sessionStorage.getItem('currentUser') === null ||
  sessionStorage.getItem('X-CSRF-Token') === null
) {
  store.dispatch(sessionActions.restoreSession()).then(renderApplication);
} else {
  renderApplication();
}

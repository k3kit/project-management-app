import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './components/ErrorFallback/ErrorFallback';
const store = setupStore();
import './i18n';
import { Typography } from '@mui/material';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ErrorBoundary fallbackRender={ErrorFallback}>
        <Suspense>
          <App />
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  </Provider>
);

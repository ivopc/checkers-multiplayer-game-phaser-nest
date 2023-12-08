/// <reference path="./definitions.ts" />
import * as Sentry from '@sentry/react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './app';
import './i18n/i18n';
import './index.css';
import { store } from './store/index';

Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN,
  environment: process.env.VITE_NODE_ENV,
  integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.5,
  replaysOnErrorSampleRate: 1.0,
})

const container = document.getElementById('root')!;
createRoot(container).render(
  <Provider store={store}>
    <App />
  </Provider>,
);

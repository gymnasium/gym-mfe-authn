import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';

import {
  APP_INIT_ERROR, APP_READY, initialize, initError, mergeConfig, subscribe,
} from '@edx/frontend-platform';

import { ErrorPage } from '@openedx/gym-frontend';

import configuration from './config';
import messages from './i18n';
import GymApp from './GymApp';

subscribe(APP_READY, () => {
  ReactDOM.render(
    <GymApp />,
    document.getElementById('root'),
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
});

initialize({
  handlers: {
    config: () => {
      mergeConfig(configuration);
    },
  },
  messages,
});

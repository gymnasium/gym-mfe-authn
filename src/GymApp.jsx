import React from 'react';

import { getConfig } from '@edx/frontend-platform';
import { AppProvider } from '@edx/frontend-platform/react';
import { Helmet } from 'react-helmet';
import { Redirect, Route, Switch } from 'react-router-dom';
import { GymHeader, messages as headerMessages } from '@edx/frontend-component-header';
import Footer, { messages as footerMessages } from '@edx/frontend-component-footer';
// import { GymHeader, messages as headerMessages } from '../frontend-component-header/src';
// import Footer, { messages as footerMessages } from '../frontend-component-footer/src';

import {
  Logistration, NotFoundPage, registerIcons, UnAuthOnlyRoute,
} from './common-components';
import configureStore from './data/configureStore';
import {
  AUTHN_PROGRESSIVE_PROFILING,
  LOGIN_PAGE,
  PAGE_NOT_FOUND,
  PASSWORD_RESET_CONFIRM,
  RECOMMENDATIONS,
  REGISTER_PAGE,
  RESET_PAGE,
} from './data/constants';
import { updatePathWithQueryParams } from './data/utils';
import { ForgotPasswordPage } from './forgot-password';
import { ProgressiveProfiling } from './progressive-profiling';
import { RecommendationsPage } from './recommendations';
import { ResetPasswordPage } from './reset-password';
import './index.scss';

const config = getConfig();
const settings = `${config.MARKETING_SITE_BASE_URL}/feeds/config.json`;
const css = `${config.MARKETING_SITE_BASE_URL}/css/mfe.css`;

registerIcons();

const MainApp = () => (
  <AppProvider store={configureStore()}>
    <Helmet>
      <link rel="shortcut icon" href={config.FAVICON_URL} type="image/x-icon" />
      <link rel="stylesheet" href={css} />
    </Helmet>
    <>
      <GymHeader secondaryNav={false} />
      <Switch>
        <Route exact path="/">
          <Redirect to={updatePathWithQueryParams(REGISTER_PAGE)} />
        </Route>
        <UnAuthOnlyRoute exact path={LOGIN_PAGE} render={() => <Logistration selectedPage={LOGIN_PAGE} />} />
        <UnAuthOnlyRoute exact path={REGISTER_PAGE} component={Logistration} />
        <UnAuthOnlyRoute exact path={RESET_PAGE} component={ForgotPasswordPage} />
        <Route exact path={PASSWORD_RESET_CONFIRM} component={ResetPasswordPage} />
        <Route exact path={AUTHN_PROGRESSIVE_PROFILING} component={ProgressiveProfiling} />
        <Route exact path={RECOMMENDATIONS} component={RecommendationsPage} />
        <Route path={PAGE_NOT_FOUND} component={NotFoundPage} />
        <Route path="*">
          <Redirect to={PAGE_NOT_FOUND} />
        </Route>
      </Switch>
      <Footer />
    </>
  </AppProvider>
);

export default MainApp;

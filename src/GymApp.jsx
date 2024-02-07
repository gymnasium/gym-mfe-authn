import React from 'react';

import { getConfig } from '@edx/frontend-platform';
import { AppProvider } from '@edx/frontend-platform/react';
import { Helmet } from 'react-helmet';
import { Navigate, Route, Routes } from 'react-router-dom';

import GymSettings, { GymFooter, GymHeader } from './gym-frontend-components';
const config = getConfig();
const timestamp = Date.now();
const settings = await GymSettings;
const root = settings.urls.root; // should be same as marketing URL
const css = `${root}${settings.css.mfe}?${timestamp}`;

import {
  EmbeddedRegistrationRoute, NotFoundPage, registerIcons, UnAuthOnlyRoute, Zendesk,
} from './common-components';
import configureStore from './data/configureStore';
import {
  AUTHN_PROGRESSIVE_PROFILING,
  LOGIN_PAGE,
  PAGE_NOT_FOUND,
  PASSWORD_RESET_CONFIRM,
  RECOMMENDATIONS,
  REGISTER_EMBEDDED_PAGE,
  REGISTER_PAGE,
  RESET_PAGE,
} from './data/constants';
import { updatePathWithQueryParams } from './data/utils';
import { ForgotPasswordPage } from './forgot-password';
import Logistration from './logistration/Logistration';
import { ProgressiveProfiling } from './progressive-profiling';
import { RecommendationsPage } from './recommendations';
import { RegistrationPage } from './register';
import { ResetPasswordPage } from './reset-password';

import './index.scss';

registerIcons();

const GymApp = () => (
  <AppProvider store={configureStore()}>
    <Helmet>
      <link rel="shortcut icon" href={getConfig().FAVICON_URL} type="image/x-icon" />
      <link rel="stylesheet" href={css} />
    </Helmet>

    <GymHeader />
    <main><div className="container"> 

    <Routes>
      <Route path="/" element={<Navigate replace to={updatePathWithQueryParams(REGISTER_PAGE)} />} />
      <Route
        path={REGISTER_EMBEDDED_PAGE}
        element={<EmbeddedRegistrationRoute><RegistrationPage /></EmbeddedRegistrationRoute>}
      />
      <Route
        path={LOGIN_PAGE}
        element={
          <UnAuthOnlyRoute><Logistration selectedPage={LOGIN_PAGE} /></UnAuthOnlyRoute>
        }
      />
      <Route path={REGISTER_PAGE} element={<UnAuthOnlyRoute><Logistration /></UnAuthOnlyRoute>} />
      <Route path={RESET_PAGE} element={<UnAuthOnlyRoute><ForgotPasswordPage /></UnAuthOnlyRoute>} />
      <Route path={PASSWORD_RESET_CONFIRM} element={<ResetPasswordPage />} />
      <Route path={AUTHN_PROGRESSIVE_PROFILING} element={<ProgressiveProfiling />} />
      <Route path={RECOMMENDATIONS} element={<RecommendationsPage />} />
      <Route path={PAGE_NOT_FOUND} element={<NotFoundPage />} />
      <Route path="*" element={<Navigate replace to={PAGE_NOT_FOUND} />} />
    </Routes>
    </div></main>
    <GymFooter />
  </AppProvider>
);

export default GymApp;

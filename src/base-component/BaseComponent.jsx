import React from 'react';

import CookiePolicyBanner from '@edx/frontend-component-cookie-policy-banner';
import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { getLocale } from '@edx/frontend-platform/i18n';
import { breakpoints } from '@edx/paragon';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';

import dompurify from 'dompurify';
import GymSettings from '../gym-frontend-components';
const settings = await GymSettings;
const welcomeMessage = { __html: dompurify.sanitize(settings?.messages.mfe.authn.welcome) };

const BaseComponent = ({ children, showWelcomeBanner }) => {
  const authenticatedUser = showWelcomeBanner ? getAuthenticatedUser() : null;
  const username = authenticatedUser ? authenticatedUser.username : null;

  return (
    <>
      {getConfig().ENABLE_COOKIE_POLICY_BANNER ? <CookiePolicyBanner languageCode={getLocale()} /> : null}
      <div className="layout">
        {showWelcomeBanner && (welcomeMessage !== null | undefined) ? (
          <div dangerouslySetInnerHTML={welcomeMessage} />
        ) : null }
        
        <div className={classNames('content', { 'align-items-center': authenticatedUser })}>
          {children}
        </div>
      </div>
    </>
  );
};

BaseComponent.defaultProps = {
  showWelcomeBanner: false,
};

BaseComponent.propTypes = {
  children: PropTypes.node.isRequired,
  showWelcomeBanner: PropTypes.bool,
};

export default BaseComponent;

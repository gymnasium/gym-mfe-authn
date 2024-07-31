import React from 'react';

import { getConfig } from '@edx/frontend-platform';
import { breakpoints } from '@openedx/paragon';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';

import { DefaultLargeLayout, DefaultMediumLayout, DefaultSmallLayout } from './components/default-layout';

import { AuthLargeLayout, AuthMediumLayout, AuthSmallLayout } from './components/welcome-page-layout';

const GymContainer = ({ children, showWelcomeBanner, fullName }) => {
  const enableImageLayout = getConfig().ENABLE_IMAGE_LAYOUT;

  if (enableImageLayout) {
    return (
      <div className="layout">
        <div className={classNames('content', { 'align-items-center mt-0': showWelcomeBanner })}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="layout">
      <MediaQuery maxWidth={breakpoints.small.maxWidth - 1}>
        {showWelcomeBanner ? <AuthSmallLayout fullName={fullName} /> : <DefaultSmallLayout />}
      </MediaQuery>
      <MediaQuery minWidth={breakpoints.medium.minWidth} maxWidth={breakpoints.large.maxWidth - 1}>
        {showWelcomeBanner ? <AuthMediumLayout fullName={fullName} /> : <DefaultMediumLayout />}
      </MediaQuery>
      <MediaQuery minWidth={breakpoints.extraLarge.minWidth}>
        {showWelcomeBanner ? <AuthLargeLayout fullName={fullName} /> : <DefaultLargeLayout />}
      </MediaQuery>
      <div className={classNames('content', { 'align-items-center mt-0': showWelcomeBanner })}>
        {children}
      </div>
    </div>
  );
};

GymContainer.defaultProps = {
  showWelcomeBanner: false,
  fullName: null,
};

GymContainer.propTypes = {
  children: PropTypes.node.isRequired,
  showWelcomeBanner: PropTypes.bool,
  fullName: PropTypes.string,
};

export default GymContainer;

import React, { useEffect, useState } from 'react';

import { ensureConfig, getConfig } from '@edx/frontend-platform';

import { htmlDecode } from '@edx/gym-frontend';

import PropTypes from 'prop-types';

import dompurify from 'dompurify';

ensureConfig(['GYM_AUTHN_WELCOME_MSG'], 'GymContainer');

const getWelcomeMsg = () => getConfig().GYM_AUTHN_WELCOME_MSG;
const decodedMsg = () => htmlDecode(getWelcomeMsg());

const GymContainer = ({ children, showWelcomeBanner, username }) => {
  const [baseContainerVersion, setBaseContainerVersion] = useState();

  const welcomeMsg = { __html: dompurify.sanitize(decodedMsg()) };

  return (
    <main>
      <div className="container"> 
        <div className="gym-layout layout">
          {showWelcomeBanner && welcomeMsg && (
            <div className="welcome-message" dangerouslySetInnerHTML={ welcomeMsg } />
          )}

          <div className='content'>
            {children}
          </div>
        </div>
      </div>
    </main>

  );
};

GymContainer.defaultProps = {
  showWelcomeBanner: false,
  username: null,
};

GymContainer.propTypes = {
  children: PropTypes.node.isRequired,
  showWelcomeBanner: PropTypes.bool,
  username: PropTypes.string,
};

export default GymContainer;

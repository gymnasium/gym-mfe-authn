import React, { useEffect, useState } from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';

import dompurify from 'dompurify';
import GymSettings from '@edx/gym-frontend';
const settings = await GymSettings;
const welcomeMessage = { __html: dompurify.sanitize(settings?.messages.mfe.authn.welcome) };

const GymContainer = ({ children, showWelcomeBanner, username }) => {
  const [baseContainerVersion, setBaseContainerVersion] = useState();

  useEffect(() => {
    const initRebrandExperiment = () => {
      if (window.experiments?.rebrandExperiment) {
        setBaseContainerVersion(window.experiments?.rebrandExperiment?.variation);
      } else {
        window.experiments = window.experiments || {};
        window.experiments.rebrandExperiment = {};
        window.experiments.rebrandExperiment.handleLoaded = () => {
          setBaseContainerVersion(window.experiments?.rebrandExperiment?.variation);
        };
      }
    };
    initRebrandExperiment();
  }, []);

  return (
    <main>
      <div className="container"> 
        <div className="gym-layout layout">
          {showWelcomeBanner && (welcomeMessage !== null | undefined) ? (
              <div className="welcome-message" dangerouslySetInnerHTML={welcomeMessage} />
            ) : null }
          <div className={classNames('content', { 'align-items-center mt-0': showWelcomeBanner })}>
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

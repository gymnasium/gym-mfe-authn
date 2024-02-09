import React, { useEffect, useState } from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';

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
    <div className="layout">
      <div className={classNames('content', { 'align-items-center mt-0': showWelcomeBanner })}>
        {children}
      </div>
    </div>
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

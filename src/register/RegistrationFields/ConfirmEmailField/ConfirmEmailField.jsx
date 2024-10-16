import React from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import PropTypes from 'prop-types';

import { FormGroup } from '../../../common-components';
import messages from '../../messages';
import validateConfirmEmail from './validator';

const ConfirmEmailField = (props) => {
  const { formatMessage } = useIntl();
  const {
    name,
    value,
    emailValue,
    handleChange,
    handleErrorChange,
    errorMessage,
  } = props;

  const handleOnBlur = (e) => {
    const { value: confirmEmailValue } = e.target;
    const error = validateConfirmEmail(confirmEmailValue, emailValue, formatMessage);
    handleErrorChange(name, error);
  };

  const handleOnFocus = () => {
    handleErrorChange(name, '');
  };

  return (
    <FormGroup
      name={name}
      value={value}
      handleChange={handleChange}
      handleBlur={handleOnBlur}
      handleFocus={handleOnFocus}
      errorMessage={errorMessage}
      floatingLabel={formatMessage(messages['registration.confirm.email.label'])}
    />
  );
};

ConfirmEmailField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  emailValue: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleErrorChange: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

export default ConfirmEmailField;

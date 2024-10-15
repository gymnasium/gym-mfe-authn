import React from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import PropTypes from 'prop-types';

import { FormGroup } from '../../../common-components';
import messages from '../../messages';
import validateConfirmEmail from './validator';

const ConfirmEmailField = (props) => {
  const { formatMessage } = useIntl();
  const {
    value,
    emailValue,
    handleChange,
    handleErrorChange,
  } = props;

  const handleOnBlur = (e) => {
    const { value: confirmEmailValue } = e.target;
    const error = validateConfirmEmail(confirmEmailValue, emailValue, formatMessage);
    handleErrorChange('confirm_email', error);
  };

  const handleOnFocus = () => {
    handleErrorChange('confirm_email', '');
  };

  return (
    <FormGroup
      {...props}
      handleBlur={handleOnBlur}
      handleFocus={handleOnFocus}
      handleChange={handleChange}
      floatingLabel={formatMessage(messages['registration.confirm.email.label'])}
    />
  );
};

ConfirmEmailField.propTypes = {
  value: PropTypes.string.isRequired,
  emailValue: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleErrorChange: PropTypes.func.isRequired,
};

export default ConfirmEmailField;
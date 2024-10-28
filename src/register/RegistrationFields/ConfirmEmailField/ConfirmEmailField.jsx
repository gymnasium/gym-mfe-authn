import React from 'react';
import { useDispatch } from 'react-redux';
import { useIntl } from '@edx/frontend-platform/i18n';
import PropTypes from 'prop-types';
import validateConfirmEmail from './validator';
import { FormGroup } from '../../../common-components';
import { clearRegistrationBackendError } from '../../data/actions';
const ConfirmEmailField = (props) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const {
    handleChange,
    handleErrorChange,
    emailValue,
  } = props;
  const handleOnBlur = (e) => {
    const { value } = e.target;
    const fieldError = validateConfirmEmail(value, emailValue, formatMessage);
    if (fieldError) {
      handleErrorChange('confirm_email', fieldError);
    }
  };
  const handleOnFocus = () => {
    handleErrorChange('confirm_email', '');
    dispatch(clearRegistrationBackendError('confirm_email'));
  };
  return (
    <FormGroup
      {...props}
      handleBlur={handleOnBlur}
      handleFocus={handleOnFocus}
    />
  );
};
ConfirmEmailField.propTypes = {
  emailValue: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleErrorChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
};
ConfirmEmailField.defaultProps = {
  errorMessage: '',
};
export default ConfirmEmailField;
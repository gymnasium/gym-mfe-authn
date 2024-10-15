import messages from '../../messages';

const validateConfirmEmail = (value, emailValue, formatMessage) => {
  let error = '';
  if (!value) {
    error = formatMessage(messages['empty.confirm.email.field.error']);
  } else if (value !== emailValue) {
    error = formatMessage(messages['email.do.not.match']);
  }
  return error;
};

export default validateConfirmEmail;
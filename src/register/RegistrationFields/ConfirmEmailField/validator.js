import messages from '../../messages';
const validateConfirmEmail = (value, emailValue, formatMessage) => {
  let fieldError = '';
  if (!value) {
    fieldError = formatMessage(messages['empty.confirm.email.field.error']);
  } else if (value !== emailValue) {
    fieldError = formatMessage(messages['email.do.not.match']);
  }
  return fieldError;
};
export default validateConfirmEmail;
import React from 'react';
import { injectIntl, IntlProvider } from '@edx/frontend-platform/i18n';
import { fireEvent, render } from '@testing-library/react';
import ConfirmEmailField from './ConfirmEmailField';

const IntlConfirmEmailField = injectIntl(ConfirmEmailField);

describe('ConfirmEmailField', () => {
  let props;

  beforeEach(() => {
    props = {
      name: 'confirm_email',
      value: '',
      emailValue: 'test@example.com',
      handleChange: jest.fn(),
      handleErrorChange: jest.fn(),
    };
  });

  it('should show an error when confirm email is empty', () => {
    const { container } = render(
      <IntlProvider locale="en">
        <IntlConfirmEmailField {...props} />
      </IntlProvider>
    );

    const confirmEmailInput = container.querySelector('input[name="confirm_email"]');
    fireEvent.blur(confirmEmailInput, { target: { value: '' } });

    expect(props.handleErrorChange).toHaveBeenCalledWith('confirm_email', 'Confirm Email field must not be empty');
  });

  it('should show an error when confirm email does not match email', () => {
    const { container } = render(
      <IntlProvider locale="en">
        <IntlConfirmEmailField {...props} />
      </IntlProvider>
    );

    const confirmEmailInput = container.querySelector('input[name="confirm_email"]');
    fireEvent.blur(confirmEmailInput, { target: { value: 'mismatch@example.com' } });

    expect(props.handleErrorChange).toHaveBeenCalledWith('confirm_email', 'The email addresses do not match.');
  });

  it('should clear error on focus', () => {
    const { container } = render(
      <IntlProvider locale="en">
        <IntlConfirmEmailField {...props} />
      </IntlProvider>
    );

    const confirmEmailInput = container.querySelector('input[name="confirm_email"]');
    fireEvent.focus(confirmEmailInput);

    expect(props.handleErrorChange).toHaveBeenCalledWith('confirm_email', '');
  });
});
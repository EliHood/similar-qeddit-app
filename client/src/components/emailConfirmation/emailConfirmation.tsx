import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GridHoc from '../hoc/grid';
import { userConfirmation } from '../../selectors/selectors';
import { resendEmailConfirmationInit } from '../../actions/userActions';

export type emailConfirmation = {
  location: any;
}

function EmailConfirmation(props: emailConfirmation) {
  const dispatch = useDispatch();
  const user = useSelector(userConfirmation);
  const resendEmail = () => dispatch(resendEmailConfirmationInit());
  const emailMessage = user || props.location.state.meta.message;

  return (
    <>
      <h3>{emailMessage}</h3>

      <span style={{ cursor: 'pointer' }} onClick={() => resendEmail()}>
        Resend Email Confirmation
      </span>
    </>
  );
}

export default GridHoc(EmailConfirmation);

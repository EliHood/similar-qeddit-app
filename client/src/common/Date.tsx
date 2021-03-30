import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import { OurDateType } from '../utils/types';

const OurDate: React.FC<OurDateType> = ({ type = 'post-date', createdAt }) => (
  <>
    {type === 'post-date' && (
      <Typography variant="subtitle1" align="left">
        {moment(createdAt).calendar()}
      </Typography>
    )}

    {type === 'comment-date' && (
      <Typography id="date" style={{ fontSize: '12px' }} variant="caption" align="left">
        {moment(createdAt).calendar()}
      </Typography>
    )}

    {type === 'reply-date' && (
      <Typography style={{ fontSize: '12px' }} variant="caption" align="left">
        {moment(createdAt).calendar()}
      </Typography>
    )}
  </>
);

export default OurDate;

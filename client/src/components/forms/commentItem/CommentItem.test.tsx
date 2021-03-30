import React from 'react';
import toJson from 'enzyme-to-json';
import {
  render, cleanup, getByText, queryByText, getAllByTestId,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import ReactMarkdown from 'react-markdown';
import Typography from '@material-ui/core/Typography';
import CommentItem from './CommentItem';
import { store } from '../../../store';

const mockProps = {
  type: 'comment',
  reply: {},
  comment: {
    gifUrl: '',
    comment_body: "I'm a body",
  },
  onReply: jest.fn(),
  user: {},
  postId: 1,
  deleteComment: jest.fn(),
  edit: jest.fn(),
  editComment: jest.fn(),
};

const mockProps2 = {
  type: 'reply',
  reply: {},
  comment: {
    gifUrl: '',
    comment_body: "I'm a body",
  },
  onReply: jest.fn(),
  user: {},
  postId: 1,
  deleteComment: jest.fn(),
  edit: jest.fn(),
  editComment: jest.fn(),
};

describe('Should test <CommentItem/>', () => {
  afterEach(cleanup);

  it('Should render <CommentItem/>', () => {
    const container = mount(
      <Provider store={store}>
        <CommentItem {...mockProps} />
      </Provider>,
    );
    expect(container).toHaveLength(1);
  });

  it('should render comment body', () => {
    const container = mount(
      <Provider store={store}>
        <CommentItem {...mockProps} />
      </Provider>,
    );
    expect(container.find('[data-testid="comment-body"]')).toHaveLength(1);
  });
  it('should render comment data', () => {
    const container = mount(
      <Provider store={store}>
        <CommentItem {...mockProps} />
      </Provider>,
    );
    expect(container.find(Typography).at(0)).toHaveLength(1);
  });

  it('should render reply content', () => {
    const container = mount(
      <Provider store={store}>
        <CommentItem {...mockProps2} />
      </Provider>,
    );
    expect(container.find('[data-testid="reply-data"]')).toHaveLength(1);
  });

  it('should render reply date', () => {
    const container = mount(
      <Provider store={store}>
        <CommentItem {...mockProps2} />
      </Provider>,
    );
    expect(
      container
        .find('[data-testid="reply-data"]')
        .find(Typography)
        .at(0),
    ).toHaveLength(1);
  });
  it('should render reply body', () => {
    const container = mount(
      <Provider store={store}>
        <CommentItem {...mockProps2} />
      </Provider>,
    );

    expect(container.find('[data-testid="reply-body"]')).toHaveLength(1);
  });
});

import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { createMount } from '@material-ui/core/test-utils';
import CommentForm from './CommentForm';

const props = {
  comment_body: 'Test',
  gifUrl: jest.fn(),
  commentChange: jest.fn(),
  isGif: '',
  onSubmit: jest.fn(),
};

describe('<CommentForm/>', () => {
  let wrapper;
  let mount;
  beforeEach(() => {
    mount = createMount();
    wrapper = mount(<CommentForm {...props} />);
  });

  it('renders the <CommentForm/>', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should test comment_body props', () => {
    // console.log(wrapper.find(TextField).debug());
    const comment_body = 'Test';
    expect(wrapper.find(TextField).props().value).toBe(comment_body);
  });

  // when using mount call  .props.onChange instead of simulate(which for shallow )
  it('should test comment_body props', () => {
    // console.log(wrapper.find(TextField).debug());
    const comment_body = 'Test';
    wrapper
      .find(TextField)
      .props()
      .onChange({
        target: {
          value: comment_body,
        },
      });
    expect(props.commentChange).toHaveBeenCalled();
  });
});

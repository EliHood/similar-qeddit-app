import React from 'react';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import FormHelperText from '@material-ui/core/FormHelperText';
import toJson from 'enzyme-to-json';
import { Button } from '@material-ui/core';
import PostForm from './createPost';
import Post from '../../post/post';

const props = {
  title: 'Test',
  postContent: 'Another content',
  handleTitleChange: jest.fn(),
  handleContentChange: jest.fn(),
  onSubmit: jest.fn(),
  disButton: false,
  titleError: '',
  bodyError: '',
};
describe('<PostForm/>', () => {
  let mount;
  let wrapper;
  beforeEach(() => {
    mount = createMount();
    wrapper = mount(<PostForm {...props} />);
  });

  it('should render <PostForm/> component', () => {
    expect(wrapper.find('form')).toHaveLength(1);
  });
  it('should render <FormHelperText/>', () => {
    expect(wrapper.find(FormHelperText).at(0)).toHaveLength(1);
  });
  it('should have title header', () => {
    expect(
      wrapper
        .find('.title')
        .at(0)
        .text(),
    ).toContain('New Post');
  });
  it('should test title props', () => {
    // console.log(wrapper.find(TextField).debug());
    const title = 'Test';
    expect(wrapper.props().title).toBe(title);
  });
  it('should test content props', () => {
    // console.log(wrapper.find(TextField).debug());
    const content = 'Another content';
    expect(wrapper.props().postContent).toBe(content);
  });
  it('should test handleTitleChange onChange', () => {
    // console.log(wrapper.find(TextField).debug());
    const title = 'Test';
    wrapper.props().handleTitleChange({
      target: {
        value: title,
      },
    });
    expect(props.handleTitleChange).toHaveBeenCalled();
  });

  it('should test handleContentChange onChange', () => {
    // console.log(wrapper.find(TextField).debug());
    const content = 'Another content';
    wrapper.props().handleContentChange({
      target: {
        value: content,
      },
    });
    expect(props.handleContentChange).toHaveBeenCalled();
  });
  it('should test onSubmit', () => {
    // console.log(wrapper.find(TextField).debug());
    const submit = jest.fn();
    wrapper.simulate('submit', { submit });
    expect(props.onSubmit).toBeCalled();
  });

  it('should test onSubmit button', () => {
    const button = wrapper.find('.MuiButton-label');
    button.simulate('click');
    expect(props.onSubmit).toBeCalled();
  });
});

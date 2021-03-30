import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import Login from './login';

describe('Should render <Login/>', () => {
  let wrapper;
  let shallow;

  beforeEach(() => {
    shallow = createShallow();
    wrapper = shallow(<Login />);
  });

  it('Should render first  textfield', () => {
    expect(wrapper.find(TextField).at(0)).toHaveLength(1);
  });

  it('Should render second textfield', () => {
    expect(wrapper.find(TextField).at(1)).toHaveLength(1);
  });

  it('Should render button', () => {
    expect(wrapper.find(Button).at(0)).toHaveLength(1);
  });
});

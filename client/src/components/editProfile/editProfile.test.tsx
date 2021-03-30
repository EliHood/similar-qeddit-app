import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { createShallow } from '@material-ui/core/test-utils';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import { store } from '../../store';
import EditProfileForm from '../forms/editProfile/editForm';
import EditProfile from './editProfile';

describe('Should render <EditProfile/>', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(
      <Provider store={store}>
        <EditProfile />
      </Provider>,
    );
  });

  it('Should render <EditProfile/>', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('Should check if EditProfile renders child component', () => {
    expect(wrapper.find('EditProfileForm')).toHaveLength(1);
  });

  it('should test bio state', () => {
    const editForm = wrapper.find('EditProfileForm');
    act(() => {
      expect(
        editForm.props().handleBio({
          target: {
            value: 'Im a bio',
          },
        }),
      );
    });
  });

  it('should test gravatar state', () => {
    const editForm = wrapper.find('EditProfileForm');
    act(() => {
      expect(
        editForm.props().handleGravatar({
          target: {
            value: 'https://i.pravatar.cc/150?img=3',
          },
        }),
      );
    });
  });
});

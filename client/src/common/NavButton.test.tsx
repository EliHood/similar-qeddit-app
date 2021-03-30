import React from 'react';
import { shallow, mount } from 'enzyme';
import NavButton from './NavButton';

describe('Should render <NavButton/>', () => {
  it('should render <NavButton/>', () => {
    const container = mount(<NavButton />);
    expect(container.find('[data-testid="nav-button-test"]')).toHaveLength(1);
  });
});

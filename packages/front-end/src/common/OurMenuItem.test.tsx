import React from 'react';
import { shallow, mount } from 'enzyme';
import { MenuItem } from '@material-ui/core';
import OurMenuItem from './OurMenuItem';

describe('should render <OurMenuItem/> component', () => {
    it('should render <OurMenuItem/>', () => {
        const container = mount(<OurMenuItem>Hi</OurMenuItem>);
        expect(container.find(MenuItem).at(0)).toHaveLength(1);
    });
});

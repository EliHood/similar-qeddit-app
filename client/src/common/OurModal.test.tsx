import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { Button } from '@material-ui/core';
import OurModal from './OurModal';

describe('Should render <OurModal/>', () => {
    let wrapper;
    const props = {
        handleClose: jest.fn(),
        open: jest.fn(),
    };
    beforeAll(() => {
        wrapper = shallow(<OurModal open />);
    });
    it('should render <OurModal/>', () => {
        expect(wrapper).toHaveLength(1);
    });
    it('should find button', () => {
        expect(wrapper).toMatchSnapshot();
    });
});

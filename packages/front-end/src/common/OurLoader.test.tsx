import React from 'react';
import { shallow, mount, render } from 'enzyme';
import OurLoader from './OurLoader';

describe('Should render loader', () => {
    let wrapper;
    beforeAll(() => {
        wrapper = mount(<OurLoader />);
    });
    it('should render loader', () => {
        expect(wrapper).toHaveLength(1);
    });
});

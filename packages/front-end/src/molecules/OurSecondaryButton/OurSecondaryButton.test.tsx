import React from 'react';
import { shallow, mount } from 'enzyme';
import Button from '@material-ui/core/Button';
import OurSecondaryButton from './OurSecondaryButton';

describe('Should render <OurSecondaryButton/>', () => {
    it('Should render the button', () => {
        const container = mount(<OurSecondaryButton>Owl</OurSecondaryButton>);
        expect(container.find(Button).at(0)).toHaveLength(1);
    });
});

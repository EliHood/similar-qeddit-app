import React from 'react';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import { shallow, render } from 'enzyme';
import { Provider } from 'react-redux';
import OurTabs from './OurTabs';
import { store } from '../../store';
import postList from '../forms/postList/postList';

describe('Should test <OurTabs/>', () => {
    let wrapper;
    let mount;
    const props = {};
    beforeEach(() => {
        mount = createMount();
        wrapper = mount(
            <Provider store={store}>
                <OurTabs {...props} />
            </Provider>,
        );
    });

    it('Should render OurTabs component', () => {
        expect(wrapper).toHaveLength(1);
    });
    it('Should find tabPanel', () => {
        expect(wrapper.find('TabPanel').at(0)).toHaveLength(1);
    });
});

import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { shallow, mount, render } from 'enzyme';
import { Provider } from 'react-redux';
import * as ReactRedux from 'react-redux';
import { Action } from 'redux';
import PostForm from '../../components/forms/createPost/createPost';
import { store } from '../../store';
import storeHooks from '../../common/storeHooks';
import { DashboardComponent as Dashboard } from './dashboard';

describe('Should test <Dashboard/> component', () => {
    let wrapper;
    // let useEffect;
    // const mockUseEffect = () => {
    //     useEffect.mockImplementationOnce((f) => f());
    // };
    const mockDispatch = jest.fn();
    const mockSelector = jest.fn();
    beforeEach(() => {
    // useEffect = jest.spyOn(React, "useEffect");
    // mockUseEffect();
        ReactRedux.useDispatch = jest.fn().mockImplementation(() => mockDispatch);
        ReactRedux.useSelector = jest.fn().mockImplementation(() => []);
        wrapper = mount(
            <Provider store={store}>
                <Dashboard />
            </Provider>,
        );
    });

    beforeEach(() => {
    // clear the mocks to refresh their calls info
        ReactRedux.useDispatch.mockClear();
        mockDispatch.mockClear();
    });

    it('Should render dashboard component', () => {
        expect(wrapper).toHaveLength(1);
    });

    it('Should test onSubmit function', () => {
        wrapper
            .find(PostForm)
            .props()
            .onSubmit({
                preventDefault() {},
            });
        const { result } = renderHook(() => storeHooks().createPost);

        const data = {
            title: 'owls are cool',
            content: 'im a goat and a fish',
        };
        expect(wrapper.find('PostForm').simulate('submit', { preventDefault() {} }));
        expect(mockDispatch).toHaveBeenCalled(result.current(data)); // this issues is caused by this line
    });

    it('should render <PostForm/> child component ', () => {
        expect(wrapper.find(PostForm)).toHaveLength(1);
    });
});

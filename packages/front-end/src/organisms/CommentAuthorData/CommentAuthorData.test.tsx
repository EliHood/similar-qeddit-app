import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow, mount, render } from 'enzyme'
import { Provider } from 'react-redux'
import CommentAuthorData from './CommentAuthorData'
import storeHooks from '../../common/storeHooks'
import { store } from '../../../store'

describe('Should test CommentAuthorData', () => {
    let wrapper
    const props = {
        comment: {
            author: {
                gravatar:
                    'https://hype.my/wp-content/uploads/2015/02/SpongeBob-SquarePants-Fun-Facts.jpg',
            },
        },
        currentUser: {},
        isBold: jest.fn(),
    }
    beforeAll(() => {
        wrapper = mount(
            <Provider store={store}>
                <CommentAuthorData {...props} />
            </Provider>
        )
    })
    it('should test <CommentAuthorData/>', () => {
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it('should check <img>', () => {
        expect(wrapper.find('img').at(0)).toHaveLength(1)
    })

    it('should render <CommentAuthorData/>', () => {
        expect(wrapper).toHaveLength(1)
    })
})

import * as actionTypes from './userActions';
import * as types from '../actionTypes/userActionTypes';

describe('userActions', () => {
    it('should test signup action', () => {
        const payload = {
            email: 'test@example.com',
            username: 'JohnWayne',
            password: '123fish',
        };

        const expectedAction = {
            type: types.SIGN_UP_INIT,
            payload,
            history: {},
        };

        expect(actionTypes.signUpInit(payload, {})).toEqual(expectedAction);
    });
    it('should test loginInit action', () => {
        const payload = {
            username: 'JohnWayne',
            password: '123fish',
        };
        const expectedAction = {
            type: types.LOG_IN_INIT,
            payload,
            history: {},
        };
        expect(actionTypes.loginInit(payload, {})).toEqual(expectedAction);
    });

    it('should test loginSuccess action', () => {
        const payload = {};

        const expectedAction = {
            type: types.LOG_IN_SUCCESS,
            payload,
        };

        expect(actionTypes.loginSuccess(payload)).toEqual(expectedAction);
    });
});

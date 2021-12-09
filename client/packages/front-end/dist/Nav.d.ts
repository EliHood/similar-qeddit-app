import { Component } from 'react';
export declare type routerContainerState = {
    hasError: boolean;
};
export declare type routerContainerProps = {
    getUser: () => void;
    logOutInit: (data: any) => void;
    darkTheme: () => void;
    initGetNotifications: (id: number) => void;
    user: {
        isAuthenticated: boolean;
        googleAccount: boolean;
    };
};
declare class Nav extends Component<routerContainerProps, routerContainerState> {
    state: routerContainerState;
    componentDidMount(): void;
    componentDidCatch(error: any, info: any): void;
    ourLogOut: () => void;
    render(): JSX.Element;
}
declare const _default;
export default _default;

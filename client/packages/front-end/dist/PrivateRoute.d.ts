import { IPrivateRoute } from '@mfe/redux-store/src/types';
declare const PrivateRoute: ({ googleAccount, isAuthenticated, Component, exact, path, }: IPrivateRoute) => JSX.Element;
export default PrivateRoute;

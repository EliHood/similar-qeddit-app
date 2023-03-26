import React, { ReactElement } from 'react'
import { useDispatch } from 'react-redux'
import classnames from 'classnames'
import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import {
    Route,
    Routes as RouterRoutes,
    BrowserRouter,
    Navigate,
} from 'react-router-dom'

import { userActions } from '@mfe/redux-store'
import Landing from '../pages/LandingPage'
import Dashboard from '../pages/DashboardPage'
import EmailConfirmation from '../molecules/EmailConfirmation'
import EmailConfirmationSuccess from '../molecules/EmailConfirmationSuccess'
import Likes from '../pages/LikesPage'
import Login from '../pages/LoginPage'
import Post from '../pages/PostPage'
import EditProfile from '../pages/EditProfilePage'
import Profile from '../pages/ProfilePage'
import Register from '../pages/RegisterPage'
import { history } from '../ourHistory'
import NotFound from '../molecules/404'
import CollapasedMenu from '../organisms/CollapsedMenu'
import MainNav from '../organisms/MainNav'
import useWrapperSlide from '../hooks/useWrapperSlide'
import Search from '../molecules/Search'
import UserPosts from '../pages/UserPostsPage'
import storeHooks from '../hooks/useStoreHooks'
// import SearchResults from '../molecules/SearchResults'
// import SearchResultPage from '../pages/SearchResultPage'

// type RoutesMap = {
//     isProtected: boolean
//     routeName: string
//     element?: JSX.Element | ReactElement
//     redirectTo?: string
// }

type AuthPrivateRouteType = {
    isAuthenticated: boolean
    isGoogleAccount: boolean
    children: ReactElement
    isProtected: boolean
    redirectTo: string
}

export function AuthPrivateRoute({
    children,
    isProtected,
    redirectTo,
    isAuthenticated,
    isGoogleAccount,
}: AuthPrivateRouteType): ReactElement {
    /**
     * If validate token callback fails, and if route is protected redirect to some unathorized route like a login.
     */
    const isAuthed = isAuthenticated || isGoogleAccount
    if (isProtected && isAuthed) {
        return children
    }
    return <Navigate to={redirectTo} />
}

function Routes() {
    // const dispatch = useDispatch()
    // const { user, isAuthenticated, isGoogleAccount } = storeHooks()
    // const logOut = () => dispatch(userActions.logOutInit(history))
    // const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    //     null
    // )

    // const { classes, appOpen, appSetOpen } = useWrapperSlide()

    // const open = Boolean(anchorEl)
    // const id = open ? 'simple-popover' : undefined
    // const handleNotificationClick = (
    //     event: React.MouseEvent<HTMLButtonElement>
    // ) => {
    //     setAnchorEl(event.currentTarget)
    //     dispatch(userActions.initGetNotifications(user.id))
    // }

    // const handleClose = React.useCallback(() => {
    //     setAnchorEl(null)
    // }, [setAnchorEl])

    const routes = [
        // {
        //     routeName: '/dashboard',
        //     isProtected: true,
        //     element: <Dashboard />,
        //     redirectTo: '/login',
        // },
        // {
        //     routeName: '/',
        //     isProtected: false,
        //     element: <Landing />,
        //     redirectTo: '/',
        // },
        // {
        //     routeName: '/register',
        //     isProtected: false,
        //     element: <Register />,
        //     redirectTo: '/',
        // },
        {
            routeName: '/login',
            isProtected: false,
            element: <Login />,
            redirectTo: '/',
        },
        // {
        //     routeName: '/emailConfirmation',
        //     isProtected: false,
        //     element: <EmailConfirmation />,
        //     redirectTo: '/',
        // },
        // {
        //     routeName: '/emailConfirmationSuccess/:userId/:token',
        //     isProtected: false,
        //     element: <EmailConfirmation />,
        //     redirectTo: '/',
        // },
        // {
        //     routeName: '/emailConfirmationSuccess/:userId/:token',
        //     isProtected: false,
        //     element: <EmailConfirmationSuccess />,
        //     redirectTo: '/',
        // },
        // {
        //     routeName: '/editProfile',
        //     isProtected: true,
        //     element: <EditProfile />,
        //     redirectTo: '/login',
        // },
        // {
        //     routeName: '/profile/:username',
        //     isProtected: true,
        //     element: <Profile />,
        //     redirectTo: '/login',
        // },
        // {
        //     routeName: '/:userId/likes',
        //     isProtected: true,
        //     element: <Likes />,
        //     redirectTo: '/login',
        // },
        // {
        //     routeName: '/:userId/posts',
        //     isProtected: true,
        //     element: <UserPosts />,
        //     redirectTo: '/login',
        // },
        // {
        //     routeName: '/post/:id',
        //     isProtected: true,
        //     element: <Post />,
        //     redirectTo: '/login',
        // },
        // {
        //     routeName: '*',
        //     isProtected: false,
        //     element: <NotFound />,
        //     redirectTo: '/',
        // },
    ]

    return (
        <div>test</div>
        //     <BrowserRouter>
        //         <RouterRoutes>
        //             {routes.map(
        //                 ({ isProtected, routeName, element, redirectTo }) => (
        //                     <Route
        //                         key={routeName}
        //                         path={routeName}
        //                         element={
        //                             <AuthPrivateRoute
        //                                 isProtected={isProtected}
        //                                 redirectTo={redirectTo}
        //                                 // eslint-disable-next-line react/jsx-boolean-value
        //                                 isAuthenticated={true}
        //                                 // eslint-disable-next-line react/jsx-boolean-value
        //                                 isGoogleAccount={true}
        //                             >
        //                                 {element}
        //                             </AuthPrivateRoute>
        //                         }
        //                     />
        //                 )
        //             )}
        //         </RouterRoutes>
        //     </BrowserRouter>
    )
}

// eslint-disable-next-line import/prefer-default-export
export { Routes }

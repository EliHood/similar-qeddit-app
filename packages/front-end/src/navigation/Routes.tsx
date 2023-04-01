import React, { ReactElement, ReactNode, Suspense } from 'react'
import { useDispatch } from 'react-redux'
import {
    Route,
    Routes as RouterRoutes,
    BrowserRouter,
    useNavigate,
} from 'react-router-dom'
import { userActions } from '@mfe/redux-store'
import EmailConfirmation from '../pages/EmailConfirmationPage'
import EmailConfirmationSuccess from '../pages/EmailConfirmationSuccessPage'
import Likes from '../pages/LikesPage'
import Login from '../pages/LoginPage'
import Post from '../pages/PostPage'
import EditProfile from '../pages/EditProfilePage'
import Profile from '../pages/ProfilePage'
import Register from '../pages/RegisterPage'
import NotFound from '../molecules/404'
import useWrapperSlide from '../hooks/useWrapperSlide'
import Search from '../molecules/Search'
import storeHooks from '../hooks/useStoreHooks'
// import SearchResults from '../molecules/SearchResults'
// import SearchResultPage from '../pages/SearchResultPage'

/**
 * Lazy loading these...
 */
const Dashboard = React.lazy(() => import('../pages/DashboardPage'))
const UserPosts = React.lazy(() => import('../pages/UserPostsPage'))
const Landing = React.lazy(() => import('../pages/LandingPage'))

type AuthPrivateRouteType = {
    isAuthenticated: boolean
    isGoogleAccount: boolean
    children: ReactElement
    isProtected: boolean
    protectGuardPath: string
    routeName: string
}

export function AuthPrivateRoute({
    children,
    isProtected,
    protectGuardPath,
    isAuthenticated,
    isGoogleAccount,
    routeName,
}: AuthPrivateRouteType): any {
    const isAuthed = isAuthenticated || isGoogleAccount
    const navigate = useNavigate()
    if (isProtected && isAuthed === null) {
        navigate(protectGuardPath)
    }
    return children
}

function Routes({ children }: { children: ReactNode }) {
    const dispatch = useDispatch()
    const { user, isAuthenticated, isGoogleAccount } = storeHooks()
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
        null
    )

    const { classes, appOpen, appSetOpen } = useWrapperSlide()

    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined
    const handleNotificationClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        setAnchorEl(event.currentTarget)
        dispatch(userActions.initGetNotifications(user.id))
    }

    const handleClose = React.useCallback(() => {
        setAnchorEl(null)
    }, [setAnchorEl])

    const routes = [
        {
            routeName: '/dashboard',
            isProtected: true,
            element: <Dashboard />,
            protectGuardPath: '/login',
        },
        {
            routeName: '/',
            isProtected: false,
            element: <Landing />,
            protectGuardPath: '/',
        },
        {
            routeName: '/register',
            isProtected: false,
            element: <Register />,
            protectGuardPath: '/',
        },
        {
            routeName: '/login',
            isProtected: false,
            element: <Login />,
            protectGuardPath: '/',
        },
        {
            routeName: '/emailConfirmation',
            isProtected: false,
            element: <EmailConfirmation />,
            protectGuardPath: '/',
        },
        {
            routeName: '/emailConfirmationSuccess/:userId/:token',
            isProtected: false,
            element: <EmailConfirmation />,
            protectGuardPath: '/',
        },
        {
            routeName: '/emailConfirmationSuccess/:userId/:token',
            isProtected: false,
            element: <EmailConfirmationSuccess />,
            protectGuardPath: '/',
        },
        {
            routeName: '/editProfile',
            isProtected: true,
            element: <EditProfile />,
            protectGuardPath: '/login',
        },
        {
            routeName: '/profile/:username',
            isProtected: true,
            element: <Profile />,
            protectGuardPath: '/login',
        },
        {
            routeName: '/:userId/likes',
            isProtected: true,
            element: <Likes />,
            protectGuardPath: '/login',
        },
        {
            routeName: '/:userId/posts',
            isProtected: true,
            element: <UserPosts />,
            protectGuardPath: '/login',
        },
        {
            routeName: '/post/:id',
            isProtected: true,
            element: <Post />,
            protectGuardPath: '/login',
        },
        {
            routeName: '*',
            isProtected: false,
            element: <NotFound />,
            protectGuardPath: '/',
        },
    ]

    return (
        <Suspense fallback={<div>Loading ... </div>}>
            <BrowserRouter>
                {children}
                <RouterRoutes>
                    {routes.map(
                        ({
                            isProtected,
                            routeName,
                            element,
                            protectGuardPath,
                        }) => (
                            <Route
                                key={routeName}
                                path={routeName}
                                element={
                                    <AuthPrivateRoute
                                        routeName={routeName}
                                        isProtected={isProtected}
                                        protectGuardPath={protectGuardPath}
                                        isAuthenticated={isAuthenticated}
                                        isGoogleAccount={isGoogleAccount}
                                    >
                                        {element}
                                    </AuthPrivateRoute>
                                }
                            />
                        )
                    )}
                </RouterRoutes>
            </BrowserRouter>
        </Suspense>
    )
}

// eslint-disable-next-line import/prefer-default-export
export { Routes }

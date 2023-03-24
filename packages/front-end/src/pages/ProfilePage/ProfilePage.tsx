import React, { useEffect, useRef, Fragment } from 'react'
import { selectors, userActions } from '@mfe/redux-store/src'
import { Button, Typography } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import PersonIcon from '@material-ui/icons/Person'
import { useSelector, useDispatch } from 'react-redux'
import OurLink from '../../molecules/OurLink'
import GridHoc from '../../hoc/grid'
import OurWrapper from '../../atoms/OurWrapper'
import { ProfilePropsType } from '../../types'

function ProfilePage({
    match,
    appBar,
    appBarShift,
    appOpen,
}: ProfilePropsType) {
    const didMountRef = useRef<Object>()
    const dispatch = useDispatch()
    const followUser = (username: string, id: number) =>
        dispatch(userActions.followUserInit(username, id))
    const unfollowUser = (username: string, id: number) =>
        dispatch(userActions.unfollowUserInit(username, id))
    const userData = useSelector(selectors.userStore)
    useEffect(() => {
        if (!didMountRef.current) {
            const { username } = match.params
            dispatch(userActions.getProfileInit(username))
        } else {
            // console.log("test");
        }
    }, [])

    const user = userData.profilePage
    const currentUser = userData.currentUser.user
    const userFollowerCount =
        user && user.UserFollowers ? user.UserFollowers.length : ''
    const followerPlural =
        userFollowerCount.length > 1 ? 'Follower' : 'Followers'

    return (
        <>
            <OurWrapper
                appBar={appBar}
                appOpen={appOpen}
                appBarShift={appBarShift}
            >
                {currentUser && user && (
                    <>
                        <Avatar src={user.gravatar} />
                        <Grid
                            item
                            sm={12}
                            md={12}
                            style={{ margin: '20px 0px' }}
                        >
                            <Typography variant="subtitle1">
                                {user.username}
                            </Typography>
                            <Typography
                                variant="body1"
                                style={{
                                    margin: '20px 0px',
                                    letterSpacing: '1px',
                                }}
                            >
                                <PersonIcon style={{ margin: '-5px 0px' }} />{' '}
                                {user.bio}
                            </Typography>
                            <Grid
                                item
                                sm={2}
                                lg={2}
                                style={{ margin: '20px 0px' }}
                            >
                                {currentUser.id !== user.id ? (
                                    <Typography align="left">
                                        {user.isFollowing !== true ? (
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                onClick={() =>
                                                    followUser(
                                                        user.username,
                                                        currentUser.id
                                                    )
                                                }
                                            >
                                                Follow
                                            </Button>
                                        ) : (
                                            <Button
                                                style={{ color: '#fff' }}
                                                variant="contained"
                                                color="primary"
                                                onClick={() =>
                                                    unfollowUser(
                                                        user.username,
                                                        currentUser.id
                                                    )
                                                }
                                            >
                                                Following
                                            </Button>
                                        )}
                                    </Typography>
                                ) : null}
                            </Grid>
                            <Grid item sm={12} md={12}>
                                <Typography
                                    variant="subtitle1"
                                    style={{ margin: '10px 0px' }}
                                >
                                    {' '}
                                    {userFollowerCount} {followerPlural}{' '}
                                </Typography>
                                {user && userFollowerCount ? (
                                    <>
                                        {user.UserFollowers.map(
                                            (userFollow, i) => (
                                                <Fragment key={i}>
                                                    <Paper
                                                        style={{
                                                            margin: '30px 0px',
                                                            padding: '20px 0px',
                                                        }}
                                                    >
                                                        <Typography
                                                            style={{
                                                                padding:
                                                                    '0px 20px',
                                                            }}
                                                            variant="caption"
                                                        >
                                                            <OurLink
                                                                to={{
                                                                    pathname: `/profile/${
                                                                        user &&
                                                                        userFollow &&
                                                                        userFollow.followerDetails
                                                                            ? userFollow
                                                                                  .followerDetails
                                                                                  .username
                                                                            : ''
                                                                    }`,
                                                                    state: {
                                                                        userFollow,
                                                                    },
                                                                }}
                                                                title={
                                                                    user &&
                                                                    userFollow &&
                                                                    userFollow.followerDetails
                                                                        ? userFollow
                                                                              .followerDetails
                                                                              .username
                                                                        : ''
                                                                }
                                                            />
                                                        </Typography>
                                                    </Paper>
                                                </Fragment>
                                            )
                                        )}
                                    </>
                                ) : null}
                            </Grid>
                        </Grid>
                    </>
                )}
            </OurWrapper>
        </>
    )
}

export default GridHoc(ProfilePage)

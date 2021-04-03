import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Notification from '../../containers/notificationTooltip'
import menus from './menu.json'
import NavLink from '../../common/NavLink'
import NavButton from '../../common/NavButton'
import { IDyanmicMenuType } from '../../utils/types'
import OurMenuItem from '../../common/OurMenuItem'
import storeHooks from '../../common/storeHooks'

const UnOrderedList = styled.ul`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap-reverse;
    padding-right: 20px;
    justify-content: flex-end;
    list-style-type: none;
`

const UnOrderedListItem = styled.li`
    padding: 0.5rem;
`
const MenuItemLink = styled(Link)`
    text-decoration: none;
    font-weight: 500;
`
const GuestMenuItemLink = styled(Link)`
    color: #333;
    fontweight: 500;
    textdecoration: none;
`
const DyanmicMenu: React.FC<IDyanmicMenuType> = ({
    isAuthenticated,
    googleAccount,
    notificationId,
    handleNotificationClick,
    handleClose,
    darkTheme,
    open,
    anchorEl,
    logOut,
    type,
}) => {
    const { user } = storeHooks()

    console.log('sdsfsf checking', user)
    const authenticatedNavItems = menus.menus.map((item, i) => (
        <UnOrderedListItem>
            {item.link !== 'likes' &&
                item.link !== 'posts' &&
                item.link !== 'profile' &&
                item.link !== 'logout' && (
                    <NavLink to={`/${item.link}`}>{item.name}</NavLink>
                )}
            {item.link === 'likes' && (
                <NavLink
                    to={{
                        pathname: `/${user?.id}/${item.link}`,
                    }}
                >
                    {item.name}
                </NavLink>
            )}
            {item.link === 'profile' && (
                <NavLink
                    to={{
                        pathname: `/${item.link}/${user?.username}`,
                    }}
                >
                    {item.name}
                </NavLink>
            )}
            {item.link === 'posts' && (
                <NavLink
                    to={{
                        pathname: `/${user?.id}/${item.link}`,
                    }}
                >
                    {item.name}
                </NavLink>
            )}
        </UnOrderedListItem>
    ))

    const guestNavItems = menus.guestMenu.map((item, i) => (
        <UnOrderedListItem>
            <NavLink to={`/${item.link}`}>{item.name}</NavLink>
        </UnOrderedListItem>
    ))

    const authenticatedMenuItems = menus.menus.map((item, i) => (
        <OurMenuItem>
            {item.link !== 'likes' &&
                item.link !== 'posts' &&
                item.link !== 'profile' &&
                item.link !== 'logout' && (
                    <MenuItemLink to={`/${item.link}`}>
                        {item.name}
                    </MenuItemLink>
                )}
            {item.link === 'likes' && (
                <MenuItemLink
                    to={{
                        pathname: `/${user?.id}/${item.link}`,
                    }}
                >
                    {item.name}
                </MenuItemLink>
            )}
            {item.link === 'profile' && (
                <MenuItemLink
                    to={{
                        pathname: `/${item.link}/${user?.username}`,
                    }}
                >
                    {item.name}
                </MenuItemLink>
            )}
            {item.link === 'posts' && (
                <MenuItemLink
                    to={{
                        pathname: `/${user?.id}/${item.link}`,
                    }}
                >
                    {item.name}
                </MenuItemLink>
            )}
        </OurMenuItem>
    ))
    const guestMenuItems = menus.guestMenu.map((item, i) => (
        <UnOrderedListItem>
            <GuestMenuItemLink to={`/${item.link}`}>
                {item.name}
            </GuestMenuItemLink>
        </UnOrderedListItem>
    ))
    return isAuthenticated || googleAccount === true ? (
        <UnOrderedList>
            {type === 'main-menu'
                ? authenticatedNavItems
                : authenticatedMenuItems}
            <NavButton>
                <Notification
                    userId={user?.id}
                    id={notificationId}
                    handleClose={handleClose}
                    open={open}
                    anchorEl={anchorEl}
                    handleNotificationClick={handleNotificationClick}
                    title="Notifications"
                />
            </NavButton>
            <NavButton onClick={darkTheme}>Change Theme</NavButton>
            <NavButton onClick={logOut}>Logout</NavButton>
        </UnOrderedList>
    ) : (
        <UnOrderedList>
            {type === 'main-menu' ? guestNavItems : guestMenuItems}
        </UnOrderedList>
    )
}

export default DyanmicMenu

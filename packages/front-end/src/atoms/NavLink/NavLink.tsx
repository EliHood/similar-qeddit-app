import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { INavLinkType } from '../../types'

const CleanLink = styled(Link)`
    color: #fff;
    text-decoration: none;
    font-size: 0.85rem;
`

export default function NavLink({ children, to }: INavLinkType) {
    return <CleanLink to={to}>{children}</CleanLink>
}

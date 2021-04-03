import React from 'react'
import { MenuItem } from '@material-ui/core'
import styled from 'styled-components'
import { IMenuItemType } from '../utils/types'

const OurStyledMenuItem = styled(MenuItem)`
    padding: 10px;
    a {
        color: #000;
    }
`

const OurMenuItem = ({ children }: IMenuItemType) => (
    <OurStyledMenuItem>{children}</OurStyledMenuItem>
)

export default OurMenuItem

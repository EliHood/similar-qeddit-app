import React from 'react'
import { IMenuItemType } from '@mfe/redux-store/src/types'
import { MenuItem } from '@material-ui/core'
import styled from 'styled-components'


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

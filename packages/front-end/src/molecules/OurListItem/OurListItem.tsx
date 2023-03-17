import React, { ReactNode, ReactElement } from 'react'
import styled from 'styled-components'
import ListItem from '@material-ui/core/ListItem'

const OurItem = styled(ListItem)`
    padding: 20px;
    background-color: #f2f2f2;
    border: 1px solid #f2f2f2;
    border-radius: 4px;
`

const OurListItem = ({ children }: { children: ReactNode | ReactElement }) => (
    <OurItem button>{children}</OurItem>
)
export default OurListItem

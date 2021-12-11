/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import styled from 'styled-components'
import { INavButtonType } from '@mfe/redux-store/src/types'

const Button = styled.button`
    color: #fff;
    font-weight: 400;
    border: 0;
    margin: 0;
    outline: 0;
    padding: 0;
    background-color: transparent;
    cursor: pointer;
    text-decoration: 'none';
    fontsize: 0.85rem;
`

export default function NavButton({ onClick, children }: INavButtonType) {
    return (
        <li data-testid="nav-button-test" style={{ padding: '0.5rem' }}>
            <Button onClick={onClick}>{children}</Button>
        </li>
    )
}

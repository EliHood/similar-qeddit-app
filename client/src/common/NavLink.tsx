import React from 'react';
import { Link } from 'react-router-dom';

export default function NavLink(props) {
    return (
        <Link
            style={{
                color: '#fff',
                textDecoration: 'none',
                fontSize: '0.85rem',
            }}
            {...props}
        >
            {props.children}
        </Link>
    );
}

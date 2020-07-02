import React from "react";
export default function NavButton(props) {
    return (
        <li style={{ padding: "0.5rem" }}>
            <button
                style={{ color: "#fff", fontWeight: 400, border: 0, margin: 0, outline: 0, padding: 0, backgroundColor: "transparent", cursor: "pointer", textDecoration: "none", fontSize: "0.85rem" }}
                {...props}
            >
                {props.children}
            </button>
        </li>
    );
}

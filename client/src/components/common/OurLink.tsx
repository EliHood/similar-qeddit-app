import React from 'react';
import {Link} from "react-router-dom";
const OurLink = (props: any) => (
    <Link {...props} style={{ color: "#333", fontWeight: "500", textDecoration: "none"}}> {props.title}</Link>
)
export default OurLink;
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const TheLink = styled(Link)`
    color: #333;
    fontweight: 500;
    text-decoration: none;
`;
const OurLink = (props: any) => <TheLink {...props}> {props.title}</TheLink>;

export default OurLink;

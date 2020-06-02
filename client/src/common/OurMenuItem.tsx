import React from "react";
import { MenuItem } from "@material-ui/core";
import styled from "styled-components";
const OurStyledMenuItem = styled(MenuItem)`
    padding: 10px;
    a {
        color: #000;
    }
`;

const OurMenuItem = (props: any) => <OurStyledMenuItem>{props.children}</OurStyledMenuItem>;

export default OurMenuItem;

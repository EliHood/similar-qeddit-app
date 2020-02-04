import React from "react";
import styled from "styled-components";
import ListItem from "@material-ui/core/ListItem";
const OurItem = styled(ListItem)`
    padding: 0px;
`;

const OurListItem = (props: any) => <OurItem alignItems="right">{props.children}</OurItem>;
export default OurListItem;

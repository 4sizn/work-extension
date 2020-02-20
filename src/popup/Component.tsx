import React from "react";
import { ThemeProvider } from "emotion-theming";

function Wrapper({ children }) {
    return <div>{children}</div>;
}

function Item(props) {
    return <div>{props.children}</div>;
}

export { Item };

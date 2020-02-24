/** @jsx jsx */
import React from "react";
import { useTheme } from "emotion-theming";
import { css, jsx } from "@emotion/core";
function Wrapper(props) {
    return <div {...props}></div>;
}

function Item(props) {
    const theme = useTheme();
    return (
        <div
            {...props}
            css={{
                fontSize: "24px",
                color: "#000000E5",
            }}
        ></div>
    );
}

export { Item };

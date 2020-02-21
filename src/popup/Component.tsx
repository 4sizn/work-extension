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
                color: theme.colors.primary,
            }}
        ></div>
    );
}

export { Item };

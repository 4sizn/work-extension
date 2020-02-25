/** @jsx jsx */
import React, { useRef } from "react";
import { useTheme } from "emotion-theming";
import { css, jsx } from "@emotion/core";

function Wrapper(props) {
    return <div {...props}></div>;
}

function Item({ active, ...rest }) {
    const theme = useTheme();
    return (
        <div
            css={css`
                font-size: 24px;
                line-height: 1.5;
                color: ${active ? `white` : `#000000e5`};
                background-color: ${active && `black`};
            `}
            {...rest}
        ></div>
    );
}

export { Item };

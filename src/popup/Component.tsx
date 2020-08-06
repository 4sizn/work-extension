/** @jsx jsx */
import React, { useRef, useEffect } from "react";
import { useTheme } from "emotion-theming";
import { css, jsx } from "@emotion/core";

type ItemProps = {
    active: boolean;
    children: any;
    onClick?: () => void;
    onMouseOver?: () => void;
};

const Item = React.forwardRef<HTMLDivElement, ItemProps>(
    ({ active, ...rest }, ref) => {
        const theme = useTheme();
        const targetEl = useRef<HTMLDivElement>(null);

        // useEffect(() => {
        //     console.log("active", active);
        //     if (active) {
        //         targetEl!.current!.focus();
        //     }
        // }, [active]);
        return (
            <div
                ref={ref}
                css={css`
                    font-size: 24px;
                    line-height: 1.5;
                    color: ${active ? `white` : `#000000e5`};
                    background-color: ${active && `black`};
                `}
                {...rest}
            ></div>
        );
    },
);

export { Item };

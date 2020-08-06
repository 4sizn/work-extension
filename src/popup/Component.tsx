/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";

type ItemProps = {
    active: boolean;
    children: any;
    onClick?: () => void;
    onMouseOver?: () => void;
};

const Item = React.forwardRef<HTMLDivElement, ItemProps>(
    ({ active, ...rest }, ref) => {
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

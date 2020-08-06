/** @jsx jsx */
import * as React from "react";
import { Item } from "./Component";
import { jsx, css } from "@emotion/core";
import { ThemeProvider } from "emotion-theming";
// @ts-ignore
import useKeyPress from "./useKeypress";
import "./control";

const theme = {
    colors: {
        primary: "hotpink",
        secondary: "black",
    },
};

type Object = {
    [key: string]: any;
    url?: string;
    title?: string | undefined;
};

export function Popup() {
    const [objects, setObjects] = React.useState<Object[]>([]);
    const [filterdObjects, setFilterdObjects] = React.useState<Object[]>([]);
    let refs: any = null;
    const [isTyped, setTyped] = React.useState(false);
    const inputEl = React.useRef<HTMLInputElement>(null);
    const downPress = useKeyPress("ArrowDown");
    const upPress = useKeyPress("ArrowUp");
    const enterPress = useKeyPress("Enter");
    const scrollToRef = (ref: any) => window.scrollTo(0, ref.current.offsetTop);
    const [cursor, setCursor] = React.useState(0);

    React.useEffect(() => {
        refs = filterdObjects.reduce((acc, value, idx) => {
            acc[idx] = React.createRef();
            return acc;
        }, {});
        console.log("refs", refs);
    }, [filterdObjects]);

    React.useEffect(() => {
        if (downPress) {
            let _cursor: number;
            setCursor((prevState) => {
                _cursor = prevState < objects.length - 1 ? prevState + 1 : 0;
                // refs[_cursor].current.scrollIntoView({
                //     behavior: "smooth",
                //     block: "start",
                // });
                return _cursor;
            });
        }
    }, [downPress]);

    React.useEffect(() => {
        if (upPress) {
            setCursor((prevState) =>
                prevState > 0 ? prevState - 1 : objects.length,
            );
        }
    }, [upPress]);

    React.useEffect(() => {
        if (enterPress) {
            chrome.tabs.update({ url: objects[cursor].url });
        }
    }, [enterPress]);

    React.useEffect(() => {
        inputEl!.current!.focus();
    }, [cursor]);

    React.useEffect(() => {
        chrome.runtime.sendMessage({ popupMounted: true });
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTyped(true);
        setFilterdObjects(
            objects.filter((o) => {
                return o.title?.toLowerCase().includes(e.target.value);
            }),
        );
    };

    //flatten all children nodes
    const flatChildren = (b: any) =>
        Array.isArray(b.children)
            ? [].concat(...b.children.map(flatChildren))
            : b;

    var microsecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
    var oneWeekAgo = new Date().getTime() - microsecondsPerWeek;
    React.useEffect(() => {
        //bookmark
        chrome.bookmarks.getTree((tree) => {
            setObjects(flatChildren(tree[0]));
            setFilterdObjects(flatChildren(tree[0]));
        });
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <div
                css={{
                    backgroundColor: "#FFFFFF",
                    border: "8px solid #0000007F",
                    width: "559px",
                }}
            >
                <div
                    css={css`
                        margin: 8px 8px;
                    `}
                >
                    <input
                        type="text"
                        ref={inputEl}
                        onChange={handleInputChange}
                        css={{
                            backgroundColor: "#CBCBCBF3",
                            width: "100%",
                            boxSizing: "border-box",
                            fontSize: "38px",
                            border: "none",
                            padding: "0 8px",
                            color: "#000000FF",
                        }}
                    ></input>
                </div>
                <div
                    css={{
                        maxHeight: "400px",
                        overflowY: "auto",
                        margin: "8px 8px",
                    }}
                >
                    {filterdObjects.length > 0 ? (
                        filterdObjects.map((item, i) => {
                            return (
                                <Item
                                    key={item.id}
                                    ref={refs?.[i]}
                                    active={i === cursor}
                                    onMouseOver={() => {
                                        setCursor(i);
                                    }}
                                    onClick={() =>
                                        chrome.tabs.update({ url: item.url })
                                    }
                                >
                                    {item.title}
                                </Item>
                            );
                        })
                    ) : (
                        <Item active={false}>NOT FOUND</Item>
                    )}
                </div>
            </div>
        </ThemeProvider>
    );
}

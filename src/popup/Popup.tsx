/** @jsx jsx */
import * as React from "react";
import { Item } from "./Component";
import { Global, jsx, css } from "@emotion/core";
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

export function Popup() {
    const [objects, setObjects] = React.useState([]);
    const [filterdObjects, setFilterdObjects] = React.useState([]);
    const [isTyped, setTyped] = React.useState(false);
    const inputEl = React.useRef(null);

    const downPress = useKeyPress("ArrowDown");
    const upPress = useKeyPress("ArrowUp");
    const enterPress = useKeyPress("Enter");
    const [cursor, setCursor] = React.useState(0);

    React.useEffect(() => {
        if (downPress) {
            setCursor(prevState =>
                prevState < objects.length - 1 ? prevState + 1 : 0,
            );
        }
    }, [downPress]);

    React.useEffect(() => {
        if (upPress) {
            setCursor(prevState =>
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
        inputEl.current.focus();
    }, [cursor]);

    // React.useEffect(() => {}, [enterPress]);

    const handleInputChange = e => {
        setTyped(true);
        setFilterdObjects(
            objects.filter(o => {
                return o.title.toLowerCase().includes(e.target.value);
            }),
        );
    };

    React.useEffect(() => {
        chrome.runtime.sendMessage({ popupMounted: true });
    }, []);

    //flatten all children nodes
    const flatChildren = b =>
        Array.isArray(b.children)
            ? [].concat(...b.children.map(flatChildren))
            : b;

    var microsecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
    var oneWeekAgo = new Date().getTime() - microsecondsPerWeek;
    React.useEffect(() => {
        // history
        // chrome.history.search(
        //     {
        //         text: "",
        //     },
        //     historyItems => {
        //         if (historyItems.length) {
        //             setObjects(historyItems);
        //             setFilterdObjects(historyItems);
        //         }
        //     },
        //     );

        //bookmark
        chrome.bookmarks.getTree(tree => {
            setObjects(flatChildren(tree[0]));
            setFilterdObjects(flatChildren(tree[0]));
        });
    }, []);

    React.useEffect(() => {
        console.log(filterdObjects, "filterdObjects");
    }, [filterdObjects]);

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
                        filterdObjects.map((item, i) => (
                            <Item
                                key={item.id}
                                active={i === cursor}
                                // onClick={() => chrome.tabs.update({ url: item.url })}
                            >
                                {item.title}
                            </Item>
                        ))
                    ) : (
                        <Item>NOT FOUND</Item>
                    )}
                </div>
            </div>
        </ThemeProvider>
    );
}

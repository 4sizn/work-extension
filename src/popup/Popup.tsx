/** @jsx jsx */
import * as React from "react";
import { Item } from "./Component";
import { Global, jsx } from "@emotion/core";
import { ThemeProvider } from "emotion-theming";

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

    const handleInputChange = e => {
        setTyped(true);
        setFilterdObjects(
            objects.filter(o => {
                return o.title.includes(e.target.value);
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
            <div>
                <input
                    type="text"
                    ref={inputEl}
                    onChange={handleInputChange}
                    css={{
                        width: "100%",
                    }}
                ></input>
                {filterdObjects.length > 0 ? (
                    filterdObjects.map(item => (
                        <Item
                            key={item.id}
                            // onClick={() => chrome.tabs.update({ url: item.url })}
                        >
                            {item.title}
                        </Item>
                    ))
                ) : (
                    <Item>NOT FOUND</Item>
                )}
            </div>
        </ThemeProvider>
    );
}

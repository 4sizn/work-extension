import * as React from "react";
import { Item } from "./Component";

export function Popup() {
    const [objects, setObjects] = React.useState([]);
    // Sends the `popupMounted` event
    React.useEffect(() => {
        chrome.runtime.sendMessage({ popupMounted: true });
    }, []);

    // Renders the component tree

    //flatten all children nodes
    const flatChildren = b =>
        Array.isArray(b.children)
            ? [].concat(...b.children.map(flatChildren))
            : b;

    chrome.bookmarks.getTree(tree => {
        console.log(tree);
        setObjects(flatChildren(tree[0]));
    });

    return (
        <div>
            <input type="text"></input>
            {objects && objects.map(item => <Item>{item.title}</Item>)}
        </div>
    );
}

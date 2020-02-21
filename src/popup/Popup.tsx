import * as React from "react";
import { Item } from "./Component";

export function Popup() {
    const [objects, setObjects] = React.useState([]);
    const [filterdObjects, setFilterdObjects] = React.useState([]);
    const inputEl = React.useRef(null);

    const handleInputChange = e => {
        setFilterdObjects(
            objects.filter(o => {
                return o.title.includes(e.target.value);
            }),
            () => {
                console.log(filterdObjects, "filterdObjects");
            },
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

    React.useEffect(() => {
        chrome.bookmarks.getTree(tree => {
            setObjects(flatChildren(tree[0]));
        });
    }, []);

    React.useEffect(() => {
        console.log(filterdObjects, "filterdObjects");
    }, [filterdObjects]);

    return (
        <div>
            <input
                type="text"
                ref={inputEl}
                onChange={handleInputChange}
            ></input>
            {filterdObjects.length > 0 ? (
                filterdObjects.map(item => (
                    <Item
                        key={item.id}
                        onClick={() => chrome.tabs.update({ url: item.url })}
                    >
                        {item.title}
                    </Item>
                ))
            ) : (
                <Item>NOT FOUND</Item>
            )}
        </div>
    );
}

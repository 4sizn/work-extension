import * as React from "react";

export function Popup() {
    // Sends the `popupMounted` event
    React.useEffect(() => {
        chrome.runtime.sendMessage({ popupMounted: true });
    }, []);

    // Renders the component tree
    return <div>hello Extension</div>;
}

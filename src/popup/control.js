console.log("control");
// Media Events emitter
chrome.runtime.onMessage.addListener(function(request) {
    switch (request.command) {
        case "stop":
            document.dispatchEvent(new Event("MediaStop"));
            break;
    }
});

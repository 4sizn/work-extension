import React from "react";
import { render } from "react-dom";
import { Popup } from "./Popup";
import { Global, css } from "@emotion/core";

chrome.tabs.query({ active: true, currentWindow: true }, tab => {
    render(<Popup />, document.getElementById("popup"));
});

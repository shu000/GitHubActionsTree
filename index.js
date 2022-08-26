chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
    if (
        info.status === "complete" &&
        tab.url?.indexOf("https://github.com/") !== -1 &&
        tab.url?.indexOf("actions") !== -1
    ) {
        chrome.scripting.executeScript({
            target: { tabId },
            files: ["main.js"],
        });
    }
});

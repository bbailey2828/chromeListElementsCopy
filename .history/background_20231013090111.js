chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "copy-list",
        title: "Copy list text",
        contexts: ["all"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "copy-list") {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['content.js']
        });
    }
});

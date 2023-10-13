chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "copy-list",
        title: "Copy list text",
        contexts: ["all"],
        "icons": {
            16
        }
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "copy-list") {
        chrome.tabs.executeScript(tab.id, { file: 'content.js' }, () => {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
            } else {
                chrome.tabs.sendMessage(tab.id, { command: 'copy-list-text' });
            }
        });
    }
});

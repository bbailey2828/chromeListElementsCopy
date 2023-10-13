chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "copy-list",
        title: "Copy list text",
        contexts: ["all"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "copy-list") {
        chrome.tabs.executeScript(tab.id, { file: 'inject.js' }, (results) => {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
            } else {
                console.log('Script execution result:', results);
            }
        });
    }
});

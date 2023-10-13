chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "copy-list",
        title: "Copy list text",
        contexts: ["all"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "copy-list") {
        const code = `
            console.log('Direct script injection working.');
            alert('Direct script injection working.');
        `;
        chrome.tabs.executeScript(tab.id, { code }, (results) => {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
            } else {
                console.log('Script execution result:', results);
            }
        });
    }
});

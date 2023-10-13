console.log('chrome.scripting:', chrome.scripting);

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "copy-list",
        title: "Copy list text",
        contexts: ["all"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "copy-list") {
        if(chrome.scripting) {
            chrome.scripting.executeScript({
                target: {tabId: tab.id},
                files: ['content.js']
            }).catch(error => {
                console.error(error);
            });
        } else {
            console.error('chrome.scripting is undefined.');
        }
    }
});

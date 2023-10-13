chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "copy-list",
      title: "Copy list as plain text",
      contexts: ["all"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "copy-list") {
      chrome.tabs.executeScript(tab.id, { file: "content.js" });
    }
  });
  
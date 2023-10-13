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
            const script = document.createElement('script');
            script.textContent = \`
                (function() {
                    function copyListText(pageX, pageY) {
                        const element = document.elementFromPoint(pageX, pageY);
                        const listElement = element.closest('ol, ul');

                        if (listElement) {
                            const text = Array.from(listElement.querySelectorAll('li')).map(li => li.textContent).join('\\n');
                            navigator.clipboard.writeText(text)
                                .then(() => {
                                    console.log('Text successfully copied to clipboard.');
                                })
                                .catch(error => {
                                    console.error('Error copying text to clipboard:', error);
                                });
                        } else {
                            console.warn('No list element found.');
                        }
                    }

                    copyListText(${info.pageX}, ${info.pageY});
                })();
            \`;
            (document.head || document.documentElement).appendChild(script);
            script.remove();
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

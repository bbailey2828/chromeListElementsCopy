chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.command === 'copy-list-text') {
        const element = document.activeElement;
        const listElement = element.closest('ol, ul');

        if (listElement) {
            const text = Array.from(listElement.querySelectorAll('li')).map(li => li.textContent).join('\n');
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
});

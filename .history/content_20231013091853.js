function copyListText(info, tab) {
    console.log('Context menu clicked:', info, tab);

    // Assuming the user clicked on a list or list item
    const element = document.elementFromPoint(info.pageX, info.pageY);
    console.log('Element under click:', element);

    // Find the closest 'ol' or 'ul' to the clicked element
    const listElement = element.closest('ol, ul');
    console.log('Closest list element:', listElement);

    if (listElement) {
        const text = [...listElement.querySelectorAll('li')].map(li => li.textContent).join('\n');
        console.log('Extracted text:', text);
        
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

// Updated to use chrome.runtime.onMessage
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.command === 'copy-list-text') {
        copyListText(message.info, message.tab);
    }
});


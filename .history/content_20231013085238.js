function copyListText(element) {
    console.log("Attempting to copy list text from:", element);

    // Find the closest 'ol' or 'ul' to the clicked element
    const listElement = element.closest('ol, ul');

    if (!listElement) {
        console.log("No parent 'ol' or 'ul' found for the clicked element.");
        return;
    }

    console.log("Found list element:", listElement);

    // If a valid list element is found, copy its text content
    const text = [...listElement.querySelectorAll('li')].map(li => li.textContent).join('\n');
    console.log("Extracted text:", text);
    
    navigator.clipboard.writeText(text)
        .then(() => {
            console.log("Text successfully copied to clipboard.");
        })
        .catch(err => {
            console.error("Error copying text to clipboard:", err);
        });
}

document.addEventListener('contextmenu', event => {
    const { target } = event;

    if (target.matches('ol, ul, li')) {
        console.log("Right-click detected on:", target);
        chrome.contextMenus.create({
            title: "Copy list text",
            contexts: ["all"],
            onclick: () => copyListText(target)
        });
    }
});

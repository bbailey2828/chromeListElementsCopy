function copyListText(element) {
    // Find the closest 'ol' or 'ul' to the clicked element
    const listElement = element.closest('ol, ul');

    // If a valid list element is found, copy its text content
    if (listElement) {
        const text = [...listElement.querySelectorAll('li')].map(li => li.textContent).join('\n');
        navigator.clipboard.writeText(text);
    }
}

document.addEventListener('contextmenu', event => {
    const { target } = event;

    if (target.matches('ol, ul, li')) {
        chrome.contextMenus.create({
            title: "Copy list text",
            contexts: ["all"],
            onclick: () => copyListText(target)
        });
    }
});

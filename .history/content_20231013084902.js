function copyListText(element) {
    let listElement = element;

    // If the clicked element is an 'li', find its parent 'ol' or 'ul'
    if (element.tagName.toLowerCase() === 'li') {
        listElement = element.closest('ol, ul');
    }

    // Extract text content of the list
    const text = [...listElement.querySelectorAll('li')].map(li => li.textContent).join('\n');
    navigator.clipboard.writeText(text);
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

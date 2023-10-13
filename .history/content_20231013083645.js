function copyListText(element) {
    const text = [...element.querySelectorAll('li')].map(li => li.textContent).join('\n');
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
  
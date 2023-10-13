const script = document.createElement('script');
script.textContent = `
    (function() {
        function copyListText() {
            const element = document.elementFromPoint(${JSON.stringify(event.pageX)}, ${JSON.stringify(event.pageY)});
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

        copyListText();
    })();
`;
(document.head || document.documentElement).appendChild(script);
script.remove();

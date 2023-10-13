const script = document.createElement('script');
script.textContent = `
    console.log('Direct script injection working.');
    alert('Direct script injection working.');
`;
(document.head || document.documentElement).appendChild(script);
script.remove();

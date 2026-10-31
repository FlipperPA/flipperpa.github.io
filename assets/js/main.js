// Adds a "Copy" button to every highlighted code block.
(function () {
  if (!navigator.clipboard) return;
  document.querySelectorAll('div.highlighter-rouge').forEach(function (block) {
    var code = block.querySelector('pre code');
    if (!code) return;
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'copy-button';
    button.textContent = 'Copy';
    button.addEventListener('click', function () {
      navigator.clipboard.writeText(code.innerText).then(function () {
        button.textContent = 'Copied!';
        setTimeout(function () { button.textContent = 'Copy'; }, 1500);
      });
    });
    block.appendChild(button);
  });
})();

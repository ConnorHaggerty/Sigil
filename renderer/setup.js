const urlInput = document.getElementById('url-input');
const connectBtn = document.getElementById('connect-btn');

function connect() {
  const url = urlInput.value.trim();
  if (!url) return;
  window.sigil.saveUrl(url);
}

connectBtn.addEventListener('click', connect);

// Also connect on Enter key
urlInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') connect();
});

(function () {
  const container = document.querySelector('.formaloo--root-container');
  const loader = document.getElementById('formLoader');
  const slow = document.getElementById('slowNotice');

  function hideLoader(){ if (loader) loader.classList.add('hidden'); }
  function showSlow(){ if (slow) slow.classList.remove('hidden'); }

  if (!container) { hideLoader(); return; }

  if (container.querySelector('iframe')) { hideLoader(); return; }

  const obs = new MutationObserver(() => {
    if (container.querySelector('iframe')) { hideLoader(); obs.disconnect(); }
  });
  obs.observe(container, { childList: true, subtree: true });

  setTimeout(showSlow, 3000);
  setTimeout(hideLoader, 15000);
})();

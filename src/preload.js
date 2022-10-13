window.addEventListener('DOMContentLoaded', () => {
  const preloadImports = {
  };
  window.preloadImports = preloadImports;
  const customEvent = window.document.createEvent('Events');
  customEvent.initEvent('preloadComplete', true, true);
  window.dispatchEvent(customEvent);
});

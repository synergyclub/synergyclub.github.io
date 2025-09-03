async function injectLayout(id, file) {
  const container = document.getElementById(id);
  if (container) {
    const html = await fetch(file).then(res => res.text());
    container.innerHTML = html;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  injectLayout('head-layout', 'layout/head.html');
  injectLayout('sidebar-layout', 'layout/sidebar.html');
  injectLayout('topbar-layout', 'layout/topbar.html');
  injectLayout('cookie-layout', 'layout/cookie.html');
  injectLayout('footer-layout', 'layout/footer.html');
});

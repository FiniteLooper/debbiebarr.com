(() => {
  const $body = document.querySelector('body');
  const $toggleSidebar = document.querySelector('#toggle-sidebar');
  const $sidebar = document.querySelector('#sidebar');
  const $closeSidebar = document.querySelector('#close-sidebar');
  const $sidebarLinks = Array.from(document.querySelectorAll('#sidebar a, #sidebar button'));
  const $sidebarBackdrop = document.querySelector('#sidebar-backdrop');

  $sidebarLinks.forEach((l) => (l.tabIndex = -1));

  let sideNavOpen = false;
  function updateSidebarClass() {
    $body.classList.toggle('sidebar-open', sideNavOpen);

    if (sideNavOpen) {
      $sidebar.focus();
    } else {
      document.activeElement.blur();
    }

    //make the links focusable only when shown on screen
    $sidebarLinks.forEach((l) => (l.tabIndex = sideNavOpen ? 0 : -1));
  }

  function closeSidebar(ev) {
    ev.preventDefault();
    sideNavOpen = false;
    updateSidebarClass();
  }

  document.body.addEventListener(
    'keyup',
    (ev) => {
      if (sideNavOpen && ev.key === 'Escape') {
        sideNavOpen = false;
        updateSidebarClass();
      }
    },
    false,
  );

  $toggleSidebar.addEventListener(
    'click',
    (ev) => {
      ev.preventDefault();
      sideNavOpen = !sideNavOpen;
      updateSidebarClass();
    },
    false,
  );

  $closeSidebar.addEventListener('click', closeSidebar, false);
  $sidebarBackdrop.addEventListener('click', closeSidebar, false);
  $sidebarBackdrop.addEventListener('touchstart', closeSidebar, false);
})();

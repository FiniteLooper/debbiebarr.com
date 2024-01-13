(() => {
  const $body = document.querySelector('body');
  const $header = document.querySelector('#header');
  const $toggleSidebar = document.querySelector('#toggle-sidebar');
  const $sidebar = document.querySelector('#sidebar');
  const $closeSidebar = document.querySelector('#close-sidebar');
  const $sidebarLinks = Array.from(document.querySelectorAll('#side-navigation a'));
  const $sidebarBackdrop = document.querySelector('#sidebar-backdrop');
  const $bookDetailsSubnavItems = document.querySelectorAll(
    '#book-details-content .sub-navigation a',
  );

  //--------------------------------------------
  //SIDE NAVIGATION
  //--------------------------------------------
  //make the side nav links not focusable by default
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

  //--------------------------------------------
  //BOOK DETAILS
  //--------------------------------------------
  if ($bookDetailsSubnavItems) {
    const bookDetailsBgImgHeight = 300;
    const $bookDetailsTitles = document.querySelector('#book-details-titles');
    const $bookDetailsLinks = document.querySelector('#book-details-links');
    const positionBookLinks = () => {
      const titlesRect = $bookDetailsTitles.getBoundingClientRect();
      const linksMarginTop =
        bookDetailsBgImgHeight - Math.round(titlesRect.bottom - $header.offsetHeight);

      $bookDetailsLinks.style.marginTop = `${linksMarginTop}px`;
    };

    //Run on window resize
    let resizeDebounce = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeDebounce);
      resizeDebounce = setTimeout(positionBookLinks, 500);
    });

    //Run initially
    positionBookLinks();

    //Clicking on the book details sub-navigation will show the related sections
    //The href of the link must match the ID of the element to show
    $bookDetailsSubnavItems.forEach((item) => {
      item.addEventListener('click', (ev) => {
        ev.preventDefault();
        $bookDetailsSubnavItems.forEach((x) => {
          x.classList.remove('current');
          document.querySelector(x.getAttribute('href')).classList.add('d-none');
        });
        item.classList.add('current');
        document.querySelector(item.getAttribute('href')).classList.remove('d-none');
      });
    });
  }
})();

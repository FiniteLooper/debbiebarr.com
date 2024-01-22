(() => {
  const $body = document.querySelector('body');
  const $toggleSidebar = document.querySelector('#toggle-sidebar');
  const $sidebar = document.querySelector('#sidebar');
  const $closeSidebar = document.querySelector('#close-sidebar');
  const $sidebarLinks = Array.from(document.querySelectorAll('#sidebar a, #sidebar button'));
  const $sidebarBackdrop = document.querySelector('#sidebar-backdrop');
  const pathname = location.pathname.toLowerCase().trim();

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
  //BOOK DETAILS - anything under the /books/* but not the "books for caregivers" page
  //--------------------------------------------
  if (!pathname.includes('books-for-caregivers') && /\/books\/.+$/i.test(pathname)) {
    const bookDetailsBgImgHeight = 300;
    const $bookDetailsWrapper = document.querySelector('#book-details-wrapper');
    const $bookDetailsTitles = document.querySelector('#book-details-titles');
    const $bookDetailsLinks = document.querySelector('#book-details-links');
    const $bookDetailsSubnav = document.querySelector('#book-details-content > .sub-navigation');
    const $bookDetailsSubnavItems = $bookDetailsSubnav.querySelectorAll('a');

    const positionBookLinks = () => {
      const wrapperTopOffset = parseInt(getComputedStyle($bookDetailsWrapper).paddingTop, 10);
      const pos = wrapperTopOffset + $bookDetailsTitles.offsetHeight;
      const linksMarginTop = bookDetailsBgImgHeight - pos;
      $bookDetailsLinks.style.marginTop = `${linksMarginTop}px`;
    };

    const sizeSubnavBackground = () => {
      $bookDetailsSubnav.style.setProperty('--book-details-subnav-bg-height', `${$bookDetailsSubnav.clientHeight}px`);
    };

    //Run on window resize
    let resizeDebounce = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeDebounce);
      resizeDebounce = setTimeout(() => {
        positionBookLinks();
        sizeSubnavBackground();
      }, 250);
    });

    //Run initially
    positionBookLinks();
    sizeSubnavBackground();

    //Clicking on the book details sub-navigation will show the related sections
    //The href of the link must match the ID of the element to show
    $bookDetailsSubnavItems.forEach((item) => {
      item.addEventListener('click', (ev) => {
        ev.preventDefault();
        $bookDetailsSubnavItems.forEach((item) => {
          item.classList.remove('current');
          document.querySelector(item.getAttribute('href')).classList.add('d-none');
        });
        item.classList.add('current');
        const $nowShowing = document.querySelector(item.getAttribute('href'));
        $nowShowing.classList.remove('d-none');
        $nowShowing.focus();
      });
    });
  }

  //--------------------------------------------
  //CONTACT FORM
  //--------------------------------------------
  if (pathname.includes('/contact')) {
    const $form = document.querySelector('#contact-form');
    const $formFields = $form.querySelectorAll('input,textarea');
    const $status = document.querySelector('#form-status');
    const txtClassSuccess = 'text-success';
    const txtClassError = 'text-danger';
    const msgSuccess = "Thanks! I'll be in contact with you soon!";
    const msgError = 'Oops! There was a problem submitting your message, try again later!';

    $form.addEventListener('submit', async function (event) {
      event.preventDefault();
      event.stopPropagation();

      $form.classList.add('was-validated');
      if ($form.checkValidity()) {
        const data = new FormData(event.target);
        fetch(event.target.action, {
          method: $form.method,
          body: data,
          headers: {
            Accept: 'application/json',
          },
        })
          .then((response) => {
            if (response.ok) {
              formSuccess();
            } else {
              response.json().then((data) => {
                if (Object.hasOwn(data, 'errors')) {
                  $status.classList.add(txtClassError);
                  $status.innerHTML = data['errors'].map((error) => error['message']).join(', ');
                } else {
                  formError(data);
                }
              });
            }
          })
          .catch((err) => formError(err));
      }
    });

    const formSuccess = () => {
      $status.innerHTML = msgSuccess;
      $status.classList.remove(txtClassError);
      $status.classList.add(txtClassSuccess);
      $formFields.forEach((f) => {
        f.setAttribute('readonly', '');
        f.classList.add('is-valid');
      });
      $form.querySelector('button').disabled = true;
    };

    const formError = (err) => {
      $status.classList.add(txtClassError);
      $status.innerHTML = msgError;
      console.error(err);
    };
  }
})();

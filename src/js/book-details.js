(() => {
  const bookDetailsBgImgHeight = 300;
  const contentSectionIdPrefix = 'book-';
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

  const showContentSection = (el, shouldFocus) => {
    $bookDetailsSubnavItems.forEach((x) => {
      x.classList.remove('current');
      document.querySelector(x.getAttribute('href')).classList.add('d-none');
    });
    el.classList.add('current');
    const $nowShowing = document.querySelector(el.getAttribute('href'));
    $nowShowing.classList.remove('d-none');
    if (shouldFocus) {
      $nowShowing.focus();
    }
  };

  //Auto-select the section if it's in the URL hash
  if (location.hash != '') {
    const $matchingLink = $bookDetailsSubnav.querySelector(`[href="#${contentSectionIdPrefix}${location.hash.replace('#', '')}"]`);
    showContentSection($matchingLink, false);
  }

  //Clicking on the book details sub-navigation will show the related sections
  //The href of the link must match the ID of the element to show
  $bookDetailsSubnavItems.forEach(($item) => {
    $item.addEventListener('click', (ev) => {
      ev.preventDefault();
      showContentSection($item, true);
      history.replaceState(undefined, undefined, $item.getAttribute('href').replace(contentSectionIdPrefix, ''));
    });
  });
})();

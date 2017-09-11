init();

function init() {
  let navItems = {
    prev: document.querySelector('link[rel="prev"]').getAttribute('href'),
    next: document.querySelector('link[rel="next"]').getAttribute('href'),
    index: document.querySelector('link[rel="index"]').getAttribute('href')
  };
  let body = document.querySelector('body');

  // back and forth
  let nav = document.createElement('NAV');
  body.appendChild(nav);

  Object.keys(navItems).map(key => {
    let el = document.createElement('A');
    el.setAttribute('href', navItems[key]);
    el.setAttribute('id', `nav-${key}`);
    el.dataset.key = key;
    el.innerHTML = key;
    el.addEventListener('click', (e) => {
      let scrolled = scrollPage(e.target.dataset.key);
      if (scrolled) e.preventDefault();
    });;

    nav.appendChild(el);
  });

  // click on passive elements triggers navigation
  /*body.addEventListener('touchend', (event) => {
    if (['P', 'ARTICLE', 'BLOCKQUOTE', 'SPAN', 'UL', 'OL', 'SECTION'].indexOf(event.target.nodeName) > -1) {
      if (event.touches[0].pageX / window.innerWidth > 0.4) {
        scrollPage('next');
      } else {
        scrollPage('prev');
      }
    }
  });*/

  // swipe nav
  if (window.innerWidth < 699) {
    var hammer = new Hammer(body);
    hammer.on("swipeleft", event => {
      let scrolled = scrollPage('next');
      if (!scrolled) { window.location = meta.next; }
    });

    hammer.on("swiperight", event => {
      let scrolled = scrollPage('prev');
      if (!scrolled) { window.location = meta.prev; }
    });
  }

  // top/bottom nav
  let topStripe = document.querySelector('body > .top');
  let bottomStripe = document.querySelector('body > .bottom');

  if (topStripe) {
    topStripe.addEventListener('click', () => {
      let scrolled = scrollPage('prev');
      if (!scrolled) { window.location = meta.prev; }
    })
  }

  if (bottomStripe) {
    bottomStripe.addEventListener('click', () => {
      let scrolled = scrollPage('next');
      if (!scrolled) { window.location = meta.next; }
    })
  }

  // top bar
  if (meta.section === 'index') {
    document.querySelector('#nav-index').remove();
  } else {
    var header = document.createElement('HEADER');
    var indexLink = document.querySelector('#nav-index');
    indexLink.innerHTML = `☰ <span class="name">${meta.publication}</span>`;
    header.appendChild(indexLink);

    var headerTitle = document.createElement('SPAN');
    headerTitle.classList.add('title');
    headerTitle.innerHTML = document.querySelector('title').innerHTML;
    header.appendChild(headerTitle);

    body.appendChild(header);
  }

  // reading position
  ['scroll', 'resize'].forEach(event => {
    window.addEventListener(event, displayReadingPosition);
  });
  displayReadingPosition();


  // mobile nav links
  let nextMobileLink = document.createElement('A');
  nextMobileLink.setAttribute('href', navItems['next']);
  nextMobileLink.classList.add('mobile-next');

  if (meta.section === 'index') {
    let lastPos = getLatestPosition();
    nextMobileLink.innerHTML = '&rarr;';
    if (lastPos) {
      nextMobileLink.setAttribute('href', `./${lastPos.section}.html#${lastPos.idea}`);
      nextMobileLink.innerHTML = 'poslední otevřené místo &rarr;'
    }

    let h2 = document.querySelector('h2');
    h2.appendChild(document.createTextNode(' · '));
    h2.appendChild(nextMobileLink);

  } else if (window.innerWidth < 699) {
    nextMobileLink.innerHTML = '&darr;';
    body.appendChild(nextMobileLink);

    let prevMobileLink = document.createElement('A');
    prevMobileLink.setAttribute('href', navItems['prev']);
    prevMobileLink.classList.add('mobile-prev');
    prevMobileLink.innerHTML = '&uarr;';
    let header = document.querySelector('header');
    header.appendChild(prevMobileLink);
  }
}

function scrollPage(direction) {
  let els = document.querySelectorAll('hr');
  let divider = els.length > 0 ? els[0] : null;

  if (divider) {
    switch(direction) {
      case 'prev':
        return scrollUp(divider);
      case 'next':
        return scrollDown(divider);
      default:
    }
  }
}

function scrollDown(divider) {
  if (divider.getBoundingClientRect().top > window.innerHeight) {
    window.scrollTo(0, window.scrollY + (window.innerHeight - 100));
    return true;
  } else return false;
}

function scrollUp(divider) {
  if (window.scrollY > 0) {
    window.scrollTo(0, window.scrollY - (window.innerHeight - 100));
    return true;
  } else return false;
}

function displayReadingPosition() {
  if (meta.excludedFromStats == 'true') return false;

  let relativePosition = {
    chars: {
      count: meta.charCount / meta.publicationCharCount,
      position: meta.charPosition / meta.publicationCharCount,
    },
    words:  {
      count: meta.wordCount / meta.publicationWordCount,
      position: meta.wordPosition / meta.publicationWordCount,
    },
  };

  let view = {
    viewHeight: window.innerHeight,
    fromTop: window.scrollY,
    totalHeight: document.body.scrollHeight,
  };

  let relativeView = {
    size: view.viewHeight / view.totalHeight,
    position: view.fromTop / view.totalHeight,
  }

  let chpos = document.querySelector('#chapterPosition');

  if (!chpos) {
    chpos = document.createElement('DIV');
    chpos.setAttribute('id', 'chapterPosition');
    document.querySelector('body').appendChild(chpos);

    let vpos = document.createElement('DIV');
    vpos.setAttribute('id', 'viewPosition');
    chpos.appendChild(vpos);
  }

  let vpos = document.querySelector('#viewPosition');

  chpos.style.left = '' + (relativePosition.chars.position * 100) + '%';
  chpos.style.width = '' + (relativePosition.chars.count * 100) + '%';

  vpos.style.left = '' + (relativeView.position * 100) + '%';
  vpos.style.width = '' + (relativeView.size * 100) + '%';
}

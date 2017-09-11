var traceInterval = 3000;
var saveInterval = 5000;
var sessionBreakLength = 10 * 60 * 1000;
var showEvent = new Event('show', {
  'view': window,
  'bubbles': true
});
var sessionStartEvent = new Event('sessionStart', {
  'view': window,
  'bubbles': true
});

var meta = loadMeta();
var chunks = Array.prototype.slice.call(document.querySelectorAll('.chunk'));
var ideas = Array.prototype.slice.call(document.querySelectorAll('.idea'));

var loadBookTrace = loadBookTraceF(meta.publication);
var saveBookTrace = saveBookTraceF(meta.publication);
var updateSectionTrace = updateSectionTraceF(meta.section);

var bookTrace = loadBookTrace();

init();

function init() {
  if (parseInt(meta.section) === 0) return;

  // trace data
  restoreSectionTrace(bookTrace, meta.section);
  var traceSaveInterval = window.setInterval(updateSectionTrace, saveInterval);

  // show
  var triggerShowInterval = window.setInterval(triggerShow, traceInterval);

  ['scroll', 'resize'].forEach((event) => {
    window.clearInterval(triggerShowInterval);
    triggerShowInterval = window.setInterval(triggerShow, traceInterval);
  });

  document.querySelector('body').addEventListener('show', (event) => {
    let chunk = event.target;
    markTimeSpent(chunk);
    addSeenClass(chunk);
  });

  // session
  var sessionTrackerInterval = window.setInterval(trackSession, traceInterval);
}

function trackSession() {
  var date = new Date();

  if (bookTrace.sessions.length > 0) {
    var latest = bookTrace.sessions[bookTrace.sessions.length - 1];
    if (date.getTime() - latest.end < sessionBreakLength) {
      latest.end = date.getTime();

      if (!latest.sections.includes(meta.section + window.location.hash)) {
        latest.sections.push(meta.section + window.location.hash);
      }
    } else {
      appendNewSession();
      document.querySelector('body').dispatchEvent(sessionStartEvent);
    }
  } else {
    appendNewSession();
  }
}

function appendNewSession() {
  var date = new Date();

  bookTrace.sessions.push({
    start: date.getTime(),
    end: date.getTime(),
    sections: [meta.section],
    geo: null,
  });
}

function getLatestPosition() {
  if (!bookTrace.sessions) return null;

  let sections = bookTrace.sessions[bookTrace.sessions.length - 1].sections;
  if (!sections.length) return null;

  let position = [];
  let i = 0;
  do {
    i += 1;
    if (!sections[sections.length - i]) return null;
    position = sections[sections.length - i].split('#');
  } while (position[0] == 'index');

  return { section: position[0], idea: position[1] };

}

function loadMeta() {
  return Array.prototype.slice
    .call(document.querySelectorAll('meta[name]'))
    .reduce((acc, el) => {
      acc[el.getAttribute('name')] = el.getAttribute('content');
      return acc;
    }, {});
}

function markTimeSpent(chunk) {
  chunk.dataset.shown = chunk.dataset.shown > 0
    ? parseInt(chunk.dataset.shown, 10) + 1
    : 1;
}

function addSeenClass(chunk) {
  if (!chunk.classList.contains('seen') && chunk.dataset.shown > 0) {
    chunk.classList.add('seen');
  }
}

function triggerShow() {
  chunks.forEach(chunk => {
    if (isElementInViewport(chunk)) {
      chunk.dispatchEvent(showEvent);
    }
  });
}

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return  rect.top >= 0 && rect.top < (window.innerHeight || document.documentElement.clientHeight)
}


function updateSectionTraceF(section) {
  return () => {
    if (!bookTrace.sections[section]) {
      bookTrace.sections[section] = createNewSectionTrace();
    }

    bookTrace.sections[section].chunks = chunks.map(
      chunk => ({ shown: chunk.dataset.shown })
    );

    saveBookTrace();
  };
}

function createNewSectionTrace() {
  return {
    chunks: null,
  };
}

function saveBookTraceF(publication) {
  var date = new Date();

  return () => {
    bookTrace.mtime = date.getTime();
    localStorage.setItem(publication, JSON.stringify(bookTrace));
  };
}

function restoreSectionTrace(bookTrace, section) {
  if (!meta.excludedFromStats != 'true' && bookTrace.sections[section]) {
    bookTrace.sections[section].chunks.map((trace, index) => {
      if (trace.shown) {
        chunks[index].dataset.shown = trace.shown;
        addSeenClass(chunks[index]);
      }
    });
  }
}

function loadBookTraceF(publication) {
  return () => {
    var restored = localStorage.getItem(publication);

    if (restored) return JSON.parse(restored);
    else return createBookTrace();
  };
}

// TODO add top level revision structure
function createBookTrace() {
  var date = new Date();

  return {
    ctime: date.getTime(),
    sections: {},
    sessions: []
  };
}

function syncBookTrace() {
  // username, password, API url
}




function createPosition(section, idea) {
  return { section, idea };
}

function isElementFirstInViewport(el) {
  var rect = el.getBoundingClientRect();
  return  rect.top >= 0;// && rect.top < (window.innerHeight || document.documentElement.clientHeight)
}

function getFirstElementInViewport(els) {
  return els.reduce((first, el) => {
    if (!first && isElementFirstInViewport(el)) first = el;
    return first;
  }, null);
}




var scrollTimer;

window.addEventListener('scroll', () => {
  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(refreshIdeaHash, 150);
});

function refreshIdeaHash() {
  var idea = getFirstElementInViewport(ideas);
  history.replaceState(undefined, undefined, '#' + idea.getAttribute('id'));
};

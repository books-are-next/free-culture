const organize = fotnoteEls => Array.prototype.map.call(fotnoteEls, (el) => ({
  ref: el,
  key: el.querySelector('a').getAttribute('href'),
  item: document.querySelector(el.querySelector('a').getAttribute('href'))
}));

let footnotes = organize(document.querySelectorAll('.footnote-ref'));

footnotes.reduce((acc, footnote) => {
  footnote.ref.querySelector('a').innerHTML = 'ℹ️';
  
  footnote.ref.addEventListener('click', (e) => {
    showNote(footnote.item);
    e.preventDefault();
  });

  // 
}, 0);

document.querySelector('body').addEventListener('click', (e) => {
  if (e.target.classList.contains('closeBox')) {
    hideNote();
    e.preventDefault();
  }
});

function showNote(note) {
  if (document.querySelector('.noteBox')) {
    hideNote();
  }
  
  let noteBox = document.createElement('DIV');
  noteBox.classList.add('noteBox');
  
  if (typeof(note) === 'string') {
    let content = document.createElement('DIV');
    content.innerHTML = note;
    noteBox.appendChild(content);
  } else {
    let placeholder = document.createElement('DIV');
    placeholder.classList.add('note-content-placeholder');
    note.parentNode.insertBefore(placeholder, note);
    
    noteBox.appendChild(note);
  }
  
  let closeBox = document.createElement('A');
  closeBox.classList.add('closeBox');
  closeBox.setAttribute('href', '#');
  closeBox.innerHTML = '✕';
  noteBox.appendChild(closeBox);
  
  document.querySelector('body').appendChild(noteBox);
}

function hideNote() {
  let noteBox = document.querySelector('.noteBox');
  let placeholder = document.querySelector('.note-content-placeholder');
  
  if (noteBox) {
    if (placeholder) {
      placeholder.parentNode.insertBefore(noteBox.children[0], placeholder);
      placeholder.remove();
    }
    
    noteBox.remove();
  }
}



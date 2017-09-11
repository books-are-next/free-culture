const organizeC = citationEls => Array.prototype.map.call(citationEls, (el) => ({
  el: el,
  key: el.dataset.bibKey,
  note: el.getAttribute('title'),
  item: JSON.parse(el.dataset.bibHtml)
}));

let citations = organizeC(document.querySelectorAll('.bibliography'));

citations.reduce((acc, citation) => {
  citation.el.addEventListener('click', (e) => {
    showNote(citation.item.record);
    e.preventDefault();
  });
}, 0);
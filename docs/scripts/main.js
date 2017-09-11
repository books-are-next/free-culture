var header = document.querySelector('header');
if (header) {
	var headroom = new Headroom(header);
	headroom.init();
}

document.querySelectorAll('.dictionary-term').forEach((el) => {
	el.addEventListener('click', (event) => {
		let id = event.target.dataset.termIndex;
		window.location = `dictionary.html#term${id}`;
		event.preventDefault();
	});
});


let urlFragment = window.location.hash.substr(1);
if (urlFragment) {
	if (urlFragment.match(/^(term|idea)[0-9]+$/)) {
		document.querySelector(`#${urlFragment}`).classList.add('hlFragment');
		
		var headroom = document.querySelector('.headroom');
		if (headroom) {
			headroom.classList.remove('headroom--pinned');
			headroom.classList.add('headroom--unpinned');	
		}
	}
}

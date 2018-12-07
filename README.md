# next-book / Lawrence Lessig: Free Culture

**This edition of Free Culture *runs on next-book* — a piece of software exploring the shape of a book in a digital environment (along with all those *hows*, *whys* and *whats*). Instead of replicating the paper experience, we try to move forward beyond paper, embracing the *networked digital environment*.**

See the book at [next-book.github.io/free-culture/][book].


## How does this work? 🤔

Next-book consists of two main components:

- [nb-mapper][] is a publishing tool
- [nb-base][] is a browser library that provides reading affordances


## Is this the perfect e-book? 😅

Nope! Next-book tries to bring books into the open web, where progress is *possible*. At first, we need to make *the acceptable book* and then provide the *one thing that's better than other e-book* formats. Let's talk about what makes a book better.

Some notes on the current state of this book:

- Some affordances are boosted for exploratory purposes (such as on-hover highlighting of *ideas* that *might* be used in future for some interactions).
- Alphabetical index is missing in this edition at this time, soon to be reintroduced when it will be available in the [nb-mapper].
- Grabbing a book „to go“ and working with it locally is an important topic. We believe in *owning* books. Are [PWAs](https://en.wikipedia.org/wiki/Progressive_web_app) a part of the right answer? Maybe…
- Readable browser source („View code…“) is valuable. Thus moving a lot of this functionality to browser JS (or even to browser itself) might be reasonable. However that's too power hungry on reader devices now.

Read more about this in articles about [Next Book](https://jan-martinek.com/articles/the-next-book) and [what can we learn from how pagination is used in print](https://jan-martinek.com/articles/talkin-bout-pagination). (More to come.)

**Feel free to discuss anything in the [Github issues here](https://github.com/next-book/free-culture/issues) or at the [nb-mapper's](https://github.com/next-book/nb-mapper/issues) and [nb-base's](https://github.com/next-book/nb-base/issues) repos.**


## Can I play with this? 🧸

**Yes!** Grab this repo and publish another book! Current codebase should be strong enough even for some work. 

### 1. Insert your own content

- `content` folder is where the text of the book is, stored in markdown files (you can use HTML in markdown).
- `static/book.json` contains metadata and reading order of the chapters.
- In `assets/` you'll find SCSS and JS files.
- You can edit hugo templates in `layouts` folder. Don't remove the `.content` element that envelops the text.
- Add images, fonts and other files into `static` folder (contents will be on the same level in the finalized book as the HTML files).

### 2. Run the publishing program

1. You'll need two programs installed: [nodeJS](https://nodejs.org/) and [hugo](https://gohugo.io/).
2. Grab this repo and run `npm install` in the root directory.
3. Run `npm run build` and the book will await you in the `book` directory.

> This example works with `hugo`, a static site generator that compiles basic HTML from text files and HTML templates. If you'd rather start with HTML, run hugo first and explore the `html` folder — that is the source folder for the [nb-mapper][]. Then use `npm run build:fromhtml`.

That should do it! The book won't work when opened from the disk, but put it anywhere on the web (or access it via localhost) and everything should work.


## Paper into digital? 👀

Republishing a book that originated in print may feel wrong in this exploratory pursuit, but it puts emphasis on continuity. Text as a medium is more than the object that contains it: it's reading experience, communication platform, the publishing process, personal and social knowledge reservoir, learning tool etc. All these aspects are interwoven. 

We need to work carefully while keeping our tools as sharp as it gets.

*Why Lessig's Free Culture?* It's a book about a topic that touches *the digital* from another but similarly relevant and interconnected perspective. When we stop trying to map new problems on existing models, the world may start changing.

**Note:** *We started in fall 2016 with a research of current solutions and short/long term goals of their maintainers and decided to find another way. We value accessibility and standardization efforts in EPUB community, but at that time there weren't many signs of opening up to the [web](http://info.cern.ch/Proposal.html). There's [a lot going on now](https://w3c.github.io/dpub-pwp-ucr/) and we believe this code might be a way to express our ideas. Of course, there's a lot to be said, written and discussed. Please see all this as a contribution to a discussion.*


## License ✍️

Lawrence Lessig released a [PDF version](http://www.free-culture.cc/freecontent) of this book Free Culture under a [Creative Commons (BY-NC 1.0) license](https://creativecommons.org/licenses/by-nc/1.0/). José Menéndez produced and released its [HTML version](http://www.ibiblio.org/ebooks/Lessig/index.html) under the same license.

<a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/"><img alt="Creative Commons License" style="border-width:0" src="static/images/cc.png" /></a>

This HTML version is based on José Menéndez's code and is released by Jan Martinek under the updated version of the same license [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/).


## Thanks! 💖

- [Ivana Lukeš Rybanská] for the initial idea and adventure.
- Publishing house [Nová Beseda] for engaging with next-book a lot in publishing and research projects.
- [Boris Anthony](https://borisanthony.net) for discussions and encouragement!


[book]: https://next-book.github.io/free-culture/
[nb-base]: https://github.com/next-book/nb-base
[nb-mapper]: https://github.com/next-book/nb-mapper
[Nová beseda]:https://www.novabeseda.cz/page/english




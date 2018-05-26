# Sweet-Button.js

---

A lightweight jQuery button plugin. Designed for developers, it's simple to use but very powerful.

---

## Features

* Generate SVG shapes such as hexagons, rectangles, circles, .. more to come
* Stack multiple shapes on top of eachother with different sizes to create elegant button designs
* Icons and button text are automatically aligned vertically and horizontally
* Set animation events and classes for each shape to create epicly interactive button effects
* Lightweight - ~160kb minified
* Built with developers in mind by providing debug logging messages when used incorrectly
* Supports scroll events
* Don't want to use the `sweet-button` prefix? Choose your own!

---

## Try It Out

`git clone https://github.com/superveetz/sweet-btn.git`
`cd sweet-button`
`npm install`
`npm run start`

Add this just before your closing `head` tag:

```html
<link rel="styesheet" href="/your/css/folder/popup.css">
```

Then, place `/assets/js/jquery.popup.min.js` in `/your/js/folder/`.

Add this just before your closing `body` tag, after you've included jQuery:

```html
<script src="/your/js/folder/jquery.popup.min.js"></script>
```

---

## Usage

Set up your html:

```html
<a href="http://placehold.it/350x175.png" class="popup">Popup link</a>
```

Call the plugin:

```javascript
var options = {};
$('a.popup').popup(options);
```

---

## Documentation

For full documentation, have a look at [http://docs.toddish.co.uk/popup](http://docs.toddish.co.uk/popup).

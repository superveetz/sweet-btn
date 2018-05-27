# Sweet-Button.js

---

A lightweight jQuery button plugin that gives you options for how your buttons should look and feel. Designed for developers, it's simple to use but very powerful.

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

---

## Installation

This plugin relies on a couple packages which can be easily installed from npm:

`npm install async font-awesome jquery animate.css --save`

Install the Sweet-Button.js package and include it in your project (note: dependencies installed above should be loaded into your project before the `sweet-button.js` file:

`git clone https://github.com/superveetz/sweet-btn.git`

```html
<link rel='stylesheet' href='/font-awesome/css/font-awesome.min.css'>
<link rel='stylesheet' href='/animate.css/animate.min.css'>
<script src="/jquery/dist/jquery.minjs"></script>
<script src="/async/dist/async.minjs"></script>
<script src="/vendor/js/folder/sweet-button/release/sweet-button.js"></script>
```

Set up your html:

```html
<a 
  href='#'
  class='sweet-btn sweet-btn-xl'

  sweet-btn-glyph-classes='fa fa-fw fa-facebook-square'
  sweet-btn-glyph-size='sm'
  sweet-btn-glyph-color='skyblue'

  sweet-btn-shape-1='hexagon'
  sweet-btn-shape-1-background='blue'
  sweet-btn-shape-1-size='md'

  sweet-btn-shape-2='square'
  sweet-btn-shape-2-background='red'
  sweet-btn-shape-2-size='sm'

  sweet-btn-shape-3='circle'
  sweet-btn-shape-3-background='gold'
  sweet-btn-shape-3-size='xs'>
</a>
```

Call the plugin:

```javascript
$(document).ready(function() {
  $('.sweet-btn').sweetButton();
})();
```

---

## Documentation

Follow the `Try It Out` guide to view the full documentation.

# reveal-leap-motion

[![NPM version](http://img.shields.io/npm/v/reveal-leap-motion.svg)](https://www.npmjs.org/package/reveal-leap-motion)
[![Build Status](https://travis-ci.org/gneatgeek/reveal-leap-motion.svg?branch=master)](https://travis-ci.org/gneatgeek/reveal-leap-motion)

This plugin lets you utilize your [Leap Motion][1] device to control basic navigation of your [Reveal.js][2] presentation.

__Featured in:__
- [Put an End to Boring Presentations with Reveal.js][3]

## Getting Started
### npm
1. Download and install the package in the presentation project: `npm i -S reveal-leap-motion`
1. Add the plugin to the dependencies in the presentation, as below:

```js
Reveal.initialize({
    // ...
    dependencies: [
        // ...
        { src: 'node_modules/reveal-leap-motion/reveal-leap-motion.min.js', async: true }
    ]
});
```

### Manual
1. Add the [reveal-leap-motion.min.js](https://github.com/gneatgeek/reveal-leap-motion/blob/master/reveal-leap-motion.min.js) file to the slideshow project's plugin directory.
1. Add the plugin to the dependencies in the presentation, as below:

```js
Reveal.initialize({
    // ...
    dependencies: [
        // ...
        { src: 'plugin/reveal-leap-motion/reveal-leap-motion.min.js', async: true }
    ]
});
```

## Config Options
You can edit the following options:

| Property         | Default | Description                                                                             |
|------------------|:-------:|-----------------------------------------------------------------------------------------|
| autoCenter       |   true  | Center the pointer based on where your finger enters the leap motion's detection field. |
| gestureDelay     |   500   | How long to delay between gestures in milliseconds.                                     |
| naturalSwipe     |   true  | Swipe as though you were using a touch screen. Set to false to invert.                  |
| pointerColor     | #00aaff | The color of the pointer.                                                               |
| pointerOpacity   |   0.7   | The opacity of the pointer.                                                             |
| pointerSize      |    15   | The minimum height and width of the pointer.                                            |
| pointerTolerance |   120   | Larger values yield slower movement.                                                    |


__Example configuration:__

```js
Reveal.initialize({
  //...
  "reveal-leap-motion": {
    naturalSwipe: false,     // Invert swipe gestures
    pointerColor: '#d80000', // Red pointer
    pointerOpacity: 0.5,     // Set pointer opacity to 0.5
  },
});
```

## Supported Gestures

### Index Finger Only

When a single index finger is extended, a circular pointer will appear on screen, which tracks the finger. Moving closer to the device expands the pointer.

### Multiple Fingers with One Hand

Navigate through the slides by swiping up, down, left, or right. See the [config options](#config-options) to invert movements.

### Two Hands

Swiping upwards with two hands will toggle the overview mode. A second swipe will exit the overview.


[1]: https://www.leapmotion.com/
[2]: http://lab.hakim.se/reveal-js/#/
[3]: http://blog.leapmotion.com/featured-platform-put-end-boring-presentations-reveal-js/

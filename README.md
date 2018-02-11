# reveal-leap-motion

[![NPM version](http://img.shields.io/npm/v/reveal-leap-motion.svg)](https://www.npmjs.org/package/reveal-leap-motion)
[![Build Status](https://travis-ci.org/gneatgeek/reveal-leap-motion.svg?branch=master)](https://travis-ci.org/gneatgeek/reveal-leap-motion)

This plugin lets you utilize your [Leap Motion][1] device to control basic navigation of your [Reveal.js][2] presentation.

__Featured in:__
- [Put an End to Boring Presentations with Reveal.js][3]

## Getting Started
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

## Callouts

reveal-leap-js includes [LeapJS][4], developed by [Leap Motion][1] for your
convenience. LeapJS is licensed under the Apache 2.0 license which can be
obtained [here][5].

## Contributing

Contributions are encouraged and welcome! To get started, please see the
[contribution guide](CONTRIBUTING.md).


[1]: https://www.leapmotion.com/
[2]: http://lab.hakim.se/reveal-js/#/
[3]: http://blog.leapmotion.com/featured-platform-put-end-boring-presentations-reveal-js/
[4]: https://github.com/leapmotion/leapjs
[5]: https://github.com/leapmotion/leapjs/blob/master/LICENSE

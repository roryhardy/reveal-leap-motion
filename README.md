# reveal.js-leap-motion

The Leap Motion plugin lets you utilize your [Leap Motion][1] device to control basic navigation of your [Reveal.js][2] presentation.

## Supported gestures

**1 to 2 fingers**

Pointer &mdash; Point to anything on screen. Move your finger past the device to expand the pointer.

**1 hand + 3 or more fingers (left/right/up/down)**

Navigate through your slides. See config options to invert movements.

**2 hands upwards**

Toggle the overview mode. Do it a second time to exit the overview.

## Config Options
You can edit the following options:

| Property          | Default           | Description
| ----------------- |:-----------------:| :-------------
| autoCenter        | true              | Center the pointer based on where you put your finger into the leap motions detection field.
| gestureDelay      | 500               | How long to delay between gestures in milliseconds.
| naturalSwipe      | true              | Swipe as though you were touching a touch screen. Set to false to invert.
| pointerColor      | #00aaff           | The color of the pointer.
| pointerOpacity    | 0.7               | The opacity of the pointer.
| pointerSize       | 15                | The minimum height and width of the pointer.
| pointerTolerance  | 120               | Bigger = slower pointer.


Example configuration:
```js
Reveal.initialize({

  // other options...

  leap: {
    naturalSwipe   : false,    // Invert swipe gestures
    pointerOpacity : 0.5,      // Set pointer opacity to 0.5
    pointerColor   : '#d80000' // Red pointer
  },

  dependencies: [
    { src: 'plugin/leap/leap.js', async: true }
  ]

});
```

## Contributing

Help make this plugin better by contributing.
Any contribution is welcome be it new features or simply correcting a typo in the documentation.
To get started, log an issue to the [issue tracker][3] or submit a pull request.

### Issue reporting

* Please browse the [existing issues][3] before logging new issues.
* When creating an issue, please include a descriptive title and a summary.
* Please be clear and explicit in your description of the problem.
* Please include operating system, browser, and any other details that may be relevant pertaining to your environment.
* Please include any relevant code in the issue summary.


### Pull Requests
- Should follow the coding style of the file you work in, most importantly:
  - Two spaces to indent
  - Single-quoted strings
- Should be made towards the **master branch**
- Should be submitted from a feature/topic branch (not your master)

[1]: https://www.leapmotion.com/
[2]: http://lab.hakim.se/reveal-js/#/
[3]: https://github.com/gneatgeek/reveal.js-leap-motion/issues

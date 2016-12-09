/* global Reveal:false */

import Leap from 'leapjs';
import assign from 'lodash/assign';

/*!
 * reveal-leap-motion v1.0.0
 * https://github.com/gneatgeek/reveal-leap-motion
 *
 * Copyright 2016 Rory Hardy, James Sun, and other contributors
 * Released under the Apache-2.0 license
 * https://github.com/gneatgeek/reveal-leap-motion/blob/master/LICENSE
 */

let entered = false;
let lastGesture = 0;
let enteredPosition;

const defaults = {
  autoCenter: true,        // Center pointer around detected position
  gestureDelay: 500,       // How long to delay between gestures
  naturalSwipe: true,      // Swipe as if it were a touch screen
  pointerColor: '#00aaff', // Default color of the pointer
  pointerOpacity: 0.7,     // Default opacity of the pointer
  pointerSize: 15,         // Default minimum height/width of the pointer
  pointerTolerance: 120,   // Bigger = slower pointer
};

const body = document.body;
const controllerOptions = { enableGestures: true };
const leapConfig = Reveal.getConfig().leap;
const pointer = document.createElement('div');

const config = assign({}, defaults, leapConfig);

pointer.id = 'leap';
pointer.style.backgroundColor = config.pointerColor;
pointer.style.opacity = config.pointerOpacity;
pointer.style.position = 'absolute';
pointer.style.visibility = 'hidden';
pointer.style.zIndex = 50;

body.appendChild(pointer);

const updatePointer = (tipPosition) => {
  // Invert direction and multiply by 3 for greater effect
  let size = -3 * tipPosition;

  if (size < config.pointerSize) {
    size = config.pointerSize;
  }

  pointer.style.width = `${size}px`;
  pointer.style.height = `${size}px`;
  pointer.style.borderRadius = `${size - 5}px`;
  pointer.style.visibility = 'visible';
};

const computeCenteredPosition = (tipLocation, enteredLocation, offset, inverse = false) => {
  let position = ((tipLocation - enteredLocation) * offset) / config.pointerTolerance;

  if (inverse) {
    position *= -1;
  }

  return position + (offset / 2);
};

const computeLeftPosition = (tipPosition, offset) =>
  ((tipPosition * offset) / config.pointerTolerance) + (offset / 2);

const computeTopPosition = (tipPosition, offset) =>
  (1 - ((tipPosition - 50) / config.pointerTolerance)) * offset;

Leap.loop(controllerOptions, (frame) => {
  const now = new Date().getTime();

  // Check if the index finger is pointing
  // Check that the middle finger is not pointing to help clean up gestures
  if (frame.fingers.length > 0 && frame.fingers[1].extended && !frame.fingers[2].extended) {
    const offsetHeight = body.offsetHeight;
    const offsetWidth = body.offsetWidth;
    const tipPosition = frame.fingers[1].tipPosition;

    updatePointer(tipPosition[2]);

    if (config.autoCenter) {
      // Check whether the finger has entered the z range of the Leap Motion
      if (!entered) {
        entered = true;
        enteredPosition = frame.fingers[1].tipPosition;
      }

      const left = computeCenteredPosition(tipPosition[0], enteredPosition[0], offsetWidth);
      const top = computeCenteredPosition(tipPosition[1], enteredPosition[1], offsetHeight, true);

      pointer.style.left = `${left}px`;
      pointer.style.top = `${top}px`;
    } else {
      pointer.style.left = `${computeLeftPosition(tipPosition[0], offsetWidth)}px`;
      pointer.style.top = `${computeTopPosition(tipPosition[1], offsetHeight)}px`;
    }
  } else {
    // Hide pointer on exit
    entered = false;
    pointer.style.visibility = 'hidden';
  }

  // Check if the user is making a gesture
  if (frame.gestures.length > 0 && (now - lastGesture) > config.gestureDelay) {
    const gesture = frame.gestures[0];

    // One hand gestures
    if (frame.hands.length === 1) {
      // Swipe gestures. 3+ fingers.
      if (frame.fingers.length > 2 && gesture.type === 'swipe') {
        const x = gesture.direction[0];
        const y = gesture.direction[1];

        // Readability is enhanced in via ternary operators in this case
        /* eslint-disable no-unused-expressions */

        // Left/right swipe gestures
        if (Math.abs(x) > Math.abs(y)) {
          if (x > 0) {
            config.naturalSwipe ? Reveal.left() : Reveal.right();
          } else {
            config.naturalSwipe ? Reveal.right() : Reveal.left();
          }
        // Up/down swipe gestures
        } else if (y > 0) {
          config.naturalSwipe ? Reveal.down() : Reveal.up();
        } else {
          config.naturalSwipe ? Reveal.up() : Reveal.down();
        }

        /* eslint-enable no-unused-expressions */

        lastGesture = now;
      }
    } else if (frame.hands.length === 2) { // Two hand gestures
      // Upward two hand swipe gesture
      if (gesture.type === 'swipe' && gesture.direction[1] > 0) {
        Reveal.toggleOverview();
      }

      lastGesture = now;
    }
  }
});

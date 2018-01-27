import config from './config';
import {
  computeCenteredPosition,
  computeLeftPosition,
  computeTopPosition,
} from './lib';

const { body } = document;
const pointer = document.createElement('div');

let entered = false;
let enteredPosition;

pointer.id = 'reveal-leap-motion';
pointer.style.backgroundColor = config.pointerColor;
pointer.style.opacity = config.pointerOpacity;
pointer.style.position = 'absolute';
pointer.style.visibility = 'hidden';
pointer.style.zIndex = '50';

body.appendChild(pointer);

/**
 * Updates the pointer's size and location relative to where the user's finger
 * is located within the Leap Motion's field of view.
 *
 * @arg {number} tipPosition the Z vector coordinate of the user's finger
 * @arg {number} left computed left offset of the index finger
 * @arg {number} top computed top offset of the index finger
 */
function updatePointer(tipPosition, left, top) {
  // Invert direction and multiply by 3 for greater effect
  let size = -3 * tipPosition;

  // Don't allow the pointer to become smaller than the config size
  if (size < config.pointerSize) {
    size = config.pointerSize;
  }

  pointer.style.borderRadius = `${size - 5}px`;
  pointer.style.height = `${size}px`;
  pointer.style.left = `${left}px`;
  pointer.style.top = `${top}px`;
  pointer.style.width = `${size}px`;
}

/**
 * Shows, moves, and hides the pointer relative to the user's index finger.
 * See https://developer.leapmotion.com/documentation/javascript/api/Leap.Finger.html
 *
 * @arg {Object} fingers Leap Motion's representation of the user's fingers
 */
function pointing(fingers) {
  // Only show/update if the index finger is pointing and the middle finger is not
  if (fingers.length > 0 && fingers[1].extended && !fingers[2].extended) {
    const { offsetHeight, offsetWidth } = body;
    const { tipPosition } = fingers[1];
    let left;
    let top;

    // Check if the finger has entered the Leap Motion's field of view
    if (!entered) {
      entered = true;
      enteredPosition = fingers[1].tipPosition;

      pointer.style.visibility = 'visible';
    }

    if (config.autoCenter) {
      left = computeCenteredPosition(
        tipPosition[0],
        enteredPosition[0],
        offsetWidth,
        config.pointerTolerance,
      );

      top = computeCenteredPosition(
        tipPosition[1],
        enteredPosition[1],
        offsetHeight,
        config.pointerTolerance,
        true,
      );
    } else {
      left = computeLeftPosition(
        tipPosition[0],
        offsetWidth,
        config.pointerTolerance,
      );

      top = computeTopPosition(
        tipPosition[1],
        offsetHeight,
        config.pointerTolerance,
      );
    }

    updatePointer(tipPosition[2], left, top);
  } else if (entered) {
    // Hide pointer on exit
    entered = false;
    pointer.style.visibility = 'hidden';
  }
}

export default pointing;

/**
 * Computes the position of the user's index finger relative to the coordinates
 * of where it entered the Leap Motion's field of view.
 *
 * @arg {number} tipLocation the relative vector coordinate of the user's finger
 * @arg {number} enteredLocation the relative vector coordinate of the user's finger
 * @arg {number} offset the relative size of the body element
 * @arg {number} pointerTolerance how fast the pointer should move relative to the user's finger
 * @arg {boolean} inverse whether or not to inverse the direction (used for height)
 */
function computeCenteredPosition(
  tipLocation,
  enteredLocation,
  offset,
  pointerTolerance,
  inverse = false,
) {
  let position = ((tipLocation - enteredLocation) * offset) / pointerTolerance;

  if (inverse) {
    position *= -1;
  }

  return position + (offset / 2);
}

/**
 * Computes the left position of the pointer relative to the coordinates
 * of the user's index finger in the Leap Motion's field of view.
 *
 * @arg {number} tipPosition the X vector coordinate of the user's finger
 * @arg {number} offset the width of the body element
 * @arg {number} pointerTolerance how fast the pointer should move relative to the user's finger
 */
function computeLeftPosition(tipPosition, offset, pointerTolerance) {
  return ((tipPosition * offset) / pointerTolerance) + (offset / 2);
}

/**
 * Computes the top position of the pointer relative to the coordinates
 * of the user's index finger in the Leap Motion's field of view.
 *
 * @arg {number} tipPosition the Y vector coordinate of the user's finger
 * @arg {number} offset the height of the body element
 * @arg {number} pointerTolerance how fast the pointer should move relative to the user's finger
 */
function computeTopPosition(tipPosition, offset, pointerTolerance) {
  return (1 - ((tipPosition - 50) / pointerTolerance)) * offset;
}

export {
  computeCenteredPosition,
  computeLeftPosition,
  computeTopPosition,
};

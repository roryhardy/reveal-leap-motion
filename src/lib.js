const computeCenteredPosition =
(tipLocation, enteredLocation, offset, pointerTolerance, inverse = false) => {
  let position = ((tipLocation - enteredLocation) * offset) / pointerTolerance;

  if (inverse) {
    position *= -1;
  }

  return position + (offset / 2);
};

const computeLeftPosition = (tipPosition, offset, pointerTolerance) =>
  ((tipPosition * offset) / pointerTolerance) + (offset / 2);

const computeTopPosition = (tipPosition, offset, pointerTolerance) =>
  (1 - ((tipPosition - 50) / pointerTolerance)) * offset;

export {
  computeCenteredPosition,
  computeLeftPosition,
  computeTopPosition,
};

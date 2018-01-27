import config from './config';

let lastGesture = 0;

/**
 * Interacts with the slideshow based on the gesture performed by the user.
 * One handed swipe gestures navigate the slideshow.
 * Two handed upwards swipe gestures show the overview pane.
 *
 * @arg {Object} frame The Leap Loop frame
 * See https://developer.leapmotion.com/documentation/javascript/api/Leap.Gesture.html
 */
function gesturing({ fingers, gestures, hands }) {
  const now = new Date().getTime();

  // Validate that the user is making a gesture
  if (gestures.length > 0 && (now - lastGesture) > config.gestureDelay) {
    const gesture = gestures[0];

    // One hand gestures - validate that user is not pointing
    if (hands.length === 1 && fingers[2].extended) {
      if (gesture.type === 'swipe') {
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

        lastGesture = now;
      }
    } else if (hands.length === 2) { // Two hand gestures
      // Upward two hand swipe gesture
      if (gesture.type === 'swipe' && gesture.direction[1] > 0) {
        Reveal.toggleOverview();
      }

      lastGesture = now;
    }
  }
}

export default gesturing;

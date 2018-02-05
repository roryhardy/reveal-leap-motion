/*
 * Mock the global Reveal object for the tests.
 */
global.Reveal = {
  getConfig: () => ({
    'reveal-leap-motion': {
      gestureDelay: -15, // Remove delays to simplify tests
      pointerColor: '#55cc00',
    },
  }),
  down: () => {},
  left: () => {},
  right: () => {},
  toggleOverview: () => {},
  up: () => {},
};

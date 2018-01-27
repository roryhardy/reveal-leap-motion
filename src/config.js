import assign from 'lodash/assign';

const defaults = {
  autoCenter: true, // Center pointer around detected position
  gestureDelay: 500, // How long to delay between gestures
  naturalSwipe: true, // Swipe as if it were a touch screen
  pointerColor: '#00aaff', // Default color of the pointer
  pointerOpacity: 0.7, // Default opacity of the pointer
  pointerSize: 15, // Default minimum height/width of the pointer
  pointerTolerance: 120, // Bigger = slower pointer
};

const leapConfig = Reveal.getConfig()['reveal-leap-motion'];

const config = assign({}, defaults, leapConfig);

export default config;

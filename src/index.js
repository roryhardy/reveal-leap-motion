import Leap from 'leapjs';
import gesturing from './gesturing';
import pointing from './pointing';

const controllerOptions = { enableGestures: true };

// https://developer.leapmotion.com/documentation/javascript/api/Leap_Classes.html#Leap.loop
Leap.loop(controllerOptions, (frame) => {
  pointing(frame.fingers);
  gesturing(frame);
});

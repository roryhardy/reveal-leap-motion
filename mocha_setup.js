/*
 * Setup for Mocha testing.
 * This file defines globals, DOM, etc which need to be instantiated prior
 * to any tests being run.
 */

// eslint-disable-next-line import/no-extraneous-dependencies
const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

global.window = window;
global.document = window.document;

// Mock the global Reveal object
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

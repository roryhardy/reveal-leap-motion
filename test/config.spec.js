import { expect } from 'chai';
import config from '../src/config';

/* eslint-disable func-names, prefer-arrow-callback */

describe('config', function () {
  it('allows the user to pass in overrides', function () {
    expect(config.pointerColor).to.equal('#55cc00');
  });
});

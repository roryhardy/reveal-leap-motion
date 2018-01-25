/* eslint-env mocha */

import {
  computeCenteredPosition,
  computeLeftPosition,
  computeTopPosition,
} from '../src/lib';

const chai = require('chai');

const { expect } = chai;

describe('#computeCenteredPosition', () => {
  describe('when inverse is false', () => {
    it('returns NaN with all 0 input', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(computeCenteredPosition(0, 0, 0, 0)).to.be.NaN;
    });

    it('works with all positive input', () => {
      expect(computeCenteredPosition(1, 1, 1, 1)).to.equal(0.5);
    });

    it('works with all negative input', () => {
      expect(computeCenteredPosition(-1, -1, -1, -1)).to.equal(-0.5);
    });

    it('works with mixed input', () => {
      expect(computeCenteredPosition(0, 2, 1, -1)).to.equal(2.5);
    });
  });

  describe('when inverse is true', () => {
    it('returns NaN with all 0 input', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(computeCenteredPosition(0, 0, 0, 0, true)).to.be.NaN;
    });

    it('inverses the direction', () => {
      expect(computeCenteredPosition(1, 2, 1, 1, true)).to.equal(1.5);
      expect(computeCenteredPosition(0, 2, 1, -1, true)).to.equal(-1.5);
    });
  });
});

describe('#computeLeftPosition', () => {
  it('returns NaN with all 0 input', () => {
    // eslint-disable-next-line no-unused-expressions
    expect(computeLeftPosition(0, 0, 0)).to.be.NaN;
  });

  it('works with all positive input', () => {
    expect(computeLeftPosition(1, 1, 1)).to.equal(1.5);
  });

  it('works with all negative input', () => {
    expect(computeLeftPosition(-1, -1, -1)).to.equal(-1.5);
  });

  it('works with mixed input', () => {
    expect(computeLeftPosition(0, 1, -1)).to.equal(0.5);
  });
});

describe('#computeTopPosition', () => {
  it('returns NaN with all 0 input', () => {
    // eslint-disable-next-line no-unused-expressions
    expect(computeTopPosition(0, 0, 0)).to.be.NaN;
  });

  it('works with all positive input', () => {
    expect(computeTopPosition(1, 1, 1)).to.equal(50);
  });

  it('works with all negative input', () => {
    expect(computeTopPosition(-1, -1, -1)).to.equal(50);
  });

  it('works with mixed input', () => {
    expect(computeTopPosition(0, 1, -1)).to.equal(-49);
  });
});

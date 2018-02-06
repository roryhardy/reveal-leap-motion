import { expect } from 'chai';

import {
  computeCenteredPosition,
  computeLeftPosition,
  computeTopPosition,
} from '../src/lib';

/* eslint-disable no-unused-expressions */

describe('#computeCenteredPosition', () => {
  context('when inverse is false', () => {
    it('returns NaN with all 0 input', () => {
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

  context('when inverse is true', () => {
    it('returns NaN with all 0 input', () => {
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

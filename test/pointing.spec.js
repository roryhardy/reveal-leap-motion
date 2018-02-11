import { expect } from 'chai';
import sinon from 'sinon';
import config from '../src/config';
import pointing from '../src/pointing';

import * as lib from '../src/lib';

/* eslint-disable func-names, prefer-arrow-callback */

describe('#pointing', function () {
  before(function () {
    this.pointer = document.getElementById('reveal-leap-motion');
  });

  beforeEach(function () {
    this.fingers = [
      {}, // thumb
      { // index finger
        extended: true,
        tipPosition: [-7.38419, 318.653, 55.0272],
      },
      {}, // middle finger
    ];
  });

  it('injects the pointer into the DOM', function () {
    expect(this.pointer.id).to.equal('reveal-leap-motion');
  });

  it('sets static styles on the pointer', function () {
    expect(this.pointer.style.position).to.equal('absolute');
    expect(this.pointer.style.visibility).to.equal('hidden');
    expect(this.pointer.style.zIndex).to.equal('50');
  });

  it('styles the pointer based on the configuration', function () {
    // JSDom converts color hex to rgb
    expect(this.pointer.style.backgroundColor).to.equal('rgb(85, 204, 0)');
    expect(this.pointer.style.opacity).to.equal(`${config.pointerOpacity}`);
  });

  context('when the user only has their index finger extended', function () {
    it('sets the pointer position', function () {
      pointing(this.fingers);

      // The document doesn't have a width or height so these values will be 0px
      expect(this.pointer.style.left).to.equal('0px');
      expect(this.pointer.style.top).to.equal('0px');
    });

    context('when the size is smaller than the config size', function () {
      it('updates the size of the pointer to the config size', function () {
        pointing(this.fingers);

        expect(this.pointer.style.borderRadius).to.equal(`${config.pointerSize - 5}px`);
        expect(this.pointer.style.height).to.equal(`${config.pointerSize}px`);
        expect(this.pointer.style.width).to.equal(`${config.pointerSize}px`);
      });
    });

    context('when the size is larger than the config size', function () {
      before(function () {
        this.fingers[1].tipPosition[2] *= -1;
        this.size = -3 * this.fingers[1].tipPosition[2];

        pointing(this.fingers);
      });

      it('updates the size of the pointer relative to the tipPosition', function () {
        expect(this.pointer.style.borderRadius).to.equal(`${this.size - 5}px`);
        expect(this.pointer.style.height).to.equal(`${this.size}px`);
        expect(this.pointer.style.width).to.equal(`${this.size}px`);
      });
    });

    context('when autoCenter is true', function () {
      it('calls #computeCenteredPosition for top & left', function () {
        const center = sinon.spy(lib, 'computeCenteredPosition');
        pointing(this.fingers);

        expect(center.callCount).to.equal(2);
      });
    });

    context('when autoCenter is false', function () {
      before(function () {
        this.left = sinon.spy(lib, 'computeLeftPosition');
        this.top = sinon.spy(lib, 'computeTopPosition');
        config.autoCenter = false;
        pointing(this.fingers);
      });

      after(function () {
        config.autoCenter = true;
      });

      it('calls #computeLeftPosition to get the left position', function () {
        expect(this.left.callCount).to.equal(1);
      });

      it('calls #computeTopPosition to get the top position', function () {
        expect(this.top.callCount).to.equal(1);
      });
    });
  });

  context('when the user has no fingers extended', function () {
    it('does nothing', function () {
      pointing([]);

      expect(this.pointer.style.visibility).to.equal('hidden');
    });
  });

  context('when the has their middle finger extended', function () {
    it('does nothing', function () {
      this.fingers[2].extended = true;
      pointing(this.fingers);

      expect(this.pointer.style.visibility).to.equal('hidden');
    });
  });
});

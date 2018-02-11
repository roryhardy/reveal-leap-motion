import { expect } from 'chai';
import sinon from 'sinon';
import config from '../src/config';
import gesturing from '../src/gesturing';

/* eslint-disable no-unused-expressions, func-names, prefer-arrow-callback */

function noGestures() {
  expect(this.down.notCalled).to.be.true;
  expect(this.left.notCalled).to.be.true;
  expect(this.right.notCalled).to.be.true;
  expect(this.up.notCalled).to.be.true;
}

function sharedExample(d1, d2, d3, d4, idx = 0) {
  it(`swipes ${d1}`, function () {
    gesturing(this.frame);

    expect(this[d1].called).to.be.true;
  });

  it(`swipes ${d2}`, function () {
    this.frame.gestures[0].direction[idx] *= -1;
    gesturing(this.frame);

    expect(this[d2].called).to.be.true;
  });

  it(`does not swipe ${d3} or ${d4}`, function () {
    gesturing(this.frame);

    expect(this[d3].notCalled).to.be.true;
    expect(this[d4].notCalled).to.be.true;
  });
}

function swapSwipeDirection() {
  before(function () {
    config.naturalSwipe = false;
  });

  after(function () {
    config.naturalSwipe = true;
  });
}

describe('#gesturing', function () {
  beforeEach(function () {
    this.frame = {
      fingers: [
        {},
        {},
        { extended: true },
      ],
      gestures: [
        {
          direction: [0.99, 0.09, -0.037],
          type: 'swipe',
        },
      ],
      hands: [{}],
    };
  });

  context('when there are no gestures', function () {
    beforeEach(function () {
      this.down = sinon.stub(Reveal, 'down');
      this.left = sinon.stub(Reveal, 'left');
      this.right = sinon.stub(Reveal, 'right');
      this.toggle = sinon.stub(Reveal, 'toggleOverview');
      this.up = sinon.stub(Reveal, 'up');
    });

    afterEach(function () {
      Reveal.down.restore();
      Reveal.left.restore();
      Reveal.right.restore();
      Reveal.toggleOverview.restore();
      Reveal.up.restore();
    });

    it('does nothing', function () {
      this.frame.gestures = [];
      gesturing(this.frame);

      noGestures.call(this);

      expect(this.toggle.notCalled).to.be.true;
    });
  });

  describe('one handed gestures', function () {
    beforeEach(function () {
      this.down = sinon.stub(Reveal, 'down');
      this.left = sinon.stub(Reveal, 'left');
      this.right = sinon.stub(Reveal, 'right');
      this.up = sinon.stub(Reveal, 'up');
    });

    afterEach(function () {
      Reveal.down.restore();
      Reveal.left.restore();
      Reveal.right.restore();
      Reveal.up.restore();
    });

    context('when the middle finger is not extended', function () {
      it('does nothing', function () {
        this.frame.fingers[2].extended = false;
        gesturing(this.frame);

        noGestures.call(this);
      });
    });

    context('when the middle finger is extended', function () {
      context('and the gesture is a swipe', function () {
        context('and the gesture is along the x-axis', function () {
          context('and naturalSwipe is true', function () {
            sharedExample.call(this, 'left', 'right', 'down', 'up');
          });

          context('and naturalSwipe is false', function () {
            swapSwipeDirection();

            sharedExample.call(this, 'right', 'left', 'down', 'up');
          });
        });

        context('and the gesture is along the y-axis', function () {
          beforeEach(function () {
            this.frame.gestures[0].direction = [0.09, 0.99, -0.037];
          });

          context('and naturalSwipe is true', function () {
            sharedExample.call(this, 'down', 'up', 'left', 'right', 1);
          });

          context('and naturalSwipe is false', function () {
            swapSwipeDirection();

            sharedExample.call(this, 'up', 'down', 'left', 'right', 1);
          });
        });
      });

      context('and the gesture is not a swipe', function () {
        it('does nothing', function () {
          this.frame.gestures[0].type = 'not a swipe';
          gesturing(this.frame);

          noGestures.call(this);
        });
      });
    });
  });

  describe('two handed gestures', function () {
    beforeEach(function () {
      this.toggle = sinon.stub(Reveal, 'toggleOverview');
      this.frame.hands.push({});
    });

    afterEach(function () {
      Reveal.toggleOverview.restore();
    });

    context('when the gesture is a swipe', function () {
      context('and the gesture direction is positive', function () {
        it('toggles the overview', function () {
          gesturing(this.frame);

          expect(this.toggle.calledOnce).to.be.true;
        });
      });

      context('and the gesture direction is negative', function () {
        it('does nothing', function () {
          this.frame.gestures[0].direction[1] *= -1;
          gesturing(this.frame);

          expect(this.toggle.notCalled).to.be.true;
        });
      });
    });

    context('when the gesture is not a swipe', function () {
      it('does nothing', function () {
        this.frame.gestures[0].type = 'not a swipe';
        gesturing(this.frame);

        expect(this.toggle.notCalled).to.be.true;
      });
    });
  });
});

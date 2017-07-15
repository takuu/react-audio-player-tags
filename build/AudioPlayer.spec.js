'use strict';

var _chai = require('chai');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

require('./lib/mountTestHelper');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('AudioPlayer', function () {
  it('should setup properly', function () {
    (0, _chai.expect)(true).equal(true);
  });

  it('should auto play', function () {});

  // Play/Pause functionality
  it('should pause when the button paused is pressed', function () {});
  it('should display the pause button when playing', function () {});
  it('should display the play button when paused', function () {});

  // Seek forward and backward functionality
  it('should seek forward 15 seconds when skip forward is pressed', function () {});
  it('should seek to end if less than 15 seconds is left and seek forward 15 seconds is pressed', function () {});
  it('should seek back 15 seconds when skip back is pressed', function () {});
  it('should seek to the beginning if current progress is than 15 seconds', function () {});

  // Should display proper information
  it('should display sound title', function () {});

  it('should display sound duration', function () {});

  it('should display sound progress', function () {});

  // Tags
  it('should show tags', function () {});

  it('should trigger a callback when progress hits a tag', function () {});

  // Play bar
  it('should seek to position where play bar is clicked', function () {});
});
// Need this just to use mount for enzyme
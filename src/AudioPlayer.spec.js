import { expect } from 'chai'
import React from 'react'
import { shallow, mount } from 'enzyme'
// Need this just to use mount for enzyme
import './lib/mountTestHelper'
import sinon from 'sinon'
import AudioPlayer from './index'


describe('AudioPlayer', () => {
  it('should setup properly', () => {
    expect(true).equal(true)
  });

  it('should auto play', () => {

  });

  // Play/Pause functionality
  it('should pause when the button paused is pressed', () => {

  });
  it('should display the pause button when playing', () => {

  });
  it('should display the play button when paused', () => {

  });

  // Seek forward and backward functionality
  it('should seek forward 15 seconds when skip forward is pressed', () => {

  });
  it('should seek to end if less than 15 seconds is left and seek forward 15 seconds is pressed', () => {

  });
  it('should seek back 15 seconds when skip back is pressed', () => {

  });
  it('should seek to the beginning if current progress is than 15 seconds', () => {

  });

  // Should display proper information
  it('should display sound title', () => {

  });

  it('should display sound duration', () => {

  });

  it('should display sound progress', () => {

  });

  // Tags
  it('should show tags', () => {

  });

  it('should trigger a callback when progress hits a tag', () => {

  });

  // Play bar
  it('should seek to position where play bar is clicked', () => {

  });

});
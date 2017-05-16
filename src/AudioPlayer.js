import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet } from 'react-primitives';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import Play from './assets/ios-play.svg';
import Pause from './assets/ios-pause.svg';

import {Howler} from 'howler';
const style = { width: 400, margin: 50 };

function log(e) {
  console.log(e);
}

let playerInfo = {};
var sound = new Howl({
  src: ['http://hwcdn.libsyn.com/p/9/5/0/950f894211e17b78/Part_1_-_Schooled_by_Silicon_Valley.mp3?c_id=12078641&expiration=1494730851&hwt=4da344cb8477fe2203f931507cde8ded']
});

playerInfo.duration = sound.duration();
debugger;
/*
PlayerStatus:
stop: 0,
play: 1,
pause: 2,

 */




class AudioPlayer extends Component {
  constructor() {
    super();
    console.log('Howler: ', Howler);
    this.state = {playerStatus: 0};
    this.onToggle = this.onToggle.bind(this);
    this.play = this.play.bind(this);
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.resume = this.resume.bind(this);
    this.goBack = this.goBack.bind(this);
    this.goForward = this.goForward.bind(this);
    this.seekToTime = this.seekToTime.bind(this);
    this.stop = this.stop.bind(this);
    this.test = this.test.bind(this);
  }

  onToggle(e) {
    console.log('test');
    debugger;
  }

  componentWillMount() {
    const { mediaUrl } = this.props;

    console.log('componentWillMount');
    this.start(this.props);
    debugger;
  }

  componentWillReceiveProps(nextProps) {

    this.start(nextProps);
    console.log('componentWillReceiveProps');
    debugger;
  }

  start(props) {
    const { mediaUrl } = props;
    console.log('start');
    debugger;
    if(playerInfo.mediaUrl != mediaUrl) {
      playerInfo.mediaUrl = mediaUrl;
      sound = new Howl({
        src: [mediaUrl]
      });
      this.play();
    }

  }

  play() {
    const {mediaUrl} = this.props.player;
    console.log('play');
    debugger;
    sound.play();
    playerInfo.intervalId = setInterval(() => {

      playerInfo.position = sound.seek();
      debugger;
    }, 1000);
  }

  pause() {
    const {mediaUrl} = this.props.player;
    sound.pause();
    // this.props.actions.playerPause(mediaUrl);
  }

  resume() {
    const {mediaUrl, title, episodeTitle, duration, imageUrl, episodeKey, progress} = this.props.player;
    // this.props.actions.playerResume(mediaUrl, title, episodeTitle, duration, imageUrl, episodeKey, progress);
  }
  goBack() {
    const {mediaUrl, title, episodeTitle} = this.props.player;
    this.props.actions.playerGoBack(mediaUrl);
  }
  goForward() {
    const {mediaUrl, title, episodeTitle} = this.props.player;
    this.props.actions.playerGoForward(mediaUrl);

  }

  seekToTime(percent) {
    const {mediaUrl, title, episodeTitle, duration} = this.props.player;
    //seekToTime
    const sec = (percent/100) * duration;
    if(duration) this.props.actions.playerSeekTo(mediaUrl, sec);
    // if(this.props.duration) ReactNativeAudioStreaming.seekToTime(sec)
  }

  stop() {
    ReactNativeAudioStreaming.stop();
  }

  test() {

  }
  render() {
    return (
      <div>
        <View style={styles.foo}>
          <div>
            {/*<button class="button icon ion-play"  style={{backgroundColor: '#0371d8', color:'#fff', border:'none'}} ></button>*/}
            <Play width={20} height={20} onClick={this.play} />
          </div>
          media stuff
          <div style={style}>
            <Slider
              defaultValue={30}
              step={1}
              min={1}
              max={1000}
              onAfterChange={log}
              maximumTrackStyle={{ backgroundColor: 'red', height: 10 }}
              minimumTrackStyle={{ backgroundColor: 'blue', height: 10 }}
              handleStyle={{
                borderColor: 'blue',
                height: 28,
                width: 28,
                marginLeft: -14,
                marginTop: -9,
                backgroundColor: 'blue',
              }}
            />
          </div>

        </View>
      </div>
    );
  }
}

AudioPlayer.propTypes = {
  player: PropTypes.object,
  mediaUrl: PropTypes.string,
  // onProgress: PropTypes.func,
  // onAction: PropTypes.func,
  // onComplete: PropTypes.func,
};
AudioPlayer.defaultProps = {
  player: {},
  mediaUrl: "",
  // onProgress: {},
  // onAction: {},
  // onComplete: {},
};
const styles = StyleSheet.create({
  foo: {
    width: '50%',
    height: 100,
    backgroundColor: '#ff00ff',
  },
});



export default AudioPlayer;


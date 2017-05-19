import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet } from 'react-primitives';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import Play from './assets/ios-play.svg';
import Pause from './assets/ios-pause.svg';

import {Howler} from 'howler';
const style = { width: '90%', margin: 50 };

function log(e) {
  console.log(e);
}

let playerInfo = {};
var sound = {};

/*
PlayerStatus:
unloaded: 0,
loading: 1,
loaded: 2,
playing: 3,
paused: 4,
stopped: 5,

 */




class AudioPlayer extends Component {
  constructor() {
    super();
    console.log('Howler: ', Howler);
    this.state = {
      playerStatus: 0,
      duration: 0,
      url: "",
      position: 0,
      intervalId: 0,
    };
    this.onToggle = this.onToggle.bind(this);
    this.play = this.play.bind(this);
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.resume = this.resume.bind(this);
    this.goBack = this.goBack.bind(this);
    this.goForward = this.goForward.bind(this);
    this.seekToTime = this.seekToTime.bind(this);
    this.stop = this.stop.bind(this);
    this.seek = this.seek.bind(this);
    this.moveSeek = this.moveSeek.bind(this);
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
  }

  componentWillReceiveProps(nextProps) {

    this.start(nextProps);
    console.log('componentWillReceiveProps');
  }

  start(props) {
    const { mediaUrl } = props;
    console.log('start');
    if(playerInfo.mediaUrl != mediaUrl) {
      playerInfo.mediaUrl = mediaUrl;
      this.state.url = mediaUrl;
      sound = new Howl({
        src: [mediaUrl],
        volume: 0.1,
        onend: function() {
          console.log('finished!');
        }
      });
      this.play();
    }

  }

  play() {
    const {mediaUrl} = this.props.player;
    console.log('play');
    sound.play();
    playerInfo.intervalId = this.state.intervalId = setInterval(() => {

      playerInfo.position = sound.seek();
      this.state.position = sound.seek();

      let status = sound.state();
      let position = 0;
      let duration = 0;
      switch(status) {
        case 'loading':
          this.setState({
            playerStatus: 1,
            duration: 0,
            position: 0,
          });
          break;
        case 'loaded':
          this.setState({
            playerStatus: 3,
            duration: sound.duration(),
            position: sound.seek()
          });
          break;
        default:
          break;
      }

      this.props.onProgress(sound.seek());

      console.log('status: ', status);
    }, 1000);
  }

  pause() {
    const {mediaUrl} = this.props.player;
    clearInterval(this.state.intervalId);
    sound.pause();
    this.setState({
      playerStatus: 2,
    });
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
  moveSeek(value) {
    console.log(value);
    this.setState({
      position: value,
    })
  }

  seek(value) {
    sound.seek(value);
    this.moveSeek(value);
  }

  test() {

  }
  render() {
    const {tags} = this.props.tags;

    const tagBar = (
        (this.props.tags || []).map((sec) => {
        const percent = (sec/this.state.duration) * 100;
        return (
        <div style={{position: 'relative', left: `${percent}%`, top: 0, width: '5px', height: '20px', backgroundColor: '#ff00ff'}}></div>
        )
      })

    );
    console.log('tags: ', this.props.tags);
    console.log(this.state.duration, this.state.position);
    return (
      <div>
        <View style={styles.foo}>
          <div>
            {((playerStatus, play, pause) => {
              if (playerStatus == 3) {
                return (
                  <Pause width={20} height={20} onClick={pause} />
                );
              } else {
                return (
                  <Play width={20} height={20} onClick={play} />
                )
              }
            })(this.state.playerStatus, this.play, this.pause)}

          </div>
          media stuff
          <div>{this.state.position}</div>
          <div>{this.state.duration}</div>

          <div style={style}>
            <Slider
              defaultValue={1}
              step={1}
              min={1}
              value={parseInt(this.state.position)}
              max={parseInt(this.state.duration) || 100}
              onChange={this.moveSeek}
              onAfterChange={this.seek}
              maximumTrackStyle={{ backgroundColor: 'red', height: 10 }}
              minimumTrackStyle={{ backgroundColor: 'blue', height: 10, borderRadius: 0,paddingRight: -50, }}
              handleStyle={{
                borderColor: 'blue',
                borderWidth: 0,
                height: 28,
                width: 5,
                marginLeft: -2,
                marginTop: -9,
                backgroundColor: 'blue',
                borderRadius: 0,
              }}
            />
            <div style={{width: '100%', height: '5px', backgroundColor: 'green'}}>
              {tagBar}
            </div>
          </div>

        </View>
      </div>
    );
  }
}

AudioPlayer.propTypes = {
  player: PropTypes.object,
  mediaUrl: PropTypes.string,
  onProgress: PropTypes.func,
  // tags: PropTypes.arrayOf(PropTypes.number),
  // onAction: PropTypes.func,
  // onComplete: PropTypes.func,
};
AudioPlayer.defaultProps = {
  player: {},
  mediaUrl: "",
  onProgress: {},
  tags: [],
  // onAction: {},
  // onComplete: {},
};
const styles = StyleSheet.create({
  foo: {
    width: '100%',
    height: 200,
    backgroundColor: '#eeeeee',
  },
  sliderContainer: {
    width: '100%',
    margin: 50
  }
});



export default AudioPlayer;


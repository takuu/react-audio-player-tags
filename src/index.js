import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import Play from './assets/ios-play.svg';
import Pause from './assets/ios-pause.svg';

import {Howler} from 'howler';

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


export function secondsToHMS(seconds=0) {
  var start = 11;
  var length = 8;
  if(seconds < 3600) {
    start = 14;
    length = 5;
  }
  return new Date(seconds * 1000).toISOString().substr(start, length);
}

class AudioPlayer extends Component {
  constructor() {
    super();
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
  }

  componentWillMount() {
    const { mediaUrl, styleConfig: {progressColor, seekColor, playerColor, controlColor} } = this.props;
    this.start(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.start(nextProps);
  }

  start(props) {
    const { mediaUrl } = props;
    if(playerInfo.mediaUrl != mediaUrl) {
      playerInfo.mediaUrl = mediaUrl;
      this.state.url = mediaUrl;
      sound = new Howl({
        src: [mediaUrl],
        volume: 0.1,
        onend: function() {

        }
      });
      this.play();
    }

  }

  play() {
    const {mediaUrl} = this.props.player;

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
    const {position} = this.state;
    this.seek(position - 15);
  }
  goForward() {
    const {position} = this.state;
    this.seek(position + 15);
  }

  seekToTime(percent) {
    const {mediaUrl, title, episodeTitle, duration} = this.props.player;
    //seekToTime
    const sec = (percent/100) * duration;
    if(duration) this.props.actions.playerSeekTo(mediaUrl, sec);
  }

  stop() {
  }
  moveSeek(value) {
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
    const { styleConfig: {progressColor, seekColor, playerColor, controlColor} } = this.props;

    const tagBar = (
        (this.props.tags || []).map((sec) => {
        const percent = (sec/this.state.duration) * 100;
        return (
          <span style={{display: 'inline-block', position: 'absolute', left: `${percent}%`, top: 0, width: '3px', height: '20px', backgroundColor: playerColor}}></span>
        )
      })

    );

    return (
      <div>
        <div style={{ width: '100%', height: 200, backgroundColor: playerColor }}>

          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px', padding: '5px'}}>
            <span style={{'color': '#fff', fontSize: '1.8em'}}>{this.props.title}</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '12px', padding: '5px'}}>
            <span style={{'color': '#fff', fontSize: '1em'}}>{this.props.subTitle}</span>
          </div>

          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px', padding: '5px'}}>

            <img src={require("./assets/icon_skip_back.png")} onClick={this.goBack} style={{width: '50px', padding: '1%'}}  />
            {((playerStatus, play, pause) => {
              if (playerStatus == 3) {
                return (
                  <Pause width={50} height={50} onClick={pause} style={{color: 'white', padding: '1%'}} fill="#fff" />
                );
              } else {
                return (
                  <Play width={50} height={50} onClick={play} style={{color: 'white', padding: '1%'}} fill="#fff" />
                )
              }
            })(this.state.playerStatus, this.play, this.pause)}
            <img src={require("./assets/icon_skip_forward.png")} onClick={this.goForward} style={{width: '50px', padding: '1%'}} />

          </div>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '12px 12px 0px 12px', padding: '5px 2%'}}>
            <span style={{color: 'white'}}>{secondsToHMS(parseInt(this.state.position))}</span>
            <span style={{color: 'white'}}>{secondsToHMS(parseInt(this.state.duration))}</span>
          </div>


          <div style={{ width: '96%', margin: '5px 2%', padding: '8px' }}>
            <Slider
              defaultValue={1}
              step={1}
              min={1}
              value={parseInt(this.state.position)}
              max={parseInt(this.state.duration) || 100}
              onChange={this.moveSeek}
              onAfterChange={this.seek}
              maximumTrackStyle={{ backgroundColor: controlColor, height: 10 }}
              minimumTrackStyle={{ backgroundColor: progressColor || 'blue', height: 10, borderRadius: 0,paddingRight: -50, }}
              handleStyle={{
                borderColor: progressColor,
                borderWidth: 0,
                height: 28,
                width: 5,
                marginLeft: -2,
                marginTop: -9,
                backgroundColor: progressColor,
                borderRadius: 0,
              }}
            />
            <div style={{width: '100%', height: '0px', top: '-13px', position: 'relative'}}>
              {tagBar}
            </div>
          </div>

        </div>
      </div>
    );
  }
}

AudioPlayer.propTypes = {
  player: PropTypes.object,
  mediaUrl: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  onProgress: PropTypes.func,
  styleConfig: PropTypes.objectOf(PropTypes.string),
  // tags: PropTypes.arrayOf(PropTypes.number),
  // onAction: PropTypes.func,
  // onComplete: PropTypes.func,
};
AudioPlayer.defaultProps = {
  player: {},
  mediaUrl: "",
  title: "",
  subTitle: "",
  onProgress: {},
  styleConfig: {progressColor: 'white', controlColor: '#56a0e5', seekColor: '#56a0e5', playerColor: '#0371d8' },
  tags: [],
  // onAction: {},
  // onComplete: {},
};


export default AudioPlayer;


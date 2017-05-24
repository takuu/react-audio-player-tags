'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.secondsToHMS = secondsToHMS;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactPrimitives = require('react-primitives');

var _rcSlider = require('rc-slider');

var _rcSlider2 = _interopRequireDefault(_rcSlider);

require('rc-slider/assets/index.css');

var _iosPlay = require('./assets/ios-play.svg');

var _iosPlay2 = _interopRequireDefault(_iosPlay);

var _iosPause = require('./assets/ios-pause.svg');

var _iosPause2 = _interopRequireDefault(_iosPause);

var _howler = require('howler');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var playerInfo = {};
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

function secondsToHMS() {
  var seconds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  var start = 11;
  var length = 8;
  if (seconds < 3600) {
    start = 14;
    length = 5;
  }
  return new Date(seconds * 1000).toISOString().substr(start, length);
}

var AudioPlayer = function (_Component) {
  _inherits(AudioPlayer, _Component);

  function AudioPlayer() {
    _classCallCheck(this, AudioPlayer);

    var _this = _possibleConstructorReturn(this, (AudioPlayer.__proto__ || Object.getPrototypeOf(AudioPlayer)).call(this));

    console.log('Howler: ', _howler.Howler);
    _this.state = {
      playerStatus: 0,
      duration: 0,
      url: "",
      position: 0,
      intervalId: 0
    };
    _this.onToggle = _this.onToggle.bind(_this);
    _this.play = _this.play.bind(_this);
    _this.start = _this.start.bind(_this);
    _this.pause = _this.pause.bind(_this);
    _this.resume = _this.resume.bind(_this);
    _this.goBack = _this.goBack.bind(_this);
    _this.goForward = _this.goForward.bind(_this);
    _this.seekToTime = _this.seekToTime.bind(_this);
    _this.stop = _this.stop.bind(_this);
    _this.seek = _this.seek.bind(_this);
    _this.moveSeek = _this.moveSeek.bind(_this);
    _this.test = _this.test.bind(_this);
    return _this;
  }

  _createClass(AudioPlayer, [{
    key: 'onToggle',
    value: function onToggle(e) {
      console.log('test');
      debugger;
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          mediaUrl = _props.mediaUrl,
          _props$styleConfig = _props.styleConfig,
          progressColor = _props$styleConfig.progressColor,
          seekColor = _props$styleConfig.seekColor,
          playerColor = _props$styleConfig.playerColor,
          controlColor = _props$styleConfig.controlColor;


      console.log('componentWillMount');
      this.start(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {

      this.start(nextProps);
      console.log('componentWillReceiveProps');
    }
  }, {
    key: 'start',
    value: function start(props) {
      var mediaUrl = props.mediaUrl;

      console.log('start');
      if (playerInfo.mediaUrl != mediaUrl) {
        playerInfo.mediaUrl = mediaUrl;
        this.state.url = mediaUrl;
        sound = new Howl({
          src: [mediaUrl],
          volume: 0.1,
          onend: function onend() {
            console.log('finished!');
          }
        });
        this.play();
      }
    }
  }, {
    key: 'play',
    value: function play() {
      var _this2 = this;

      var mediaUrl = this.props.player.mediaUrl;

      console.log('play');
      sound.play();
      playerInfo.intervalId = this.state.intervalId = setInterval(function () {

        playerInfo.position = sound.seek();
        _this2.state.position = sound.seek();

        var status = sound.state();
        var position = 0;
        var duration = 0;
        switch (status) {
          case 'loading':
            _this2.setState({
              playerStatus: 1,
              duration: 0,
              position: 0
            });
            break;
          case 'loaded':
            _this2.setState({
              playerStatus: 3,
              duration: sound.duration(),
              position: sound.seek()
            });
            break;
          default:
            break;
        }

        _this2.props.onProgress(sound.seek());

        console.log('status: ', status);
      }, 1000);
    }
  }, {
    key: 'pause',
    value: function pause() {
      var mediaUrl = this.props.player.mediaUrl;

      clearInterval(this.state.intervalId);
      sound.pause();
      this.setState({
        playerStatus: 2
      });
      // this.props.actions.playerPause(mediaUrl);
    }
  }, {
    key: 'resume',
    value: function resume() {
      var _props$player = this.props.player,
          mediaUrl = _props$player.mediaUrl,
          title = _props$player.title,
          episodeTitle = _props$player.episodeTitle,
          duration = _props$player.duration,
          imageUrl = _props$player.imageUrl,
          episodeKey = _props$player.episodeKey,
          progress = _props$player.progress;
      // this.props.actions.playerResume(mediaUrl, title, episodeTitle, duration, imageUrl, episodeKey, progress);
    }
  }, {
    key: 'goBack',
    value: function goBack() {
      var position = this.state.position;

      this.seek(position - 15);
    }
  }, {
    key: 'goForward',
    value: function goForward() {
      var position = this.state.position;

      this.seek(position + 15);
    }
  }, {
    key: 'seekToTime',
    value: function seekToTime(percent) {
      var _props$player2 = this.props.player,
          mediaUrl = _props$player2.mediaUrl,
          title = _props$player2.title,
          episodeTitle = _props$player2.episodeTitle,
          duration = _props$player2.duration;
      //seekToTime

      var sec = percent / 100 * duration;
      if (duration) this.props.actions.playerSeekTo(mediaUrl, sec);
      // if(this.props.duration) ReactNativeAudioStreaming.seekToTime(sec)
    }
  }, {
    key: 'stop',
    value: function stop() {
      ReactNativeAudioStreaming.stop();
    }
  }, {
    key: 'moveSeek',
    value: function moveSeek(value) {
      console.log(value);
      this.setState({
        position: value
      });
    }
  }, {
    key: 'seek',
    value: function seek(value) {
      sound.seek(value);
      this.moveSeek(value);
    }
  }, {
    key: 'test',
    value: function test() {}
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var tags = this.props.tags.tags;
      var _props$styleConfig2 = this.props.styleConfig,
          progressColor = _props$styleConfig2.progressColor,
          seekColor = _props$styleConfig2.seekColor,
          playerColor = _props$styleConfig2.playerColor,
          controlColor = _props$styleConfig2.controlColor;


      var tagBar = (this.props.tags || []).map(function (sec) {
        var percent = sec / _this3.state.duration * 100;
        return _react2.default.createElement('span', { style: { display: 'inline-block', position: 'absolute', left: percent + '%', top: 0, width: '3px', height: '20px', backgroundColor: playerColor } });
      });
      console.log('tags: ', this.props.tags);
      console.log(this.state.duration, this.state.position);
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _reactPrimitives.View,
          { style: { width: '100%', height: 200, backgroundColor: playerColor } },
          _react2.default.createElement(
            'div',
            { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px', padding: '5px' } },
            _react2.default.createElement(
              'span',
              { style: { 'color': '#fff', fontSize: '1.8em' } },
              this.props.title
            )
          ),
          _react2.default.createElement(
            'div',
            { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '12px', padding: '5px' } },
            _react2.default.createElement(
              'span',
              { style: { 'color': '#fff', fontSize: '1em' } },
              this.props.subTitle
            )
          ),
          _react2.default.createElement(
            'div',
            { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px', padding: '5px' } },
            _react2.default.createElement('img', { src: require("./assets/icon_skip_back.png"), onClick: this.goBack, style: { width: '50px', padding: '1%' } }),
            function (playerStatus, play, pause) {
              if (playerStatus == 3) {
                return _react2.default.createElement(_iosPause2.default, { width: 50, height: 50, onClick: pause, style: { color: 'white', padding: '1%' }, fill: '#fff' });
              } else {
                return _react2.default.createElement(_iosPlay2.default, { width: 50, height: 50, onClick: play, style: { color: 'white', padding: '1%' }, fill: '#fff' });
              }
            }(this.state.playerStatus, this.play, this.pause),
            _react2.default.createElement('img', { src: require("./assets/icon_skip_forward.png"), onClick: this.goForward, style: { width: '50px', padding: '1%' } })
          ),
          _react2.default.createElement(
            'div',
            { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '12px 12px 0px 12px', padding: '5px 2%' } },
            _react2.default.createElement(
              'span',
              { style: { color: 'white' } },
              secondsToHMS(parseInt(this.state.position))
            ),
            _react2.default.createElement(
              'span',
              { style: { color: 'white' } },
              secondsToHMS(parseInt(this.state.duration))
            )
          ),
          _react2.default.createElement(
            'div',
            { style: { width: '96%', margin: '5px 2%', padding: '8px' } },
            _react2.default.createElement(_rcSlider2.default, {
              defaultValue: 1,
              step: 1,
              min: 1,
              value: parseInt(this.state.position),
              max: parseInt(this.state.duration) || 100,
              onChange: this.moveSeek,
              onAfterChange: this.seek,
              maximumTrackStyle: { backgroundColor: controlColor, height: 10 },
              minimumTrackStyle: { backgroundColor: progressColor || 'blue', height: 10, borderRadius: 0, paddingRight: -50 },
              handleStyle: {
                borderColor: progressColor,
                borderWidth: 0,
                height: 28,
                width: 5,
                marginLeft: -2,
                marginTop: -9,
                backgroundColor: progressColor,
                borderRadius: 0
              }
            }),
            _react2.default.createElement(
              'div',
              { style: { width: '100%', height: '0px', top: '-13px', position: 'relative' } },
              tagBar
            )
          )
        )
      );
    }
  }]);

  return AudioPlayer;
}(_react.Component);

AudioPlayer.propTypes = {
  player: _propTypes2.default.object,
  mediaUrl: _propTypes2.default.string,
  title: _propTypes2.default.string,
  subTitle: _propTypes2.default.string,
  onProgress: _propTypes2.default.func,
  styleConfig: _propTypes2.default.objectOf(_propTypes2.default.string)
};
AudioPlayer.defaultProps = {
  player: {},
  mediaUrl: "",
  title: "",
  subTitle: "",
  onProgress: {},
  styleConfig: { progressColor: 'white', controlColor: '#56a0e5', seekColor: '#56a0e5', playerColor: '#0371d8' },
  tags: []
};

exports.default = AudioPlayer;
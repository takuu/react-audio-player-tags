
import React from 'react';
import { render } from 'react-dom';
import AudioPlayer from './AudioPlayer'


// var sound = "http://hwcdn.libsyn.com/p/9/5/0/950f894211e17b78/Part_1_-_Schooled_by_Silicon_Valley.mp3?c_id=12078641&expiration=1494730851&hwt=4da344cb8477fe2203f931507cde8ded";
var sound = "http://www.noiseaddicts.com/samples_1w72b820/2534.mp3";

function onProgress(e) {
    console.log('progress: ', e)
}
render(
  <div>
    <AudioPlayer mediaUrl={sound} onProgress={onProgress} tags={[5,10,15,30,100, 157]} title="Nexcast" subTitle={"First Episode"} />
  </div>,
  document.getElementById('react-content')
);

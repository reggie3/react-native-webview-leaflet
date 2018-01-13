import glamorous from 'glamorous';
import React from '../react.production.min.js';

export default class Marker extends React.Component{
    MarkerContainer = glamorous.div({

    })

    render(){
        returns(
            `<div class='animationContainer' style="
      animation-name: ${animation.name ? animation.name : 'bounce'}; 
      animation-duration: ${animation.duration ? animation.duration : 1}s ;
      animation-delay: ${animation.delay ? animation.delay : 0}s;
      animation-iteration-count: ${
        animation.interationCount ? animation.interationCount : 'infinite'
      }">
      <div style='font-size: 36px'>
        )
    }
}
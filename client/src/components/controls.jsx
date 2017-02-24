import React from 'react';
import { Button, Divider } from 'semantic-ui-react';
import Sound from 'react-sound';

export default React.createClass({
  getRomanisationShow: function() {
    return this.props.romanisationShow;
  },
  getMeaningShow: function () {
    return this.props.meaningShow;
  },
  getClipPlaying: function () {
    return this.props.clipPlaying;
  },
  getClipUrl: function() {
    return this.props.clipUrl||'ba2.mp3';
  },
  render: function() {
    let divStyle =  {display: 'flex', justifyContent: 'center'};
    return <div>
      <Sound
        url={this.getClipUrl()}
        playStatus={this.getClipPlaying() ? "PLAYING" : "STOPPED"}
        onFinishedPlaying={this.props.setClipStoppedPlaying}
        />
      <Button.Group style={divStyle}>
        <Button size='massive' onClick={this.props.onClickNot}>Not</Button>
        <Button.Or size='massive' />
        <Button onClick={this.props.onClickOk}
                color='olive'
                size='massive'>OK</Button>
      </Button.Group>
      <br/>
      <Button.Group style={divStyle}>
        <Button
          onClick={this.props.onClickMeaning}
          color={this.getMeaningShow() ? 'olive' : 'grey'}>
          Meaning
        </Button>
        <Button.Or />
        <Button
          onClick={this.props.onClickRomanisation}
          color={this.getRomanisationShow() ? 'olive' : 'grey'}>
          Romanisation
        </Button>
        <Button.Or />
        <Button
          onClick={this.props.onClickPlaySound}
          color={this.getClipPlaying() ? 'olive' : 'grey'}>
          Play Sound
        </Button>
      </Button.Group>
    </div>;
  }
});

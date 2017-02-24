import React from 'react';
import { Button, Divider } from 'semantic-ui-react';

export default React.createClass({
  getRomanisationShow: function() {
    return this.props.romanisationShow;
  },
  getMeaningShow: function() {
    return this.props.meaningShow;
  },
  getClipPlaying: function() {
    return this.props.playingClip;
  },
  render: function() {
    let divStyle =  {display: 'flex', justifyContent: 'center'};
    return <div>
      <Button.Group style={divStyle}>
        <Button size='massive' onClick={this.props.onClickNot}>Not</Button>
        <Button.Or size='massive' />
        <Button onClick={this.props.onClickOk}
                color='olive'
                size='massive'>OK</Button>
      </Button.Group>
      <br/>
      <Button.Group style={divStyle}>
        <Button color={this.getMeaningShow() ? 'olive' : 'grey'}>Meaning</Button>
        <Button.Or />
        <Button color={this.getRomanisationShow() ? 'olive' : 'grey'}>Romanisation</Button>
        <Button.Or />
        <Button color={this.getClipPlaying() ? 'olive' : 'grey'}>Play Sound</Button>
      </Button.Group>
    </div>;
  }
});

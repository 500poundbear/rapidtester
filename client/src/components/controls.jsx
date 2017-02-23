import React from 'react';
import { Button, Divider } from 'semantic-ui-react';

export default React.createClass({
  render: function() {
    let divStyle =  {display: 'flex', justifyContent: 'center'};
    return <div>
      <Button.Group style={divStyle}>
        <Button size='massive'>Not</Button>
        <Button.Or size='massive' />
        <Button color='olive' size='massive'>OK</Button>
      </Button.Group>
      <br></br>
      <Button.Group style={divStyle}>
        <Button>Meaning</Button>
        <Button.Or />
        <Button>Romanisation</Button>
        <Button.Or />
        <Button>Play Sound</Button>
      </Button.Group>
    </div>;
  }
});

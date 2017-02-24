import React from 'react';
import { Grid } from 'semantic-ui-react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Screen from './screen';
import StatsPanel from './statspanel';
import Controls from './controls';

import {connect} from 'react-redux';

const Main = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return <Grid>
      <Grid.Column width={4}/>
      <Grid.Column width={8}>
        <Screen></Screen>
        <Controls></Controls>
        <StatsPanel></StatsPanel>
      </Grid.Column>
      <Grid.Column width={4}/>
    </Grid>;
  }
});

function mapStateToProps(state) {
  return {

  };
}

export default Main;

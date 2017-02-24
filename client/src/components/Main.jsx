import React from 'react';
import { Grid } from 'semantic-ui-react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {List, Map, fromJS} from 'immutable';

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
        <Screen
          description={this.props.description}
          romanisation={this.props.romanisation}
          characters={this.props.characters}
          path={this.props.path}
          romanisationShow={this.props.romanisationShow}
          meaningShow={this.props.meaningShow}
          playingClip={this.props.playingClip}
        />
        <Controls
          romanisationShow={this.props.romanisationShow}
          getMeaningShow={this.props.meaningShow}
          getClipPlaying={this.props.playingClip}
        />
        <StatsPanel></StatsPanel>
      </Grid.Column>
      <Grid.Column width={4}/>
    </Grid>;
  }
});

function mapStateToProps(state) {
  const question = state.get('question', Map());
  return {
    description: question.get('meaning', ''),
    romanisation: question.get('romanisation', ''),
    characters: question.get('unicode', ''),
    path: question.get('path', ''),
    romanisationShow: question.get('romanisationShow', ''),
    playingClip: question.get('playingClip', ''),
    meaningShow: question.get('meaningShow', '')
  };
}

export const MainContainer = connect(mapStateToProps)(Main);

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
          meaningShow={this.props.meaningShow}
          clipPlaying={this.props.playingClip}
          onClickNot={this.props.onClickNot}
          onClickOk={this.props.onClickOk}
          onClickMeaning={this.props.toggleMeaning}
          onClickRomanisation={this.props.toggleRomanisation}
          onClickPlaySound={this.props.playSound}
          setClipStoppedPlaying={this.props.setClipStoppedPlaying}
        />
        <StatsPanel
          corrects={this.props.corrects}
          attempts={this.props.attempts}
          goal={this.props.goal}
        />
      </Grid.Column>
      <Grid.Column width={4}/>
    </Grid>;
  }
});

function mapStateToProps(state) {
  const question = state.get('question', Map());
  const config = state.get('config', Map());
  return {
    description: question.get('meaning', ''),
    romanisation: question.get('romanisation', ''),
    characters: question.get('unicode', ''),
    path: question.get('path', ''),
    romanisationShow: question.get('romanisationShow', ''),
    playingClip: question.get('playingClip', ''),
    meaningShow: question.get('meaningShow', ''),
    attempts: config.get('attempts', 0),
    corrects: config.get('corrects', 0)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onClickNot: function () {
      dispatch({'type': 'INCREMENT_ATTEMPTS'});
    },
    onClickOk: function () {
      dispatch({'type': 'INCREMENT_CORRECTS'});
      dispatch({'type': 'INCREMENT_ATTEMPTS'});
    },
    toggleMeaning: function () {
      dispatch({'type': 'TOGGLE_MEANING'});
    },
    toggleRomanisation: function () {
      dispatch({'type': 'TOGGLE_ROMANISATION'});
    },
    playSound: function() {
      dispatch({'type': 'PLAY_SOUND'});
    },
    setClipStoppedPlaying: function() {
      dispatch({'type': 'STOP_SOUND'});
    }
  }
}

export const MainContainer = connect(mapStateToProps, mapDispatchToProps)(Main);

import React from 'react';
import ReactDOM from 'react-dom';
import Screen from './components/screen';
import StatsPanel from './components/statspanel';
import Controls from './components/controls';
import { Grid } from 'semantic-ui-react';

ReactDOM.render(
    <Grid>
      <Grid.Column width={4}/>
      <Grid.Column width={8}>
        <Screen></Screen>
        <Controls></Controls>
        <StatsPanel></StatsPanel>
      </Grid.Column>
      <Grid.Column width={4}/>
    </Grid>,
    document.getElementById('app')
);

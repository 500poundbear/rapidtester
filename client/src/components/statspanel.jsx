import React from 'react';
import { Progress, Button, Label,Statistic, Divider }
  from 'semantic-ui-react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  getCorrects: function() {
    return this.props.corrects || 0;
  },
  getAttempts: function() {
    return this.props.attempts || 0;
  },
  getGoal: function() {
    return this.props.goal || 0;
  },
  calculateAccuracy: function() {
    let corrects = this.getCorrects();
    let attempts = this.getAttempts();
    if (attempts === 0) return corrects;
    else return (corrects / attempts);
  },
  render: function() {
    let divStyle =  {display: 'flex', justifyContent: 'center'};
    const items = [
      { label: 'Corrects', value: this.getCorrects() },
      { label: 'Goal (Number of corrects)', value: this.getGoal() },
      { label: 'Accuracy', value: this.calculateAccuracy() + "%" },
    ];
    return <div>
      <Divider style={{marginTop:'30px'}}/>
      <Progress percent={this.calculateAccuracy()} color='olive'>
        {this.getCorrects()}/{this.getAttempts()}
      </Progress>
      <Statistic.Group size='mini' items={items} color='olive' style={divStyle} />
      </div>;
  }
});

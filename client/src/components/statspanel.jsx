import React from 'react';
import { Progress, Button, Label,Statistic, Divider }
  from 'semantic-ui-react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    let divStyle =  {display: 'flex', justifyContent: 'center'};
    const items = [
      { label: 'Corrects', value: '22' },
      { label: 'Goal (Number of corrects)', value: '50' },
      { label: 'Accuracy', value: '85%' },
    ];
    return <div>
      <Divider style={{marginTop:'30px'}}/>
      <Progress percent={60} color='olive'>
        22/30
      </Progress>
      <Statistic.Group size='mini' items={items} color='olive' style={divStyle} />
      </div>;
  }
});

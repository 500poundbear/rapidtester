import React from 'react';

export default React.createClass({
  render: function() {
    let divStyle = {
      backgroundColor: '#eeeeee',
      height: '500px',
      marginBottom: '20px'
    };
    let superBig = {
      display: 'flex',
      justifyContent: 'center',
      fontSize: '300px',
      color: '#63700B',
      marginTop: '100px'
    };
    return <div>
      <h2 style={{color: '#C1CF63', display: 'flex', justifyContent: 'center', marginTop:'10px'}}>
        If it were easy, &nbsp;<u>everyone</u> &nbsp;would do it. Never back down!
      </h2>
      <div style={divStyle}>
        <p>&nbsp;</p>
        <div style={superBig}>ဘား</div>
        <h1 style={{justifyContent: 'center', display: 'flex', marginTop: '160px'}}>Ha3</h1>
      </div>
    </div>;
  }
});

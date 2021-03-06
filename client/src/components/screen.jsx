import React from 'react';

export default React.createClass({
  getDescription: function() {
    return this.props.description || "Missing description ba ba ba";
  },
  getRomanisation: function() {
    return this.props.romanisation || 'Ba1';
  },
  getCharacters: function() {
    return this.props.characters || 'ဘ';
  },
  getRomanisationShow: function() {
    return this.props.romanisationShow || false;
  },
  getMeaningShow: function() {
    return this.props.meaningShow || false;
  },
  render: function() {
    let divStyle = {
      backgroundColor: '#eeeeee',
      height: '500px',
      marginBottom: '20px'
    };
    let superBig = {
      display: 'flex',
      justifyContent: 'center',
      fontSize: '200px',
      color: '#63700B',
      marginTop: '100px'
    };
    let paraStyle = {
      display: 'flex',
      justifyContent: 'center',
      fontSize: '25px',
      marginLeft: '20px',
      marginRight: '20px',
      color: '#444444'
    };
    let displayRomanisation = this.getRomanisationShow() ? {display:'block'} : {display:'none'};
    let displayDescription = this.getMeaningShow() ? {display: 'block'} : {display: 'none'};
    return <div>
      <h2 style={{color: '#C1CF63', display: 'flex', justifyContent: 'center', marginTop:'10px'}}>
        If it were easy, &nbsp;<u>everyone</u> &nbsp;would do it. Never back down!
      </h2>
      <div style={divStyle}>
        <p>&nbsp;</p>
        <div style={superBig}>{this.getCharacters()}</div>
        <h1 style={{justifyContent: 'center',
          display: 'flex',
          marginTop: '160px',
          color: '#222222'}}>
          <span style={displayRomanisation}>
            {this.getRomanisation()}
          </span>
        </h1>
        <p style={paraStyle}>
          <span style={displayDescription}>
            {this.getDescription()}
          </span>
        </p>
      </div>
    </div>;
  }
});

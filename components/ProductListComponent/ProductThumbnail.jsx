var React = require('react');
var ProductThumbnail = React.createClass({

  getDefaultProps: function() {
    return {
      defautImgGrid: 'col col-4 px2 py2',
      defautImgClass: 'imageList__img'
    }
  },

  getInitialState: function() {
    return {
      imgGrid: this.props.gridClass || this.props.defautImgGrid,
      imgClass: this.props.imgClass || this.props.defautImgClass,
      data: this.props.data
    }
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.data !== this.state.data) {
      this.setState({data: nextProps.data })
    }
  },

  handleClick: function() {
    this.props.handleClick(this.state.data);
  },

  render: function() {
    return (
      <div 
            onClick={this.handleClick}
            style= {{border:"1px solid",margin:"25px",height:"130px"}}             
           >
        <div >
          <img src={this.state.data.url} style = {{width:"100%",height:"100px"}}/>
          
        </div>
      </div>
    )
  }
  
});

module.exports = ProductThumbnail;
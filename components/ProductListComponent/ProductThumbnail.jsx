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
    var currency = '$'
    return (
      <div 
            onClick={this.handleClick}
            style= {{border:"1px solid",margin:"25px",height:"130px"}}             
           >
        <div style = {{width:"100%"}}>
          <img src={this.state.data.url} style = {{width:"100%",height:"100px"}}/>
          <div style = {{width:"100%",float:"right","margin":"4px",padding:"4px",textAlign:"center"}}>
            Product Name
            <div>
              <span style= {{fontWeight:'bold'}}>Price:</span>
              <span style = {{marginLeft:"8px"}}>{currency}</span> 
              <span>{this.state.data.price}</span>  
              <input type="checkbox" style = {{marginLeft:"8px"}}/>   
            </div>        
          </div>

        </div>
      </div>
    )
  }
  
});

module.exports = ProductThumbnail;
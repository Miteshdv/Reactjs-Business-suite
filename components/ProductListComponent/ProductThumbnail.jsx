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
    this.props.handleClick(Object.assign({}, this.state.data));

  },

  selectProduct:function(event) {
    this.props.productSelection(event.currentTarget.checked,this.state.data)

  },

  render: function() {
    var currency = '$'
    return (
      <div style= {{border:"1px solid",margin:"6px"}}             
           >
        <div style = {{width:"100%",textAlign:"center",marginTop:"5px"}}>
          <img src={this.state.data.src.small} style = {{maxWidth:"100%",maxHeight:"100px"}}  onClick={this.handleClick}/>
          <div style = {{width:"100%",float:"right","margin":"4px",padding:"4px",textAlign:"center"}}>
           {this.state.data.photographer}
            <div>
              <span style= {{fontWeight:'bold'}}>Price:</span>
              <span style = {{marginLeft:"8px"}}>{currency}</span> 
              <span>{this.state.data.price}</span>  
              <input type="checkbox" style = {{marginLeft:"8px"}} onChange = {this.selectProduct}/>   
            </div>        
          </div>

        </div>


      </div>
    )
  }
  
});

module.exports = ProductThumbnail;
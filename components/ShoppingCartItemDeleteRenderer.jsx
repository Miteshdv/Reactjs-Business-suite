var React = require('react');
const deleteImgSrc = require('../assets/images/delete_icon.png')
var ShoppingCartItemDeleteRenderer = React.createClass({
	
	

  
	handleClick(event)
	{	
		var params = this.props.gridParams;
		params.event = event 
		this.props.gridParams.api.dispatchEvent('deleteCartItem', params);
		
		
	},

	render: function() {
   
    	return  (					   
				  <img className = 'deleteIconRollOver'src={deleteImgSrc} alt="Delete Item" onClick={this.handleClick} style ={{display:!this.props.gridParams.data.id?'none':''}}/>						
					
				 );
  }
  
})






module.exports = ShoppingCartItemDeleteRenderer
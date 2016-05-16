
var React = require('react');
var ShoppingCartItemIncrementRenderer = React.createClass({
	
	//NOTE SINCE PROPS ARE IMMUTABLE HENCE WE HAVE KEPT currentValue in state
  componentWillMount:function()
  {
  	this.setState({originalPrice: (this.props.gridParams.data.price).toFixed(2) })
  	this.setState({currentValue: 1 })
  },

  //Also two way binding is not directly avalible in React JS hence we require to set state after change
	handleInputChange(event)
	{	

		var currentValue  = parseInt(event.currentTarget.value)
		var selectedRowNodeData = this.props.gridParams.node.data;
		var selectedRow = this.props.gridParams.node;
		this.setState({currentValue:currentValue});
		selectedRowNodeData.price = (this.state.originalPrice*currentValue).toFixed(2)
		
		this.props.gridParams.api.refreshCells([selectedRow],['price'])
		
	},

	render: function() {
   
    	return  (					   
				 <input type="number" name="quantity" min="1" value = {this.state.currentValue}  step="1" onChange={this.handleInputChange}/>						
					
				 );
  }
  
})






module.exports = ShoppingCartItemIncrementRenderer
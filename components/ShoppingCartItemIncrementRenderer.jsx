
var React = require('react');
var ShoppingCartItemIncrementRenderer = React.createClass({
	
	//NOTE SINCE PROPS ARE IMMUTABLE HENCE WE HAVE KEPT currentValue in state
  componentWillMount:function()
  {	

  	if(this.props.gridParams.data.originalPrice)
  	{
  		this.setState({originalPrice: Number(this.props.gridParams.data.originalPrice).toFixed(2) }) 
  	}
  	else if(!isNaN(this.props.gridParams.data.price))
  	{	
  		this.setState({originalPrice: Number(this.props.gridParams.data.price).toFixed(2) })  		
  	}
  	
  	if(this.props.gridParams.data.numberOfItems)
  	{
  		this.setState({currentValue: Number(this.props.gridParams.data.numberOfItems) })
  	}
  	else
  	{
  		this.setState({currentValue: 1 })
  	}
  	
  },

  //Also two way binding is not directly avalible in React JS hence we require to set state after change
	handleInputChange(event)
	{	

		var currentValue  = parseInt(event.currentTarget.value)
		var selectedRowNodeData = this.props.gridParams.node.data;
		var selectedRow = this.props.gridParams.node;
		this.setState({currentValue:currentValue});
		selectedRowNodeData.price = (this.state.originalPrice*currentValue).toFixed(2)
		selectedRowNodeData.numberOfItems = currentValue;
		selectedRowNodeData.originalPrice = this.state.originalPrice
		this.props.gridParams.api.refreshCells([selectedRow],['price']);   
		this.props.gridParams.api.dispatchEvent('ModelUpdated',{updatedRow:selectedRow})
		
	},
 

	render: function() {
   
    	return  (					   
				 <input type="number" name="quantity" min="1" value = {this.state.currentValue}  step="1" onChange={this.handleInputChange} style ={{display:!this.props.gridParams.data.id?'none':''}}/>						
					
				 );
  }
  
})






module.exports = ShoppingCartItemIncrementRenderer
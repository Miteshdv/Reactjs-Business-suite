import React from 'react';

class ShoppingCartItemIncrementRenderer extends React.Component{

handleInputChange()
{
	debugger
}

render(){
		return  (
					   
				 <input type="number" name="quantity" min="1" value = {this.props.gridParams.value?this.props.gridParams.value:1}  step="1" onChange={this.handleInputChange.bind(this)}/>
						
					
				 );
	}

}


ShoppingCartItemIncrementRenderer.propTypes = {   
  gridParams:React.PropTypes.object
}

ShoppingCartItemIncrementRenderer.defaultProps = {
  gridParams:{value:1}
}

export default ShoppingCartItemIncrementRenderer
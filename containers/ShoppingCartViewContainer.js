import { connect } from 'react-redux';
import ShoppingCartView from '../components/ShoppingCartView.jsx';
import {updateShoppingCart} from '../actions/AppActionData';
import {updateProductsView} from '../actions/AppActionData';

const mapStateToProps = (state) => {  

  return {
    gridData: state.updateShoppingCart.shoppingCart    
  }
}

const mapDispatchToProps = (dispatch) => { 
  return {
  		deleteCartItem: (product) => {            	
	      dispatch(updateShoppingCart(false,product))
        dispatch(updateProductsView(false,product))
	    }      
  	}
  }


const ShoppingCartViewContainer = connect(
  mapStateToProps ,
  mapDispatchToProps
)(ShoppingCartView)

export default ShoppingCartViewContainer
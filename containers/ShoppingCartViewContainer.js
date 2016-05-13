import { connect } from 'react-redux';
import ShoppingCartView from '../components/ShoppingCartView.jsx';



const mapStateToProps = (state) => {  

  return {
    gridData: state.updateShoppingCart.shoppingCart
  }
}


const ShoppingCartViewContainer = connect(
  mapStateToProps 
)(ShoppingCartView)

export default ShoppingCartViewContainer
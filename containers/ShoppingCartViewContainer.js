import { connect } from 'react-redux'
import { getShoppingCartData} from '../actions/ShoppingCartData'
import ShoppingCartView from '../components/ShoppingCartView.jsx';



const mapStateToProps = (state) => {
  
  //state.shoppingCartData.items = state.shoppingCartData.items.concat(state.shoppingCartData.items).concat(state.shoppingCartData.items)
  return {
    gridData: state.shoppingCartData.items
  }
}

const mapDispatchToProps = (dispatch) => { 
  return {
    loadGridData: () => {  
    	
      dispatch(getShoppingCartData())
    }
  }
}

const ShoppingCartViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingCartView)

export default ShoppingCartViewContainer
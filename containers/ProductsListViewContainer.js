import { connect } from 'react-redux'
import { getProductsViewData} from '../actions/ProductsViewData';
import { updateShoppingCart} from '../actions/AppActionData'
import ProductsListView from '../components/ProductListComponent/ProductsListView.jsx';


const mapStateToProps = (state) => {  

  return {
    productsData: state.productsViewData.productsData.photos,
    commoditySelectedItems:state.productCommodityData.selectedProductCategory,
    shoppingCartItems:state.updateShoppingCart.shoppingCart     
  }
}


const mapDispatchToProps = (dispatch) => { 
  return {
    loadProductsView: (query) => {      
      dispatch(getProductsViewData(query))
    },

    updateShoppingCart:(productSelected,product) =>
    { 
     dispatch(updateShoppingCart(productSelected,product))
    }
  }
}

const ProductsListViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsListView)

export default ProductsListViewContainer
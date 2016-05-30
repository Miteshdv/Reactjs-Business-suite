import { connect } from 'react-redux'
import { getProductsViewData} from '../actions/ProductsViewData';
import { updateShoppingCart} from '../actions/AppActionData'
import ProductsListView from '../components/ProductListComponent/ProductsListView.jsx';


const mapStateToProps = (state) => {  

  return {
    productsData: state.productsViewData.productsData.photos,
    commoditySelectedItems:state.productCommodityData.selectedProductCategory,
    shoppingCartItems:state.updateShoppingCart.shoppingCart ,
    totalPages: state.productsViewData.totalPages   
  }
}


const mapDispatchToProps = (dispatch) => { 
  return {
    loadProductsView: (query,pageNum) => {      
      dispatch(getProductsViewData(query,pageNum))
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
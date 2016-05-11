import { connect } from 'react-redux'
import { getProductsViewData} from '../actions/ProductsViewData'
import ProductsListView from '../components/ProductListComponent/ProductsListView.jsx';



const mapStateToProps = (state) => {   
  
  
  return {
    productsData: state.productsViewData.productsData.photos,
    commoditySelectedItems:state.productCommodityData.selectedProductCategory

  }
}

const mapDispatchToProps = (dispatch) => { 
  return {
    loadProductsView: (query) => {      
      dispatch(getProductsViewData(query))
    }
  }
}

const ProductsListViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsListView)

export default ProductsListViewContainer
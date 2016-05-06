import { connect } from 'react-redux'
import { getProductsCommodityData} from '../actions/ProductsCommodityData'
import ProductCommodityTreeView from '../components/ProductCommodityTreeView.jsx';



const mapStateToProps = (state) => {   

  return {
    treeData: state.productCommodityData.commodityData
  }
}

const mapDispatchToProps = (dispatch) => { 
  return {
    loadTreeData: () => {  
    	
      dispatch(getProductsCommodityData())
    }
  }
}

const ProductCommodityTreeViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductCommodityTreeView)

export default ProductCommodityTreeViewContainer

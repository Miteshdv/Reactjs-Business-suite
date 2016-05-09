import { connect } from 'react-redux'
import { getProductsCommodityData} from '../actions/ProductsCommodityData'
import ProductCommodityTreeView from '../components/ProductCommodityTreeView.jsx';



const mapStateToProps = (state) => { 
 
  applyCheckboxAndCollapse(state.productCommodityData.commodityData)
  return {
    treeData: state.productCommodityData.commodityData
  }
}

let applyCheckboxAndCollapse =  function(data,checkbox)
{
  
  data.forEach(function(data){
    data.collapsed = true;
    data.checkbox = checkbox?true:false;
    //data.checkbox = true
    if(data.children)
    {
      applyCheckboxAndCollapse(data.children,true)
    }
  })
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

import { connect } from 'react-redux'
import { getProductsCommodityData , selectedProductCategory} from '../actions/ProductsCommodityData'
import ProductCommodityTreeView from '../components/ProductCommodityTreeView.jsx';



const mapStateToProps = (state) => { 
 
  applyCheckboxAndCollapse(state.productCommodityData.commodityData)
  return {
    treeData: state.productCommodityData.commodityData
  }
}

let applyCheckboxAndCollapse =  function(data,checkbox,parentName)
{
  
  data.forEach(function(data){
    data.collapsed = true;
    data.checkbox = checkbox?true:false;
    data.searchCriteria = data.label+'+'+parentName
    //data.checkbox = true
    if(data.children)
    {
      applyCheckboxAndCollapse(data.children,true,data.label)
    }
  })
}

const mapDispatchToProps = (dispatch) => { 
  return {
    loadTreeData: () => {  
    	
      dispatch(getProductsCommodityData())
    },
    selectProductSearchCategory : (selectedItem) =>  {      
      dispatch(selectedProductCategory(selectedItem))
    }
  }
}

const ProductCommodityTreeViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductCommodityTreeView)

export default ProductCommodityTreeViewContainer

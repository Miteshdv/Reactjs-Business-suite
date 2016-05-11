import {  RECEIVE_COMMODITY_DATA , SELECTED_PRODUCT_CATEGORY} from '../actions/ProductsCommodityData';



export default function productCommodityData(state = {commodityData:[]},action)
{
 
	switch (action.type) { 
		
    case RECEIVE_COMMODITY_DATA:      
      return Object.assign({}, state, { 
        commodityData: action.commodityData,
       
      })
      break;
       case SELECTED_PRODUCT_CATEGORY:  
     
      return Object.assign({}, state, { 
        selectedProductCategory: action.productCategory 

      })
      break;
    default:
      return state
  }
}
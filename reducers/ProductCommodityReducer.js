import {  
 RECEIVE_COMMODITY_DATA
} from '../actions/ProductsCommodityData'


export default function productCommodityData(state = {commodityData:[]},action)
{
 
	switch (action.type) { 
		
    case RECEIVE_COMMODITY_DATA:  
      return Object.assign({}, state, { 
        commodityData: action.commodityData,
       
      })
      break;
    default:
      return state
  }
}
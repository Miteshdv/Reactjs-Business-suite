import {  RECEIVE_PRODUCTS_DATA } from '../actions/ProductsViewData';
import {  SELECTED_PRODUCT_CATEGORY } from '../actions/ProductsCommodityData';
import {UPDATE_PRODUCTS_VIEW} from '../actions/AppActionData';

export default function getProductsData(state = {productsData:[]},action)
{  

	switch (action.type) { 
		
    case RECEIVE_PRODUCTS_DATA:      
      return Object.assign({}, state, { 
        productsData: action.productsData,
        totalPages:getTotalNumberOfPages(action.productsData)     
      })
      break; 
      case UPDATE_PRODUCTS_VIEW:      
        return Object.assign({}, state, {
                    productsData:updateProductSelection(Object.assign({},state.productsData), action.product)                    
                  })
    break;  
    default:
      return state
  }
}

function getTotalNumberOfPages(productsData)
{ 
    var totalPages = Math.floor(productsData.total_results/productsData.per_page);    
    var lastPage = productsData.total_results%productsData.per_page > 0 ?1:0;
    totalPages = totalPages+lastPage;
    return totalPages;
}


function updateProductSelection(productsListData,product)
{ 

  var productsData  = productsListData.photos.slice(0);
  for(var p = 0;p<productsData.length;p++)
  {
    if(productsData[p].id == product.id)
    {
      productsData[p].selected = false;
      break;
    }
  }
  
  return productsListData;
}
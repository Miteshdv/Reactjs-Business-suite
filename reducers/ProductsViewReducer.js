import {  RECEIVE_PRODUCTS_DATA } from '../actions/ProductsViewData';
import {  SELECTED_PRODUCT_CATEGORY } from '../actions/ProductsCommodityData';


export default function getProductsData(state = {productsData:[]},action)
{  

	switch (action.type) { 
		
    case RECEIVE_PRODUCTS_DATA:      
      return Object.assign({}, state, { 
        productsData: action.productsData       
      })
      break;   
    default:
      return state
  }
}
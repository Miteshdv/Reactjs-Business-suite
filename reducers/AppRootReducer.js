import { combineReducers } from 'redux'
import productCommodityData from './ProductCommodityReducer'
import productsViewData from './ProductsViewReducer'
import  {UPDATE_SHOPPING_CART} from '../actions/AppActionData';

 function updateShoppingCart(state = {shoppingCart:[]},action)
{		
	switch(action.type)
	{
		case UPDATE_SHOPPING_CART:
		return Object.assign({}, state, {
        shoppingCart: modifyShoppingCart(state.shoppingCart.slice(0), action)
      })
		break;
		default :
			return state
		break
	}
}

function modifyShoppingCart(shoppingCart,action)
{
	
	if(action.productSelected)
	{
		return addProduct(shoppingCart,action.product)
	}
	else
	{
		return removeProduct(shoppingCart,action.product)
	}
	
}

function addProduct(shoppingCart,product)
{
	shoppingCart.push(product);
	return shoppingCart;
}

function removeProduct(shoppingCart,product)
{
  var productIndex = shoppingCart.findIndex(function(item){
 	if(product.id ==item.id)
 	{
 		return true;
 	}
 })

   shoppingCart.splice(productIndex, 1);
   return shoppingCart;

}

const AppRootReducer = combineReducers({ 	
 	productCommodityData,
 	productsViewData,
 	updateShoppingCart
})

export default AppRootReducer
import { combineReducers } from 'redux'
import shoppingCartData from './ShoppingCartReducer'
import productCommodityData from './ProductCommodityReducer'

const AppRootReducer = combineReducers({
 	shoppingCartData,
 	productCommodityData
})

export default AppRootReducer
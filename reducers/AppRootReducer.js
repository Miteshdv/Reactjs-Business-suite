import { combineReducers } from 'redux'
import shoppingCartData from './ShoppingCartReducer'
import productCommodityData from './ProductCommodityReducer'
import productsViewData from './ProductsViewReducer'

const AppRootReducer = combineReducers({
 	shoppingCartData,
 	productCommodityData,
 	productsViewData
})

export default AppRootReducer
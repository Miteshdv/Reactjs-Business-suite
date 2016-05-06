import {  
  REQUEST_POSTS, RECEIVE_POSTS
} from '../actions/ShoppingCartData'


export default function shoppingCartData(state = {isFetching:false,items:[]},action)
{
 
	switch (action.type) {    
   
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true        
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {        
      	isFetching: false,       
        items: action.posts,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

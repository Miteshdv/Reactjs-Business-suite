import { combineReducers } from 'redux'
import {  
  REQUEST_POSTS, RECEIVE_POSTS
} from '../actions/GetGridData'


function gridData(state = {isFetching:false,items:[]},action)
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


const GridDataReducer = combineReducers({
 	gridData
})

export default GridDataReducer
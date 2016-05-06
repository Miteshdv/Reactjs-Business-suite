import fetch from 'isomorphic-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

function requestPosts() {
  return {
    type: REQUEST_POSTS    
  }
}

function receivePosts(json) {  
  return {
    type: RECEIVE_POSTS,   
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

export function getShoppingCartData() { 
  
  return dispatch => {
    dispatch(requestPosts())
    return fetch('https://www.reddit.com/r/reactjs.json')
      .then(response => response.json())
      .then(json => dispatch(receivePosts(json)))
  }
}
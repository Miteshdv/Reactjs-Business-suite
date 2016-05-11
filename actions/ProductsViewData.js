import fetch from 'isomorphic-fetch'


export const RECEIVE_PRODUCTS_DATA = 'RECEIVE_PRODUCTS_DATA'
function receiveProductsData(json) {  
   
  return {
    type: RECEIVE_PRODUCTS_DATA,   
    productsData: json    
  }
}



export function getProductsViewData(query) {   
  
  var url  ="http://api.pexels.com/v1/search?query="+query+"&&per_page=50"
  return dispatch => {    
    return fetch(url,{headers:{'Authorization':'563492ad6f91700001000001f4a1db76c78d4a4c51a6f54ab4cb901f'}})
      .then(response => response.json())
      .then(json => dispatch(receiveProductsData(json)))
  }
}
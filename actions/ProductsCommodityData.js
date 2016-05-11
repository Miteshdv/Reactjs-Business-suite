import fetch from 'isomorphic-fetch'


export const RECEIVE_COMMODITY_DATA = 'RECEIVE_COMMODITY_DATA'
export const SELECTED_PRODUCT_CATEGORY = 'SELECTED_PRODUCT_CATEGORY'

function receiveCommodityData(json) {  
   
  return {
    type: RECEIVE_COMMODITY_DATA,   
    commodityData: json    
  }
}



export function getProductsCommodityData() { 
  
  return dispatch => {    
    return fetch('http://169.161.232.42:8080/crc/ProductCommodityData.json')
      .then(response => response.json())
      .then(json => dispatch(receiveCommodityData(json)))
  }
}

export function selectedProductCategory(productCategory)
{     
	 return {
    type: 'SELECTED_PRODUCT_CATEGORY',
    productCategory:productCategory
  }
}
import fetch from 'isomorphic-fetch'


export const RECEIVE_COMMODITY_DATA = 'RECEIVE_COMMODITY_DATA'
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
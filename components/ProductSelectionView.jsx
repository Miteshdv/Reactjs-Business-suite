import React from 'react';
import ProductCommodityTreeViewContainer from '../containers/ProductCommodityTreeViewContainer.js'

import ProductListView from './ProductListComponent/ProductsListView.jsx';
import  'react-widgets/lib/less/react-widgets.less';




class ProductSelectionView extends React.Component { 

 createImageURL(startIndex,currentIndex){

    var imgIndx = startIndex+currentIndex
    var url = "https://static.pexels.com/photos/"+imgIndx+"/pexels-photo-small.jpg";
    var http = new XMLHttpRequest();  
    http.open('HEAD', url, false);
    http.send();

   if(http.status != 404 &&  http.status != 403)
    {
      return url
    }
    else
    {
      return this.createImageURL(startIndex,currentIndex+1)
    } 

}
  
 
   render() {
    var data = [];
    
    for(var i = 1 ; i < 51;i++)
    { 

      var obj = {};
      var startIndex= 33991;
     
      obj.url = this.createImageURL(startIndex,i);
      startIndex = startIndex +i
          
      obj.name = "img"+i;      
      obj.id = i;      
      data.push(obj);

    }
      return (
      	 
           
               <div  style={{float:"none",width:"100%"}}>   
                <div  style= {{width:"14.5%" ,height:this.props.windowHeight*0.88,float:"left",border:"1px solid",margin:"0px 2px 0px 0px",overflow:"auto"}} >
                  <ProductCommodityTreeViewContainer/>
                  
                </div>
                <div  style= {{float:"right",width:"85%",height:this.props.windowHeight*0.88,border:"1px solid",margin:"0px 0px 0px 2px",overflowY:"auto",overflowX:"hidden"}} >
               
                <ProductListView productData={data} wrapperClass="wrapper"
                    gridClass="col-md-3"
                    imgClass="responsive"
                    style= {{width:"100%"}}
                    perPageProducts = {10}
                    viewHeight = {this.props.windowHeight*0.926}
                   />
                  

                </div>
               </div>
          
      );
   }
}



export default ProductSelectionView


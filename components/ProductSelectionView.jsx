import React from 'react';
import ProductCommodityTreeViewContainer from '../containers/ProductCommodityTreeViewContainer.js'
import ProductsListViewContainer from '../containers/ProductsListViewContainer.js'

import ProductListView from './ProductListComponent/ProductsListView.jsx';
import  'react-widgets/lib/less/react-widgets.less';




class ProductSelectionView extends React.Component { 
  
 

   render() {
   
      return (
      	 
           
               <div  style={{float:"none",width:"100%"}}>   
                <div  style= {{width:"14.5%" ,height:this.props.windowHeight*0.88,float:"left",border:"1px solid",margin:"0px 2px 0px 0px",overflow:"auto"}} >
                  <ProductCommodityTreeViewContainer/>
                  
                </div>
                <div  style= {{float:"right",width:"85%",height:this.props.windowHeight*0.88,border:"1px solid",margin:"0px 0px 0px 2px",overflowY:"auto",overflowX:"hidden"}} >
               
                <ProductsListViewContainer wrapperClass="wrapper"
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


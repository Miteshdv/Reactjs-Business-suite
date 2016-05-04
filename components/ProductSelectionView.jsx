import React from 'react';
import TreeView from './TreeView.jsx'

import ProductListView from './ProductListComponent/ProductsListView.jsx';
import  'react-widgets/lib/less/react-widgets.less';




class ProductSelectionView extends React.Component { 

  constructor() {
     super()
     var viewHeight = window.innerHeight;
     this.state = {windowHeight:viewHeight};
     window.onresize = this.resizeView.bind(this);
   }

   resizeView()
   {  
     this.setState({windowHeight:window.innerHeight})
     
   }

  
 
   render() {
    var data = [];
    
    for(var i = 1 ; i < 51;i++)
    {
      var obj = {};
      obj.url = "http://fakeimg.pl/100/?text=img"+i;
      obj.name = "img"+i;      
      obj.id = i;      
      data.push(obj);

    }
      return (
      	 
           
               <div  style={{float:"none",width:"100%"}}>   
                <div  style= {{width:"14.5%" ,height:this.state.windowHeight*0.88,float:"left",border:"1px solid",margin:"0px 2px 0px 0px"}} >
                  <TreeView/>
                  
                </div>
                <div  style= {{float:"right",width:"85%",height:this.state.windowHeight*0.88,border:"1px solid",margin:"0px 0px 0px 2px",overflowY:"auto",overflowX:"hidden"}} >
               
                <ProductListView productData={data} wrapperClass="wrapper"
                    gridClass="col-md-3"
                    imgClass="responsive"
                    style= {{width:"100%"}}
                    perPageProducts = {10}
                    viewHeight = {this.state.windowHeight*0.926}
                   />
                  

                </div>
               </div>
          
      );
   }
}



export default ProductSelectionView


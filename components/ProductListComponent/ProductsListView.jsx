var React = require('react');
var ProductThumbnail = require('./ProductThumbnail.jsx');
var TileLayout = require('pui-react-tile-layout').TileLayout;
var TileLayoutItem = require('pui-react-tile-layout').TileLayoutItem;
import SkyLightStateless from 'react-skylight';
import ProductDetailsView from './ProductDetailsView.jsx'
 _ = require('lodash');

class ProductListView extends React.Component
{
      constructor() {
         super()         
         this.state = {productDetails:{},
                       selectedItems:[]
                       };
         
       }

       calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {

              var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
              return { width: (srcWidth*ratio), height: (srcHeight*ratio) };
        }
      
      handleClick(data) {    

          var proportinalyResizedSize = this.calculateAspectRatioFit( data.width,data.height,1000,700)
          proportinalyResizedSize.height>=700?proportinalyResizedSize.height=680:'';
          this.setState({dialogStyles:{width:proportinalyResizedSize.width+'px',height:proportinalyResizedSize.height+58+'px', top: '30%'}})
          data.height = proportinalyResizedSize.height-90;
          data.width = proportinalyResizedSize.width-30;
          this.setState({'productDetails':data});
          this.refs.dialogWithCallBacks.show()
        
      }


      updateShoppingCart(productSelected,product)
      { 
        var selectedItems = this.state.selectedItems.slice(0);
        if(productSelected)
        {
          selectedItems.push(product.id)
          
        }
        else
        {             
          _.pull(selectedItems, product.id);
        }

        this.setState({selectedItems:selectedItems},function(){this.props.updateShoppingCart(productSelected,product);})
        
      }

      mapShoppingCartSelectedItems(nextProps)
      {   
          var itemsToMap =_.map(nextProps.shoppingCartItems,'id');
           this.setState({selectedItems:itemsToMap})
          
      }

      componentWillReceiveProps(nextProps) {  
        
         var parentArray = [];
         var childArray = [];
         this.mapShoppingCartSelectedItems(nextProps);
         if (nextProps.commoditySelectedItems !== this.props.commoditySelectedItems) {  
            
            for(var q = 0 ;q< nextProps.commoditySelectedItems.length;q++)
            {
              var queryArray = nextProps.commoditySelectedItems[q].split('+');

               if(childArray.indexOf(queryArray[0]) == -1)
               {
                childArray.push(queryArray[0])
               }


              if(parentArray.indexOf(queryArray[1]) == -1)
              {
                parentArray.push(queryArray[1])
              }


            }

            var queryPart1 = childArray.join(',');
            var queryPart2 = parentArray.join(',');
            var query = queryPart1 + ' + '+queryPart2;
            
           this.props.loadProductsView(query);
        }
      }

      
      render() {        
        var that = this;
        var imageList = [];
        
        for(var  i = 0;i < this.props.productsData.length ;i++)
        {  
            var data = this.props.productsData[i];
            var url = data.src.small;     
            var urlTrimmed = url.substring(0 ,url.lastIndexOf('/'));
            var price = urlTrimmed.substring(urlTrimmed.lastIndexOf('/')+1,urlTrimmed.length);
            price = price/100;
            data.price = price;
            data.selected = this.state.selectedItems.indexOf(data.id) != -1?true:false;
            //console.log('value for '+data.id+ ' '+data.selected)
            imageList.push( <TileLayoutItem key = {data.id}><ProductThumbnail 
                                data={data}
                                id={data.id}
                                imgClass={that.props.imgClass}
                                gridClass={that.props.gridClass}
                                handleClick={that.handleClick.bind(this)}  
                                productSelection={that.updateShoppingCart.bind(this)}                                                           

                                /></TileLayoutItem>)
        }


       


   

        return (
          <div>
          <TileLayout columns={6} noGutter >
                 {imageList.length>0?imageList:<span style = {{margin:"5px",fontWeight:"bold"}}>Please Select Products Category</span>}  
           </TileLayout>
            <SkyLightStateless        
              ref="dialogWithCallBacks"
              dialogStyles={this.state.dialogStyles} 
              titleStyle = {{marginTop:"10px"}} 
              title="Product Details">
               <ProductDetailsView productDetails ={this.state.productDetails}/> 
            </SkyLightStateless>
          </div>
         
        )
      }     
  }

  
ProductListView.propTypes = {
   wrapperClass:React.PropTypes.string,
   defautImgWrapper: React.PropTypes.string,
   productsData: React.PropTypes.array,
   imgClass:React.PropTypes.string,
   gridClass:React.PropTypes.string,
   perPageProducts:React.PropTypes.number,
   loadProductsView:React.PropTypes.func,
   commoditySelectedItems:React.PropTypes.array,
   getProductDetails:React.PropTypes.func,
   shoppingCartItems:React.PropTypes.array
}

ProductListView.defaultProps = {  
   defautImgWrapper: 'clearfix',
   productsData:[]
}



export default ProductListView;
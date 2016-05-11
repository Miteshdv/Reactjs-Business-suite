var React = require('react');
var ProductThumbnail = require('./ProductThumbnail.jsx');
var TileLayout = require('pui-react-tile-layout').TileLayout;
var TileLayoutItem = require('pui-react-tile-layout').TileLayoutItem;


class ProductListView extends React.Component
{


      handleClick(data) {
        if(this.props.handleClickImage){
          this.props.handleClickImage(data);
        }
      }

      componentWillReceiveProps(nextProps) {  


        if (nextProps.productsData !== this.props.productsData) {  
               
          this.forceUpdate();
        }

        
         if (nextProps.commoditySelectedItems !== this.props.commoditySelectedItems) {  
            
            
           this.props.loadProductsView(nextProps.commoditySelectedItems.join(','));
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

            imageList.push( <TileLayoutItem key = {data.id}><ProductThumbnail 
                                data={data}
                                id={data.id}
                                imgClass={that.props.imgClass}
                                gridClass={that.props.gridClass}
                                handleClick={that.handleClick}                                
                                /></TileLayoutItem>)
        }


       


   

        return (
         <TileLayout columns={6} noGutter >
                 {imageList}  
           </TileLayout>
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
   commoditySelectedItems:React.PropTypes.array
}

ProductListView.defaultProps = {  
   defautImgWrapper: 'clearfix',
   productsData:[]
}



export default ProductListView;
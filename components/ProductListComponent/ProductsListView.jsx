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


      componentWillMount()
      {
        this.setState({
        wrapperClass: this.props.wrapperClass || this.props.defautImgWrapper,
        productData: this.props.productData
        })
      }

      componentWillReceiveProps(nextProps) {
        if (nextProps.productData !== this.state.productData) {
          this.setState({productData: nextProps.productData })
        }
      }

      render() {        
        var that = this;
        var imageList = [];

        for(var  i = 0;i < this.state.productData.length ;i++)
        { 
            var data = this.state.productData[i]
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
   productData: React.PropTypes.array,
   imgClass:React.PropTypes.string,
   gridClass:React.PropTypes.string,
   perPageProducts:React.PropTypes.number
}

ProductListView.defaultProps = {  
   defautImgWrapper: 'clearfix',
  
}



export default ProductListView;
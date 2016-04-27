var React = require('react');
var ProductThumbnail = require('./ProductThumbnail.jsx');



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
        imageData: this.props.imageData
        })
      }

      componentWillReceiveProps(nextProps) {
        if (nextProps.imageData !== this.state.imageData) {
          this.setState({imageData: nextProps.imageData })
        }
      }

      render() {        
        var that = this;
        var imageList = [];
        this.state.imageData.forEach(function(data, i) {
          imageList.push(<ProductThumbnail key={i}
                                data={data}
                                imgClass={that.props.imgClass}
                                gridClass={that.props.gridClass}
                                handleClick={that.handleClick}/>)
        })

        return (
          <div className={this.state.wrapperClass}>
            {imageList}
          </div>
        )
      }     
  }

  
ProductListView.propTypes = {
   wrapperClass:React.PropTypes.string,
   defautImgWrapper: React.PropTypes.string,
   imageData: React.PropTypes.Object,
   imgClass:React.PropTypes.string,
   gridClass:React.PropTypes.string
}

ProductListView.defaultProps = {  
   defautImgWrapper: 'clearfix',
  
}



export default ProductListView;
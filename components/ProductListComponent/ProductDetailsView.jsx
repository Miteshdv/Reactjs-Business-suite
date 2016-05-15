var React = require('react');

class ProductDetailsView extends React.Component
{	 


	 render() {      


	 	 return (
				
          <div style = {{overflow:"auto"}}>
          	<img src={this.props.productDetails.src.original} style = {{height:this.props.productDetails.height+'px',width:this.props.productDetails.width+'px'}}/>
          	<div style = {{width:"100%",float:"right","margin":"4px",padding:"4px",textAlign:"center"}}>
           {this.props.productDetails.photographer}
            <div>
              <span style= {{fontWeight:'bold'}}>Price:</span>
              <span style = {{marginLeft:"8px"}}>$</span> 
              <span>{this.props.productDetails.price}</span>                
            </div>        
          </div>
          </div>

          )
	 }
}


ProductDetailsView.propTypes = {
   productDetails:React.PropTypes.object
}

ProductDetailsView.defaultProps = {  
   productDetails: {src:{original:'test',height:'100%',width:'100%'}},
   
}

export default ProductDetailsView;

import React from 'react';
const imgSrc = require('../assets/images/reactjsLogo.png')
const commodityData = require('../data/ProductsViewData/ProductCommodityData.json')
import MaterialUITabs from 'material-ui/Tabs/Tabs';
import MaterialUITab from 'material-ui/Tabs/tab';
import ShoppingCartViewContainer from '../containers/ShoppingCartViewContainer.js';
import ProductSelectionView from './ProductSelectionView.jsx';
import CheckoutView from './CheckoutView.jsx';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class App extends React.Component { 

 
  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme)};
  }


  constructor() {
     super()
     console.log('I am rezied ' +window.innerHeight)
     var viewHeight = window.innerHeight;
     this.state = {windowHeight:viewHeight,tabValue:"productView"};
     
     
   }

   componentDidMount() {

      window.onresize = this.resizeView.bind(this)
      this.productViewBtn.className = "breadCrumbBtnSelected"
   }


   resizeView()
   { 
    
     this.setState({windowHeight:window.innerHeight})     
   }
    

  handleChange = (value) => {
    this.setState({
      tabValue: value,
    });
  };

  changeStackView(event)
  {   
      var lastButton = this[this.state.tabValue+'Btn'];
      lastButton.className = "breadCrumbBtn"
      var view = event.currentTarget.id;
      event.currentTarget.className = "breadCrumbBtnSelected";
      var stateViewValue = view.substring(0,view.indexOf('Btn'));
      this.setState({tabValue: stateViewValue});     
  }
 
   render() {

   
   
      return (

          <div class="window vbox" ref={(ref) => this.mainContainer = ref} style = {{width:"100%",padding:"4px",height:this.state.windowHeight,minWidth:"800px",overflow:"hidden"}}>
               <div style= {{width:"100%",height:"50px",border:"1px solid",padding:"2px",alignItems: "baseline"}} >

                <img src={imgSrc} alt="React JS" height="95%" width="42"/>
                <span style = {{fontWeight:'bold',fontSize:"20px",margin:"4px"}}> React JS Business Suite</span>
               </div>
               
               <div style = {{margin:"4px 0px 4px 0px",width:"100%",float:"left"}} >
                  <button className = {"breadCrumbBtn"} ref={(ref) => this.productViewBtn = ref} id = "productViewBtn" onClick={this.changeStackView.bind(this)}>Products View</button>
                   <button className = {"breadCrumbBtn"} ref={(ref) => this.shoppingCartViewBtn = ref}  id ="shoppingCartViewBtn" onClick={this.changeStackView.bind(this)}>Shopping Cart{this.props.shoppingCartsItems >0?"("+this.props.shoppingCartsItems+")":''}</button>
                  <button  className = {"breadCrumbBtn"} ref={(ref) => this.checkoutViewBtn = ref}  id ="checkoutViewBtn" onClick={this.changeStackView.bind(this)}>Checkout</button>
               </div>
                <MaterialUITabs inkBarStyle = {{display:"none"}} tabItemContainerStyle = {{display:"none"}}
                                value={this.state.tabValue}                               
                                ref={(ref) => this.viewNavigator = ref} 
                                style = {{margin:"6px 0px 2px 0px"}}>
                  <MaterialUITab value="productView"><ProductSelectionView windowHeight = {this.state.windowHeight}/></MaterialUITab>
                  <MaterialUITab value="shoppingCartView">
                    <ShoppingCartViewContainer/>
                  </MaterialUITab>
                  <MaterialUITab value="checkoutView">
                   <CheckoutView/>
                  </MaterialUITab>
                </MaterialUITabs>
            </div>

      	 
         
      );
   }
}

App.childContextTypes = {
    muiTheme: React.PropTypes.object
};

App.propTypes = { 
  loadShoppingCartData:React.PropTypes.func,
  shoppingCartsItems:React.PropTypes.number
}

App.defaultProps = {
  shoppingCartsItems:0
}

export default App


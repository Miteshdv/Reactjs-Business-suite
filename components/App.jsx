import React from 'react';
const imgSrc = require('../assets/images/reactjsLogo.png')

import MaterialUITabs from 'material-ui/Tabs/Tabs';
import MaterialUITab from 'material-ui/Tabs/tab';
import DataGridContainer from '../containers/DataGridContainer.js';
import ProductSelectionView from './ProductSelectionView.jsx'
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class App extends React.Component { 

 
  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme)};
  }


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

   
   
      return (

          <div class="window vbox" ref={(ref) => this.mainContainer = ref} style = {{width:"100%",padding:"2px",height:this.state.windowHeight,minWidth:"800px",overflow:"hidden"}}>
               <div style= {{width:"100%",height:"50px",border:"1px solid",padding:"2px",alignItems: "baseline"}} >

                <img src={imgSrc} alt="React JS" height="95%" width="42"/>
                <span style = {{fontWeight:'bold',fontSize:"20px",margin:"4px"}}> React JS Business Suite</span>
               </div>
               
                <MaterialUITabs>
                  <MaterialUITab  label="Products"><ProductSelectionView/></MaterialUITab>
                  <MaterialUITab  label="Shopping cart">
                    <DataGridContainer/>
                  </MaterialUITab>
                  <MaterialUITab label="Checkout">
                   <div>Checkout</div>
                  </MaterialUITab>
                </MaterialUITabs>
            </div>

      	 
         
      );
   }
}

App.childContextTypes = {
    muiTheme: React.PropTypes.object
};


export default App


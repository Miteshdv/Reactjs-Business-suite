import React from 'react';
import TreeView from './TreeView.jsx'
import Container from 'react-layout-components';
import {VBox,Box} from 'react-layout-components';
import  'react-widgets/lib/less/react-widgets.less';
const imgSrc = require('../assets/images/reactjsLogo.png')

class App extends React.Component { 

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
      	 
            <VBox ref={(ref) => this.mainContainer = ref} width = "100%" height ={this.state.windowHeight} style = {{padding:"2px"}}>
               <Box width ="100%" height ="50" style= {{border:"1px solid",padding:"2px"}} alignItems = "baseline">

                <img src={imgSrc} alt="React JS" height="95%" width="42"/>
                <span style = {{fontWeight:'bold',fontSize:"20",margin:"4px"}}> React JS Business Suite</span>
               </Box>
               <Box width = "100%"  >   
                <Box width ="15%" height ={this.state.windowHeight*0.926}  style= {{border:"1px solid",margin:"4px 2px 0px 0px"}} >
                  <TreeView/>
                  
                </Box>
                <Box width ="85%" height ={this.state.windowHeight*0.926} style= {{border:"1px solid",margin:"4px 0px 0px 2px"}} >List Items</Box>
               </Box>
            </VBox>
      );
   }
}



export default App


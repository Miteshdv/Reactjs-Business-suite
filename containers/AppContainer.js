import { connect } from 'react-redux';
import App from '../components/App.jsx';



const mapStateToProps = (state) => { 
  
  if(state.updateShoppingCart.shoppingCart)
  {
  	 return {shoppingCartsItems:state.updateShoppingCart.shoppingCart.length}
  }
 
}


const AppContainer = connect(
  mapStateToProps 
)(App)

export default AppContainer
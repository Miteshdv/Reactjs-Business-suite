import { connect } from 'react-redux'
import { getGridData} from '../actions/GetGridData'
import ShoppingCartView from '../components/ShoppingCartView.jsx';



const mapStateToProps = (state) => {
  state.gridData.items = state.gridData.items.concat(state.gridData.items).concat(state.gridData.items)
  return {
    gridData: state.gridData.items
  }
}

const mapDispatchToProps = (dispatch) => { 
  return {
    loadGridData: () => {  
    	
      dispatch(getGridData())
    }
  }
}

const ShoppingCartViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingCartView)

export default ShoppingCartViewContainer
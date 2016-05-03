import { connect } from 'react-redux'
import { getGridData} from '../actions/GetGridData'
import DataGridView from '../components/DataGridView.jsx';



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

const DataGridContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DataGridView)

export default DataGridContainer
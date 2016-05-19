import React from 'react';
import ReactDOM from 'react-dom';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/theme-fresh.css';
import {IntlProvider, FormattedNumber, FormattedDate ,FormattedPlural} from 'react-intl';
import Combobox  from 'react-widgets/lib/Combobox';
import ShoppingCartItemIncrementRenderer  from './ShoppingCartItemIncrementRenderer.jsx';
import ShoppingCartItemDeleteRenderer  from './ShoppingCartItemDeleteRenderer.jsx';

class ShoppingCartView extends React.Component{
	
	shouldComponentUpdate(nextProps, nextState) {		
	  return nextProps.gridData.length !== this.props.gridData.length;
	}

	constructor() {
		 super()
		 
	      this.state = { 
	      colors: [],   
			agDataGridColumns:[
				{headerName: "Product Id", field: "id" ,width:200},
				{headerName: "Product Name", field: "photographer",width:250},
				{headerName: "Product Thumbnail", field: "src.tiny",width:100,cellRenderer: function(params) {

					return '<img src="'+params.data.src.tiny+'" style = "height:40px;width:40px"/>';
				}},
				{headerName: "Product URL", field: "url",width:400 ,cellRenderer: function(params) {

					return '<a href='+params.value+' target="_blank">'+params.value+'</a>'
				}},
				{headerName: "No. of Items",field:"numberOfItems",width:200,cellRenderer:function(params)
					{	
						 	
						 var eParentElement = params.eParentOfValue;
						 
						 ReactDOM.render(<ShoppingCartItemIncrementRenderer gridParams ={params}/>, eParentElement);
						
						params.addRenderedRowListener('renderedRowRemoved', () => {
							            ReactDOM.unmountComponentAtNode(eParentElement);
							        });

						return null
					}
				},
				{headerName: "Total Price", field: "price",width:200,cellRenderer:function(params){
					return '$ '+params.value;
				}},
				{headerName: "Add/Remove",width:200 ,cellRenderer:function(params)
					{	
						 	
						 var eParentElement = params.eParentOfValue;						 
						 ReactDOM.render(<ShoppingCartItemDeleteRenderer gridParams ={params}/>, eParentElement);
						
						params.addRenderedRowListener('renderedRowRemoved', () => {
							            ReactDOM.unmountComponentAtNode(eParentElement);
							        });						
						return null
					}
				}				

			]
	        }

     }

     deleteCartItem(params)
     {
     	this.props.deleteCartItem(params.data)
     }
     

     componentDidMount() {     
      this.reactDG.api.addEventListener('deleteCartItem',this.deleteCartItem.bind(this))
   }

	

	render(){
		return  (		
					   
						    <div className="ag-fresh" style = {{"width":"100%"}}>
							    <AgGridReact
							    	ref={(ref) => this.reactDG = ref} 	
							    	suppressLoadingOverlay= {true}							    	
							    	rowData = {this.props.gridData}						    	
							    		    	
								    // column definitions and row data are immutable, the grid
								    // will update when these lists change
								    columnDefs={this.state.agDataGridColumns}
								    rowHeight="38"								    
								/>
							</div>
						
					
				    );
	}
}


ShoppingCartView.propTypes = {  
  gridData:React.PropTypes.array,
  deleteCartItem:React.PropTypes.func  

}


export default ShoppingCartView


	
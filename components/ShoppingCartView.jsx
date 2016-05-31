import React from 'react';
import ReactDOM from 'react-dom';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/theme-fresh.css';
import 'ag-grid/dist/styles/theme-blue.css';
import {IntlProvider, FormattedNumber, FormattedDate ,FormattedPlural} from 'react-intl';
import Combobox  from 'react-widgets/lib/Combobox';
import ShoppingCartItemIncrementRenderer  from './ShoppingCartItemIncrementRenderer.jsx';
import ShoppingCartItemDeleteRenderer  from './ShoppingCartItemDeleteRenderer.jsx';

class ShoppingCartView extends React.Component{
	
	shouldComponentUpdate(nextProps, nextState) {		
	  return nextProps.gridData.length !== this.props.gridData.length;
	}
	componentWillReceiveProps(nextProps) {
		if(nextProps.gridData.length !== this.props.gridData.length)
		{
			var gridData = nextProps.gridData;
			this.updateTotalRow(gridData)
			this.setState({totalPrice:this.updateTotalRow(gridData)},function(){
   			var obj = {
	   		 id:'',
	        photographer:'',
	        src:{tiny:''} , 
	        url:'',
	        numberOfItems:'',
	        price: this.state.totalPrice,
	   	}

   			this.reactDG.api.setFloatingBottomRowData([obj])
   		})
			
		}
	}

	updateTotalRow(gridData)
	{		var totalPrice = 0
			for(var g = 0 ;g<gridData.length;g++)
			{
				totalPrice += Number(gridData[g].price)
			}

			return totalPrice.toFixed(2)
	}

	constructor() {
		 super()
		 
	      this.state = { 
	      colors: [], 
	      totalPrice:0,  
			agDataGridColumns:[
				{headerName: "Product Id", field: "id" ,width:200},
				{headerName: "Product Name", field: "photographer",width:250},
				{headerName: "Product Thumbnail", field: "src.tiny",width:100,cellRenderer: function(params) {

					if(params.data.src.tiny)
					{
						return '<img src="'+params.data.src.tiny+'" style = "height:40px;width:40px"/>';
					}
					else
					{
						return '';
					}
					
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
					if(params.data.id)
					{
						return '$ '+params.value;
					}
					else
					{	

						return '<div style="font-weight:bold;font-size:16px">$ Total Price '+params.value+'</div>';
					}
					
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

   setTotalFooter(grid)
   {
   	 var gridApi = grid.api;
   	 var rows = this.createData(1, 'Bottom');
     gridApi.setFloatingBottomRowData(rows);
     gridApi.sizeColumnsToFit()
   }

  createData(count, prefix) {
  	
    var result = [];
    for (var i = 0; i<count; i++) {
        result.push({ 
        id:'',
        photographer:'',
        src:{tiny:''} , 
        url:'',
        numberOfItems:'',
        price: 0,
        });
    }
    return result;
   }

   

   calculateTotalRow(updateObj){
   	if(updateObj.hasOwnProperty('updatedRow'))
   	{
   		
   		this.setState({totalPrice:this.updateTotalRow(updateObj.updatedRow.gridOptionsWrapper.gridOptions.rowData)},function(){
   			var obj = {
	   		 id:'',
	        photographer:'',
	        src:{tiny:''} , 
	        url:'',
	        numberOfItems:'',
	        price: this.state.totalPrice,
	   	}

   			updateObj.updatedRow.gridOptionsWrapper.gridOptions.api.setFloatingBottomRowData([obj])
   		})
   		
   	}
   }

	render(){
		return  (		
					   
						    <div className="ag-blue" style = {{"width":"100%"}}>
							    <AgGridReact
							    	ref={(ref) => this.reactDG = ref} 	
							    	suppressLoadingOverlay= {true}							    	
							    	rowData = {this.props.gridData}						    	
							    	onGridReady = {this.setTotalFooter.bind(this)}	
							    	onModelUpdated	= {this.calculateTotalRow.bind(this)}						    							    							    	
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
  deleteCartItem:React.PropTypes.func,
  updateCartItem:React.PropTypes.func

}


export default ShoppingCartView


	
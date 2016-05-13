import React from 'react';
import ReactDOM from 'react-dom';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/theme-fresh.css';
import {IntlProvider, FormattedNumber, FormattedDate ,FormattedPlural} from 'react-intl';
import Combobox  from 'react-widgets/lib/Combobox';

{/*cellRenderer: function(params) {




						var monthNames = [
						  "January", "February", "March",
						  "April", "May", "June", "July",
						  "August", "September", "October",
						  "November", "December"
						];

						var date = new Date(params.value*1000);
						var day = date.getDate();
						var monthIndex = date.getMonth();
						var year = date.getFullYear();
						var formattedDate = day + ' ' + monthNames[monthIndex] + ' ' + year
						return formattedDate

					}

headerName: "Values", width:200 ,cellRenderer:function(params)
					{	
						
						 var eParentElement = params.eGridCell;
						 eParentElement.style.overflow = "visible";
						 var comboStyle = {height:22, padding :2}
						 var options = [
										  {id:1,name:'red'},
								      			  {id:2,name:'blue'},
								      			  {id:3,name:'green'},
								      			  {id:4,name:'purple'}
								      				 
																	
								      	
										]
						ReactDOM.render(
							<Combobox value = "green" valueField = 'id' textField = 'name' data ={options} onChange = {function(){}}/>, eParentElement);
						params.addRenderedRowListener('renderedRowRemoved', function () {
											            ReactDOM.unmountComponentAtNode(eParentElement);
											        });

						return null
					}

				*/}

class ShoppingCartView extends React.Component{
	
	constructor() {
		 super()
		 
	      this.state = { 
	      colors: [],   
			agDataGridColumns:[
				{headerName: "Product Id", field: "id" ,width:200},
				{headerName: "Product Name", field: "photographer",width:300},
				{headerName: "Product URL", field: "url",width:400 ,cellRenderer: function(params) {

					return '<a href='+params.value+' target="_blank">'+params.value+'</a>'
				}},
				{headerName: "No. of Items",width:200},
				{headerName: "Total Price", field: "price",width:200},
				{headerName: "Add/Remove",width:200}				

			]
	        }

     }
	

	render(){
		return  (		
					   
						    <div className="ag-fresh" style = {{"width":"100%","height":500}}>
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
  gridData:React.PropTypes.array
}

export default ShoppingCartView


	
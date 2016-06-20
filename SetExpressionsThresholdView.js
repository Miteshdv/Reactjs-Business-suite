Ext.define('Citi.view.earlywarning.EWSetExpressionsThresholdView', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.maintainIndicatorsthresholdExpressionsGrid',
	requires : ['Citi.view.components.ColumnComponent','Citi.view.components.EWCustomExpressionThresoldRenderer'],
	mixins:['Citi.view.earlywarning.EWCreateThresholdDataMixin', 'Citi.view.earlywarning.EWIncThresholdColumnsRendererMixin', 
				'Citi.view.earlywarning.EWCharThresholdColumnsRendererMixin', 'Citi.view.earlywarning.EWDecThresholdColumnsRendererMixin'],
	forceFit : true,	
	isAscending:true,
	overflowY:'auto',
	overflowX: 'false',
	height:180,
	isStoreAvailable:false,
	isViewReady:false,
	rowIndex : '',
	isCheckboxEmbedded:true,
	plugins: [/*{
        ptype: 'bufferedrenderer',
        trailingBufferZone: 1,  
        leadingBufferZone: 1 
    },*/{
    	ptype: 'cellediting',
		clicksToEdit:1
    },
    {
		ptype:'ewReadOnlyPlugin'
	}],
    
	viewConfig:{
		markDirty:false
	},
	listeners:{
		
		viewready:function(view)
		{	
			view.isViewReady = true;
			view.selectFirstChild();
		},
		
		select : function(row, record, index, eOpts){
			this.rowIndex = index;
		},
		
		beforeedit : function(editor, context, eOpts){
			var me = this; 
			return me.onCellBeforeEdit(editor, context, eOpts);
		}
		
	},
	/** 
	 * @method afterRender Adjusts width of column after grid is renderered.			 
	 *  	
	 */
	afterRender : function() {
		var me = this;
		this.callParent(arguments);
		/*for (var c = 0; c < this.columns.length; c++) {
			if(this.columns[c].text == 'Green' || this.columns[c].text == 'Yellow' || this.columns[c].text == 'Orange' || this.columns[c].text == 'Red' || this.columns[c].text == 'Black')
			{
				this.columns[c].setWidth(160);
			}
			
			if(this.columns[c].text == 'Expression Name')
			{
				this.columns[c].setWidth(100);
			}
		}*/
	},
	cls : 'threshold-grid-style',	
	/** 
	 * @method setDataForGrid Sets Data for grid ,To apply store it needs to combine watchlist color and
	 * 						 ScoreSchema Data.		 
	
	 */
	setDataForGrid : function(expressionList) {	
		var scoreSchemaArry = [];		
		for(var i  = 0;i<expressionList.getCount();i++)
		{
			this.createScoreSchemaObject(expressionList.getAt(i).scoreSchemaList(), i, scoreSchemaArry);	
			scoreSchemaArry[i].expressionName = expressionList.getAt(i).getExpressionType().get("expressionName");
			scoreSchemaArry[i].expressionFormula = expressionList.getAt(i).getExpressionType().get("expressionFormula");
			scoreSchemaArry[i].expressionTypeCode = expressionList.getAt(i).getExpressionType().get("expressionTypeCode");
			scoreSchemaArry[i].expressionSourceType  = expressionList.getAt(i).getExpressionType().get("expressionSourceType");
			scoreSchemaArry[i].expressionSQLParameters  = expressionList.getAt(i).getExpressionType().get("expressionSQLParameters");
			scoreSchemaArry[i].expressionID = 	expressionList.getAt(i).get('expressionID');
			scoreSchemaArry[i].expressionType = expressionList.getAt(i).getExpressionType();
			scoreSchemaArry[i].directionThreshold = expressionList.getAt(i).get('direction');
			
		}		
		
			var thresholdSettingStore = Ext.create(
					'Citi.store.earlywarning.EWSetExpressionsThresholdStore', {
						data : scoreSchemaArry
					});
				
		this.reconfigure(thresholdSettingStore);
		this.isStoreAvailable = true;		
		this.selectFirstChild();
		
	},
	/**
	 * @method addEmptyRecord add extra Node to View
	 * @param {Object} record
	 */
	addEmptyRecord:function(record)
	{
		var emptyRec = this.createEmptyRecord(this.getStore().getCount());
		emptyRec.expressionName = record.get("expressionName");
		emptyRec.directionThreshold = 1;
		emptyRec.expressionFormula = record.get("expressionFormula");
		emptyRec.expressionTypeCode = record.get('expressionTypeCode');
		emptyRec.expressionSourceType = record.get('expressionSourceType');
		emptyRec.expressionSQLParameters = record.get('expressionSQLParameters');		
		emptyRec.expressionType  = {expressionTypeCode:record.get('expressionTypeCode'),expressionName:record.get("expressionName")};
		this.getStore().add(emptyRec);
		this.getView().refresh();		
		
	},
	
	/**
	 * @method removeRecord remove expression from View
	 * @param {Object} record
	 */
	removeRecord:function(record)
	{
		if(record == null){
			return
		}
		var recordInStore = this.getStore().findRecord("expressionTypeCode",record.get('expressionTypeCode'));
		var recordIndex = this.getStore().indexOf(recordInStore);
		this.getStore().removeAt(recordIndex);
		this.getView().refresh();		
		
	},
		
	/**
	 * Select first child on view ready	
	 */
	selectFirstChild:function()
	{	
		
		
	},
	
	columns : [
				{
					text : resourcebundle.ResourceManager.getString("maintainIndicators.settingExpressionsThresholds.expressionName",""),
					tooltip: resourcebundle.ResourceManager.getString("maintainIndicators.settingExpressionsThresholds.expressionName",""),
					dataIndex:'expressionName',
					//width : '30%',
					renderer:SharedLib.common.CommonFunctions.addToolTip
				},
				{
					text : resourcebundle.ResourceManager.getString("maintainIndicators.settingExpressionsThresholds.directionThreshold",""),
					tooltip: resourcebundle.ResourceManager.getString("maintainIndicators.settingExpressionsThresholds.directionThreshold",""),
					dataIndex:"directionThreshold",
					width : 100,
					tdCls: "comboBackground",
		            editor: {
		                xtype: 'combo',
		                editable: false,
		                store:{
							fields: ['directionName', 'direction'],
						    data : [
						        {"directionName":"Increasing", "direction":1},
						        {"directionName":"Decreasing", "direction":0}
						    ]
						},
						queryMode: "local",
						matchFieldWidth: true,
						displayField: 'directionName',
						valueField: 'direction',
						listeners : {
							change : function( cmbBox, newValue, oldValue, eOpts){
								var gridInstance = cmbBox.up('#setExpressionsthresholdViewDispComp');
								gridInstance.resetRecord(gridInstance.getSelectionModel().getLastSelected());
							}
						}
		            },
		            renderer : function(value, metadata, record, rowIndex, colIndex, store){
						 var combo = this.headerCt.getGridColumns()[colIndex].getEditor();
			             var stores = combo.getStore(); 
	   					 var idx = stores.find(combo.valueField, value);
	   					 var rec = stores.getAt(idx);
   					 
   					 if (rec) {
							metadata.tdAttr = 'data-qtip="' + Ext.htmlEncode(rec.get(combo.displayField)) + '"';
							return rec.get(combo.displayField);
						} else {
							metadata.tdAttr = 'data-qtip="' + value + '"';
							return value;
						}	
					}
				},
				{
				text : resourcebundle.ResourceManager.getString("scoreSchemaColor.riskLevelThresholds",""),
				tooltip: resourcebundle.ResourceManager.getString("scoreSchemaColor.riskLevelThresholds",""),
				//width : '50%',
				resizable : true,
				columns : [{
							text : resourcebundle.ResourceManager.getString("scoreSchemaColor.green",""),
							tooltip: resourcebundle.ResourceManager.getString("scoreSchemaColor.green",""),
							dataIdx : 'scoreColorgreen',
							columnWidth:0.20,
							//xtype : 'customExpressionThresoldCheckbox'
							columns : [{
								width:30,
								lockable: false,						
					    		renderer : function(value, meta, record, row, col, store, gridView){
					    			if(row != -1){
					    				var columnData = record.get(meta.column.ownerCt.dataIdx);
					    				if(disabledValue = record.get('expressionSourceType') == 'BOOLEAN'){
					    					var disabledValue = true;
					    						columnData.checked = true;
					    				}
					    				var onChangeFunction = '';
					    				if(record.get('expressionSourceType') == 'CHAR'){
					    					onChangeFunction = 'window.onThresholdCharExpCheckChange(this)';
					    				} else {
					    					onChangeFunction = 'window.onThresholdCheckChange(this)';
					    				}
					    				return "<input type='checkbox' onchange='" + onChangeFunction + "' gridId = '"+ gridView.ownerCt.itemId + "'rowIndex ='" + row + "' id ='" + meta.column.ownerCt.dataIdx + "'" + (columnData.checked ? "checked='checked'" : "") + " " + (disabledValue ? "disabled='disabled'" : "") + " >";
					    			}
					    		}
							},{
								text: resourcebundle.ResourceManager.getString("riskThresholds.threshold",""), 
								tooltip: resourcebundle.ResourceManager.getString("riskThresholds.threshold",""), 
								width:70,
								lockable: false,
								tdcls:'threshold-column',
								renderer: function (value, meta, record, row, col, store, gridView) {
									if(row != -1){
					    				var gridInstance = gridView.up('grid');
					    				return gridInstance.getExpressionThresholdColumnRenderer(value, meta, record, row, col, store);
					    			}
								},
								getEditor: function(record) {
									var me = this;
									var gridInstance = me.up('grid');
									return gridInstance.getExpressionThresholdEditor(record, me.ownerCt.dataIdx);
								}		
							},{
								text: resourcebundle.ResourceManager.getString("riskThresholds.range",""),
								tooltip: resourcebundle.ResourceManager.getString("riskThresholds.range",""),
								width:80,
								lockable: false,
								renderer: function (value, meta, record, row, col, store, gridView) {
									if(row != -1){
										var gridInstance = gridView.up('grid');
					    				return gridInstance.getExpressionRangeColumnRenderer(value, meta, record, row, col, store);
					    			}
								}	
							}]
							

						}, {
							text : resourcebundle.ResourceManager.getString("scoreSchemaColor.yellow",""),
							tooltip: resourcebundle.ResourceManager.getString("scoreSchemaColor.yellow",""),
							dataIdx : 'scoreColoryellow',
							columnWidth:0.20,
							//xtype : 'customExpressionThresoldCheckbox'
							columns : [{
								width:30,
								lockable: false,						
					    		renderer : function(value, meta, record, row, col, store, gridView){
					    			if(row != -1){
					    				var columnData = record.get(meta.column.ownerCt.dataIdx),
					    					disabledValue = record.get('expressionSourceType') == 'BOOLEAN';
					    				var onChangeFunction = '';
					    				if(record.get('expressionSourceType') == 'CHAR'){
					    					onChangeFunction = 'window.onThresholdCharExpCheckChange(this)';
					    				} else {
					    					onChangeFunction = 'window.onThresholdCheckChange(this)';
					    				}
					    				return "<input type='checkbox' onchange='" + onChangeFunction + "' gridId = '"+ gridView.ownerCt.itemId + "'rowIndex ='" + row + "' id ='" + meta.column.ownerCt.dataIdx + "'" + (columnData.checked ? "checked='checked'" : "") + " " + (disabledValue ? "disabled='disabled'" : "") + " >";
					    			}
					    		}
							},{
								text: resourcebundle.ResourceManager.getString("riskThresholds.threshold",""), 
								tooltip: resourcebundle.ResourceManager.getString("riskThresholds.threshold",""), 
								width:70,
								lockable: false,
								tdcls:'threshold-column',
								renderer: function (value, meta, record, row, col, store, gridView) {
									if(row != -1){
					    				var gridInstance = gridView.up('grid');
					    				return gridInstance.getExpressionThresholdColumnRenderer(value, meta, record, row, col, store);
					    			}
								},
								getEditor: function(record) {
									var me = this;
									var gridInstance = me.up('grid');
									return gridInstance.getExpressionThresholdEditor(record, me.ownerCt.dataIdx);
								}		
							},{
								text: resourcebundle.ResourceManager.getString("riskThresholds.range",""),
								tooltip: resourcebundle.ResourceManager.getString("riskThresholds.range",""),
								width:80,
								lockable: false,
								renderer: function (value, meta, record, row, col, store, gridView) {
									if(row != -1){
										var gridInstance = gridView.up('grid');
					    				return gridInstance.getExpressionRangeColumnRenderer(value, meta, record, row, col, store);
					    			}
								}	
							}]
						}, {
							text : resourcebundle.ResourceManager.getString("scoreSchemaColor.orange",""),
							tooltip: resourcebundle.ResourceManager.getString("scoreSchemaColor.orange",""),
							dataIdx : 'scoreColororange',
							columnWidth:0.20,
							//xtype : 'customExpressionThresoldCheckbox'
							columns : [{
								width:30,
								lockable: false,						
					    		renderer : function(value, meta, record, row, col, store, gridView){
					    			if(row != -1){
					    				var columnData = record.get(meta.column.ownerCt.dataIdx),
					    					disabledValue = record.get('expressionSourceType') == 'BOOLEAN';
					    				var onChangeFunction = '';
					    				if(record.get('expressionSourceType') == 'CHAR'){
					    					onChangeFunction = 'window.onThresholdCharExpCheckChange(this)';
					    				} else {
					    					onChangeFunction = 'window.onThresholdCheckChange(this)';
					    				}
					    				return "<input type='checkbox' onchange='" + onChangeFunction + "' gridId = '"+ gridView.ownerCt.itemId + "'rowIndex ='" + row + "' id ='" + meta.column.ownerCt.dataIdx + "'" + (columnData.checked ? "checked='checked'" : "") + " " + (disabledValue ? "disabled='disabled'" : "") + " >";
					    			}
					    		}
							},{
								text: resourcebundle.ResourceManager.getString("riskThresholds.threshold",""), 
								tooltip: resourcebundle.ResourceManager.getString("riskThresholds.threshold",""), 
								width:70,
								lockable: false,
								tdcls:'threshold-column',
								renderer: function (value, meta, record, row, col, store, gridView) {
									if(row != -1){
					    				var gridInstance = gridView.up('grid');
					    				return gridInstance.getExpressionThresholdColumnRenderer(value, meta, record, row, col, store);
					    			}
								},
								getEditor: function(record) {
									var me = this;
									var gridInstance = me.up('grid');
									return gridInstance.getExpressionThresholdEditor(record, me.ownerCt.dataIdx);
								}		
							},{
								text: resourcebundle.ResourceManager.getString("riskThresholds.range",""),
								tooltip: resourcebundle.ResourceManager.getString("riskThresholds.range",""),
								width:80,
								lockable: false,
								renderer: function (value, meta, record, row, col, store, gridView) {
									if(row != -1){
					    				var gridInstance = gridView.up('grid');
					    				return gridInstance.getExpressionRangeColumnRenderer(value, meta, record, row, col, store);
					    			}
								}	
							}]
						}, {
							text : resourcebundle.ResourceManager.getString("scoreSchemaColor.red",""),
							tooltip: resourcebundle.ResourceManager.getString("scoreSchemaColor.red",""),
							dataIdx : 'scoreColorred',
							columnWidth:0.20,
							//xtype : 'customExpressionThresoldCheckbox'
							columns : [{
								width:30,
								lockable: false,						
					    		renderer : function(value, meta, record, row, col, store, gridView){
					    			if(row != -1){
					    				var columnData = record.get(meta.column.ownerCt.dataIdx),
					    					disabledValue = record.get('expressionSourceType') == 'BOOLEAN';
					    				var onChangeFunction = '';
					    				if(record.get('expressionSourceType') == 'CHAR'){
					    					onChangeFunction = 'window.onThresholdCharExpCheckChange(this)';
					    				} else {
					    					onChangeFunction = 'window.onThresholdCheckChange(this)';
					    				}
					    				return "<input type='checkbox' onchange='" + onChangeFunction + "' gridId = '"+ gridView.ownerCt.itemId + "'rowIndex ='" + row + "' id ='" + meta.column.ownerCt.dataIdx + "'" + (columnData.checked ? "checked='checked'" : "") + " " + (disabledValue ? "disabled='disabled'" : "") + " >";
					    			}
					    		}
							},{
								text: resourcebundle.ResourceManager.getString("riskThresholds.threshold",""), 
								tooltip: resourcebundle.ResourceManager.getString("riskThresholds.threshold",""), 
								width:70,
								lockable: false,
								tdcls:'threshold-column',
								renderer: function (value, meta, record, row, col, store, gridView) {
									if(row != -1){
					    				var gridInstance = gridView.up('grid');
					    				return gridInstance.getExpressionThresholdColumnRenderer(value, meta, record, row, col, store);
					    			}
								},
								getEditor: function(record) {
									var me = this;
									var gridInstance = me.up('grid');
									return gridInstance.getExpressionThresholdEditor(record, me.ownerCt.dataIdx);
								}		
							},{
								text: resourcebundle.ResourceManager.getString("riskThresholds.range",""),
								tooltip: resourcebundle.ResourceManager.getString("riskThresholds.range",""),
								width:80,
								lockable: false,
								renderer: function (value, meta, record, row, col, store, gridView) {
									if(row != -1){
					    				var gridInstance = gridView.up('grid');
					    				return gridInstance.getExpressionRangeColumnRenderer(value, meta, record, row, col, store);
					    			}
								}	
							}]
						}, {
							text : resourcebundle.ResourceManager.getString("scoreSchemaColor.black",""),
							tooltip: resourcebundle.ResourceManager.getString("scoreSchemaColor.black",""),
							dataIdx : 'scoreColorblack',
							columnWidth:0.20,
							//xtype : 'customExpressionThresoldCheckbox'
							columns : [{
								width:30,
								lockable: false,						
					    		renderer : function(value, meta, record, row, col, store, gridView){
					    			if(row != -1){
					    				var columnData = record.get(meta.column.ownerCt.dataIdx),
					    					disabledValue = record.get('expressionSourceType') == 'BOOLEAN';
					    				var onChangeFunction = '';
					    				if(record.get('expressionSourceType') == 'CHAR'){
					    					onChangeFunction = 'window.onThresholdCharExpCheckChange(this)';
					    				} else {
					    					onChangeFunction = 'window.onThresholdCheckChange(this)';
					    				}
					    				return "<input type='checkbox' onchange='" + onChangeFunction + "' gridId = '"+ gridView.ownerCt.itemId + "'rowIndex ='" + row + "' id ='" + meta.column.ownerCt.dataIdx + "'" + (columnData.checked ? "checked='checked'" : "") + " " + (disabledValue ? "disabled='disabled'" : "") + " >";
					    			}
					    		}
							},{
								text: resourcebundle.ResourceManager.getString("riskThresholds.threshold",""), 
								tooltip: resourcebundle.ResourceManager.getString("riskThresholds.threshold",""), 
								width:70,
								lockable: false,
								tdcls:'threshold-column',
								renderer: function (value, meta, record, row, col, store, gridView) {
									if(row != -1){
					    				var gridInstance = gridView.up('grid');
					    				return gridInstance.getExpressionThresholdColumnRenderer(value, meta, record, row, col, store);
					    			}
								},
								getEditor: function(record) {
									var me = this;
									var gridInstance = me.up('grid');
									return gridInstance.getExpressionThresholdEditor(record, me.ownerCt.dataIdx);
									
								}		
							},{
								text: resourcebundle.ResourceManager.getString("riskThresholds.range",""),
								tooltip: resourcebundle.ResourceManager.getString("riskThresholds.range",""),
								width:80,
								lockable: false,
								renderer: function (value, meta, record, row, col, store, gridView) {
									if(row != -1){
					    				var gridInstance = gridView.up('grid');
					    				return gridInstance.getExpressionRangeColumnRenderer(value, meta, record, row, col, store);
					    			}
								}	
							}]
						}]
			}, {
				text : resourcebundle.ResourceManager.getString("maintainIndicators.settingExpressionsThresholds.expressionFormula",""),
				tooltip: resourcebundle.ResourceManager.getString("maintainIndicators.settingExpressionsThresholds.expressionFormula",""),
				dataIndex : 'expressionFormula',
				//width : '10%',
				renderer:SharedLib.common.CommonFunctions.addToolTip
				
			}
			]
});
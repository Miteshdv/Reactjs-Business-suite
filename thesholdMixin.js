Ext.define('Citi.view.earlywarning.EWCharThresholdColumnsRendererMixin', {

	addThresholdCharExpCheckChange : function(){
		window.onThresholdCharExpCheckChange = function(component){
			var activeTab = Citi.app.getController('SharedLib.controller.RibbonMenuController').getModuleActiveTab();
			var gridInstance = activeTab.down('#'+component.getAttribute('gridId'));
			var selRecord = gridInstance.getStore().getAt(component.getAttribute('rowIndex'));
			
			var rowIndex = component.getAttribute('rowIndex'),
				colIndex = selRecord.get(component.id).columnIndex;
				
			if(selRecord){
				selRecord.get(component.id).checked = component.checked;
				if(!component.checked){
					gridInstance.applyThresholdMinToNextComp(selRecord, component.id, true);
					
					gridInstance.resetValues(selRecord, component.id);
					/*if(gridInstance.itemId != 'setTriggerThresholdViewComp' && component.id == 'scoreColorblack' && selRecord.get('scoreColorred').checked){
						selRecord.get('scoreColorred').thresholdMax = Citi.model.earlywarning.EWCommonReferenceData.thresholdMax;					
					}*/
					//UPDATED FOR EXTJS 6 COMPATIBILITY
					//gridInstance.getView().refreshNode(component.getAttribute('rowIndex'));
					gridInstance.getView().refreshView();
					
				} else {
					gridInstance.getPlugin().startEdit(parseInt(rowIndex), colIndex);
				}
			}
		}	;
	}(),
	
	/**
	 * For Character Expressions
	 * */
	getExpressionThresholdComboEditor : function(record, parentColumn){
		var me = this;
		var itemId = parentColumn  + '-' + record.get(parentColumn).rowIndex + '' + record.get(parentColumn).columnIndex;
		//Need to add scope of active Tab
		var comboField = Ext.ComponentQuery.query('#'+itemId)[0];		
		if(!comboField){
			var fieldConfig = { valueField: 'charCode', displayField: 'charDescription', multiSelect:true, emptyText: "Please Select", itemId : itemId, 
								gridRowRecord : record, gridCellRecord : record.get(parentColumn), parentColumn : parentColumn, gridInstance : me};
			comboField = Ext.create('Citi.view.components.CharCheckCombo', fieldConfig);
		}
		return Ext.create('Ext.grid.CellEditor', {
		        field: comboField
			});
	},
	
	createAssociativeMap : function(expSQLParamArray, cmbBox){
		var getCharDescriptionMap = new Ext.util.HashMap(),
			getCharCodeMap = new Ext.util.HashMap();
			
		Ext.Array.each(expSQLParamArray, function(value, index){
			getCharDescriptionMap.add(index + 1, value);
			getCharCodeMap.add(value, index + 1);
		});
	
		cmbBox.getCharDescriptionMap = getCharDescriptionMap;
		cmbBox.getCharCodeMap = getCharCodeMap;
	},
	
	getPreviousSelectedColor : function(record, parentColumn){
		var me = this,
			maxIndex;
		
		maxIndex = me.ascendingColorsArray.indexOf(parentColumn);
		if(maxIndex == 0){
			return null;
		}
		for(var a = maxIndex - 1; a >= 0; a--){
			if(record.get(me.ascendingColorsArray[a]).checked){
				return record.get(me.ascendingColorsArray[a]);
			}
		}	
		
		return null;
	},
	
	getNextSelectedColor : function(record, parentColumn){
		var me = this,
			minIndex;
		
		minIndex = me.ascendingColorsArray.indexOf(parentColumn);
		if(minIndex == me.ascendingColorsArray.length-1){
			return null;
		}
		for(var a = minIndex + 1; a < me.ascendingColorsArray.length; a++){
			if(record.get(me.ascendingColorsArray[a]).checked){
				return record.get(me.ascendingColorsArray[a]);
			}
		}	
		
		return null;
	},
	
	getCharCodeArrayOfPreviousSelectedColor : function(record, parentColumn){
		var me = this,
			maxIndex,
			charCodeArrayOfPreviousSelectedColor = [],
			thresholdMax = null;
		
		if(me.getPreviousSelectedColor(record, parentColumn)){
			thresholdMax = me.getPreviousSelectedColor(record, parentColumn).thresholdMax;
		}
		
		if(thresholdMax){
			for(var b = 1; b <= thresholdMax; b++){
				charCodeArrayOfPreviousSelectedColor.push(b);
			}
		}
		return charCodeArrayOfPreviousSelectedColor;
		
	},
	
	getCharCodeArrayOfCurrentSelectedColor: function(record, parentColumn){
		var me = this,
			charCodeArrayOfCurrentSelectedColor = [];
		if(record.get(parentColumn).checked && !Ext.isEmpty(record.get(parentColumn).thresholdMin) && !Ext.isEmpty(record.get(parentColumn).thresholdMax)){
			for(var a = record.get(parentColumn).thresholdMin; a <= record.get(parentColumn).thresholdMax; a++){
				charCodeArrayOfCurrentSelectedColor.push(a);
			}
		}
		return charCodeArrayOfCurrentSelectedColor;
	},
	
	getComboStore : function(expSQLParamArray, charCodeArrayOfPreviousSelectedColor, charCodeArrayOfCurrentSelectedColor, cmbBox){
		var me = this,
			comboDataArr = [];
			
		Ext.Array.each(expSQLParamArray, function(value, index){
			var temp = {};
			temp['charDescription'] = value;
			temp['charCode'] = cmbBox.getCharCodeMap.get(value);
			temp['isChecked'] = charCodeArrayOfPreviousSelectedColor.indexOf(temp['charCode']) != -1 || charCodeArrayOfCurrentSelectedColor.indexOf(temp['charCode']) != -1;
			temp['isDisable'] = charCodeArrayOfPreviousSelectedColor.indexOf(temp['charCode']) != -1;
			comboDataArr.push(temp);
		}, me);
		
		return  Ext.create('Ext.data.Store', {
		            fields: ["charDescription","charCode","isChecked","isDisable"],
		            data: comboDataArr
		     });
	},
	
	createAndBindComboStore : function(record, row, col, parentColumn, meta){
		var me = this;
		var expSQLParamArray = [],
			expSQLParamArray = record.get('expressionSQLParameters').split(',');
		
		var cmbBox = me.headerCt.getGridColumns()[col].getEditor(record).field;
		
		/**
		 * Correcting THresholdMin and ThresholdMAx VAlues
		 * ***/
		if(record.get(parentColumn).thresholdMin == -9999 || record.get(parentColumn).thresholdMin == -999999999999 || record.get(parentColumn).thresholdMin == Citi.model.earlywarning.EWCommonReferenceData.thresholdMin){
			record.get(parentColumn).thresholdMin = 1;
		}
		if(record.get(parentColumn).thresholdMax == 9999 || record.get(parentColumn).thresholdMax == 999999999999 || record.get(parentColumn).thresholdMax == Citi.model.earlywarning.EWCommonReferenceData.thresholdMax){
			record.get(parentColumn).thresholdMax = expSQLParamArray.length;
		}
		
		/**
		 * CReate Associative Maps
		 * **/
		me.createAssociativeMap(expSQLParamArray, cmbBox);
		
		var getCharDescriptionMap = cmbBox.getCharDescriptionMap,
			getCharCodeMap = cmbBox.getCharCodeMap;	
		 
		/****
		 * Get the values already selected in previous selected color column and current column
		 * ***/
		var charCodeArrayOfPreviousSelectedColor = [],
			charCodeArrayOfCurrentSelectedColor = [];
		charCodeArrayOfPreviousSelectedColor = me.getCharCodeArrayOfPreviousSelectedColor(record, parentColumn);
		charCodeArrayOfCurrentSelectedColor = me.getCharCodeArrayOfCurrentSelectedColor(record, parentColumn);
		
		cmbBox.bindStore(me.getComboStore(expSQLParamArray, charCodeArrayOfPreviousSelectedColor, charCodeArrayOfCurrentSelectedColor, cmbBox));
		
		/***
		 * Get Char Description ARray 
		 * **/
		var charDescriptionArrayOfCurrentSelectedColor = [];
		Ext.Array.each(charCodeArrayOfCurrentSelectedColor, function(value, index){
			charDescriptionArrayOfCurrentSelectedColor.push(getCharDescriptionMap.get(value));
		}, me);	
		
		cmbBox.setValue(charDescriptionArrayOfCurrentSelectedColor.join(','));
		
		meta.tdAttr= 'data-qtip="'+Ext.String.htmlEncode(charDescriptionArrayOfCurrentSelectedColor.join(','))+'"';
		return charDescriptionArrayOfCurrentSelectedColor.join(','); 
	},
	
	/**
	 * Called from CharCheckCombo
	 * **/
	updateColorThresholds : function(cmbBox, clickedComboRecord, chkBoxValue){
		var me = this,
			selectedRecord = me.getSelectionModel().getLastSelected();
			
		me.updateThresholdsForCurrentColor(cmbBox, clickedComboRecord, chkBoxValue, selectedRecord);
		me.updateThresholdsForSubsequentColors(selectedRecord, cmbBox.parentColumn);
		
	},
	
	updateThresholdsForCurrentColor : function(cmbBox, clickedComboRecord, chkBoxValue, selectedRecord){
		var me = this;
		
		var	checked = true,
			thresholdMin = '',
    		thresholdMax = '',
    		thresholdScore = '',
    		prevRecord = null,
    		comboStore = cmbBox.getStore();
    		
    	if(chkBoxValue){
    		if(!Ext.isEmpty(selectedRecord.get(cmbBox.parentColumn).thresholdMin)){
    			thresholdMin = selectedRecord.get(cmbBox.parentColumn).thresholdMin;	
    		} else {
    			var rec = comboStore.findRecord('isChecked', false, 0, false, true, true);
				thresholdMin = rec.get('charCode');   		
    		}
    		thresholdMax = clickedComboRecord.get('charCode');
    		thresholdScore = clickedComboRecord.get('charCode');
    	} else {
			var currentRecIndex = comboStore.find('charDescription', clickedComboRecord.get('charDescription'), 0, false, true, true);
			if(currentRecIndex != 0){
				prevRecord = comboStore.getAt(currentRecIndex-1);				
			}
			if(currentRecIndex == 0 || (prevRecord && prevRecord.get('isDisable'))){
				checked = false;
				thresholdMin = '';
				thresholdMax = '';
				thresholdScore = '';
			} else {
				thresholdMin = selectedRecord.get(cmbBox.parentColumn).thresholdMin;
    			thresholdMax = prevRecord.get('charCode');
    			thresholdScore = clickedComboRecord.get('charCode');
			}
    	}
    	
    	me.setThresholdValues(selectedRecord, cmbBox.parentColumn, {checked : checked, thresholdMin : thresholdMin, thresholdMax : thresholdMax, thresholdScore : thresholdScore});
    	
	},
	
	updateThresholdsForSubsequentColors : function(record, parentColumn){
		var me = this,
			thresholdMax = record.get(parentColumn).thresholdMax,
			nextSelectedColor = me.getNextSelectedColor(record, parentColumn),
			prevSelectedColor = me.getPreviousSelectedColor(record, parentColumn);
	
		if(Ext.isEmpty(thresholdMax)){
			if(prevSelectedColor){
				thresholdMax = prevSelectedColor.thresholdMax;
			} else {
				thresholdMax = 0;
			}
		}
			
		var minIndex = me.ascendingColorsArray.indexOf(parentColumn);
		if(minIndex == me.ascendingColorsArray.length-1){
			return 
		}
		
		for(var a = minIndex + 1; a < me.ascendingColorsArray.length; a++){
			if(record.get(me.ascendingColorsArray[a]).checked && parseInt(thresholdMax) < parseInt(record.get(me.ascendingColorsArray[a]).thresholdMax)){
				record.get(me.ascendingColorsArray[a]).thresholdMin = thresholdMax + 1;
				break;
			} else {
				me.setThresholdValues(record, me.ascendingColorsArray[a], {checked : false, thresholdMin : '', thresholdMax : '', thresholdScore : ''});
			}
		}
		
	},
	
	setThresholdValues : function(record, colorIndex, valueObj){
		record.get(colorIndex).checked = valueObj.checked;
		record.get(colorIndex).thresholdMin = valueObj.thresholdMin;
		record.get(colorIndex).thresholdMax = valueObj.thresholdMax;
		record.get(colorIndex).thresholdScore = valueObj.thresholdScore;
	}

});
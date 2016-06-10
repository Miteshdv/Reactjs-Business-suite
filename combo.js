//NOTE UPDATED FOR COMPATIBILITY
Ext.define('Citi.view.components.CharCheckCombo',
{
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.charComboCheck',
    multiSelect: true,
    editable : false,
    isEditorComponent : true,
    allSelector: false,
    noData: false,
    noDataText: 'No combo data',
    addAllSelector: false,
    allSelectorHidden: false,
    afterExpandCheck: false,
    comboPicker:'',
    selectionArr:[],
    selectedRecords:[],
    prevSelectionArr:[],
    allText: 'All',
    oldValue: '',
    areRecordsSelected:false,
    ignoreCollapseOnItemClick : false,
    listeners:
    {
/* uncomment if you want to reload store on every combo expand
        beforequery: function(qe)
        {
            this.store.removeAll();
            delete qe.combo.lastQuery;
        },
*/
        focus: function(cpt)
        {
            cpt.oldValue = cpt.getValue();
        },
        keydown: function(cpt, e, eOpts)
        {
            var    value = cpt.getRawValue(),
                oldValue = cpt.oldValue;
            
            if(value != oldValue) cpt.setValue('');
        }
    },
    createPicker: function() 
    {
        var    me = this,
            picker,
            menuCls = Ext.baseCSSPrefix + 'menu',
            opts = Ext.apply(
            {
                pickerField: me,
                xtype: 'boundlist',
                selModel:
                {
                    mode: me.multiSelect ? 'SIMPLE' : 'SINGLE'
                },
                floating: true,
                hidden: true,
                ownerCt: me.ownerCt,
                cls: me.el.up('.' + menuCls) ? menuCls : '',
                store: me.store,
                displayField: me.displayField,
                focusOnToFront: false,
                pageSize: me.pageSize,
             tpl:new Ext.XTemplate(
            		    
            		   '<tpl for=".">',
				             '<div class="x-boundlist-item">',
				                 '<tpl if="this.getDisableValue(values) == true && this.getCheckValue(values)==true">',
					                 '<span>&nbsp;<input type="checkbox" checked="checked"  disabled="disabled"/>&nbsp;</span>',
					                 '{[this.getName(values)]}',     
				             '<tpl else>',				             	
				             	 	'<tpl if="this.getCheckValue(values)==true">',
					             	 	 '<span>&nbsp;<input type="checkbox" checked="checked"/>&nbsp;</span>',
						                 '{[this.getName(values)]}',     
						             '<tpl else>',
						             	'<tpl if="this.getDisableValue(values)==true">',
							             	 '<span>&nbsp;<input type="checkbox" disabled="disabled"/>&nbsp;</span>',
							                 '{[this.getName(values)]}',     
						                 '<tpl else>',
							                 '<span>&nbsp;<input type="checkbox"/>&nbsp;</span>',
							                 '{[this.getName(values)]}',     
							               '</tpl>',	
						              '</tpl>',				             			                				              
				             '</tpl>',
				           '</div>',
				         '</tpl>',
            		    {
            		    	 getName: function(value){
            		             return Ext.String.ellipsis(value[me.displayField],30);
            		          },
            		          
            		          getCheckValue: function(value){
            		        	  return value.isChecked;
            		          },
            		          
							getDisableValue: function(value){
								  return value.isDisable;
							}
            		          
            		    
            		          
            		    }
            		)
            }, me.listConfig, me.defaultListConfig);


        picker = me.picker = Ext.widget(opts);;
        if(me.pageSize) 
        {
            picker.pagingToolbar.on('beforechange', me.onPageChange, me);
        }        


     // We limit the height of the picker to fit in the space above
		// or below this field unless the picker has its own ideas about that.
		if (!picker.initialConfig.maxHeight) {
			picker.on({
				beforeshow: me.onBeforePickerShow,
				scope: me
			});
		}
		picker.getSelectionModel().on({
			beforeselect: me.onBeforeSelect,
			beforedeselect: me.onBeforeDeselect,
			focuschange: me.onFocusChange,
			selectionchange : me.onListSelectionChange,
			scope: me
		});

		picker.getNavigationModel().navigateOnSpace = false;

		return picker;

        me.store.on('load', function(store)
        {
            if(store.getTotalCount() == 0)
            {
                me.allSelectorHidden = true;
                if(me.allSelector != false) me.allSelector.setStyle('display', 'none');
                if(me.noData != false) me.noData.setStyle('display', 'block');
            }
            else
            {
                me.allSelectorHidden = false;
                if(me.allSelector != false) me.allSelector.setStyle('display', 'block');
                if(me.noData != false) me.noData.setStyle('display', 'none');
            }
        });
        
        
        return picker;
    },
   
    
    reset: function()
    {
        var    me = this;


        me.setValue('');
    },
    setValue: function(value)
    {
        this.value = value;
        if(!value)
        {
            if(this.allSelector != false) this.allSelector.removeCls('x-boundlist-selected');
            return this.callParent(arguments);
        }

		
        if(typeof value == 'string') 
        {
            var    me = this,
                records = [],
                vals = value.split(',');


            if(value == '')
            {
                if(me.allSelector != false) me.allSelector.removeCls('x-boundlist-selected');
            }
            else
            {
                if(vals.length == me.store.getCount() && vals.length != 0)
                {
                    if(me.allSelector != false) me.allSelector.addCls('x-boundlist-selected');
                    else me.afterExpandCheck = true;
                }
            }


            Ext.each(vals, function(val)
            {
                var record = me.store.findRecord('charDescription', val, 0, false, true, true);//me.store.getById(parseInt(val));
                if(record) records.push(record);
            });


            return me.setValue(records);
        }
        else return this.callParent(arguments);
    },
    
    getSubmitValue: function()
    {
        return this.getValue();
    },
    expand: function()
    {
        var    me = this,
            bodyEl, ariaDom, picker, doc;


            if(me.rendered && !me.isExpanded && !me.isDestroyed)
            {
            bodyEl = me.bodyEl;
            picker = me.getPicker();
            doc = Ext.getDoc();
			picker.setMaxHeight(picker.initialConfig.maxHeight);

			if (me.matchFieldWidth) {
				picker.setWidth(me.bodyEl.getWidth());
			}


            // show the picker and set isExpanded flag
            picker.show();
            me.isExpanded = true;
            me.alignPicker();
            bodyEl.addCls(me.openCls);


            //if(me.noData == false) me.noData = picker.getEl().down('.x-boundlist-list-ct').insertHtml('beforeBegin', '<div class="x-boundlist-item" role="option">'+me.noDataText+'</div>', true);


            if(me.addAllSelector == true && me.allSelector == false)
            {
                me.allSelector = picker.getEl().down('.x-boundlist-list-ct').insertHtml('beforeBegin', '<div class="x-boundlist-item" role="option"><span class="x-combo-checker">&nbsp;</span> '+me.allText+'</div>', true);
                me.allSelector.on('click', function(e)
                {
                    if(me.allSelector.hasCls('x-boundlist-selected'))
                    {
                        me.allSelector.removeCls('x-boundlist-selected');
                        me.setValue('');
                        me.fireEvent('select', me, []);
                    }
                    else
                    {
                        var records = [];
                        me.store.each(function(record)
                        {
                            records.push(record);
                        });
                        me.allSelector.addCls('x-boundlist-selected');
                        me.select(records);
                        me.fireEvent('select', me, records); 
                    }
                });


                if(me.allSelectorHidden == true) me.allSelector.hide();
                else me.allSelector.show();
                
                if(me.afterExpandCheck == true)
                {
                    me.allSelector.addCls('x-boundlist-selected');
                    me.afterExpandCheck = false;
                }
            }
            
            if (me.ariaRole) {
				ariaDom = me.ariaEl.dom;

				ariaDom.setAttribute('aria-owns', picker.listEl ? picker.listEl.id : picker.el.id);
				ariaDom.setAttribute('aria-expanded', true);
			}

			// Collapse on touch outside this component tree.
			// Because touch platforms do not focus document.body on touch
			// so no focusleave would occur to trigger a collapse.
			me.touchListeners = doc.on({
				// Do not translate on non-touch platforms.
				// mousedown will blur the field.
				translate:false,
				touchstart: me.collapseIf,
				scope: me,
				delegated: false,
				destroyable: true
			});

			// Scrolling of anything which causes this field to move should collapse
			me.scrollListeners = Ext.on({
				scroll: me.onGlobalScroll,
				scope: me,
				destroyable: true
			});


			// Buffer is used to allow any layouts to complete before we align
			Ext.on('resize', me.alignPicker, me, {buffer: 1});
			me.fireEvent('expand', me);
			me.onExpand();
        }
        
    },
    
    
    
   
    
    sortFunction :  function (a,b) {
    	  if (a.data.charCode < b.data.charCode)
    	     return -1;
    	  if (a.data.charCode > b.data.charCode)
    	    return 1;
    	  return 0;
    },
    
    onItemClick : function(boundList, record, item1, index, e, eOpts){
    	var me = this;
    	if(e.target.type == 'checkbox'){
    		me.ignoreCollapseOnItemClick = true;
    		me.collapse();
    		me.ignoreCollapseOnItemClick = false;
    		me.alignPicker();
    		me.gridInstance.updateColorThresholds(me, record, e.target.checked);
    		me.gridInstance.getView().refreshNode(me.gridCellRecord.rowIndex); 
    		me.gridInstance.getPlugin().startEdit(me.gridCellRecord.rowIndex,me.gridCellRecord.columnIndex);
    	}
     	
    },
    
    onBeforeSelect : function(list, record){
    	var me = this;
    	if(!me.ignoreSelection && me.isExpanded){
    		if(record.get('isDisable')){
    			return false;
    		} else {
    			if(record.get('isChecked')){
    				/**Removal from selected records**/
    				record.set('isChecked', false);
    				Ext.Array.splice(me.selectedRecords, me.selectedRecords.length-1, 1);
    				
    				/**Removal from selectionArr**/
    				Ext.Array.splice(me.selectionArr, me.selectionArr.indexOf(record.get('charDescription')), 1);
    				
    			} else {
    				record.set('isChecked', true);
    				if(me.selectedRecords.length > 0){
    					var charData = me.ownerCt.ownerCt.data;
    					var selectedRecords = [];
    					charData.thresholdMax = record.get('charCode');
    					var thresholdMin = charData.thresholdMin, thresholdMax = charData.thresholdMax;
    					/*if(charData.colorOrder == 1){
    						thresholdMin = thresholdMin+1;
    					}*/
            			for(var recIdx = thresholdMin; recIdx <= thresholdMax  ; recIdx++){
                			selectedRecords.push(me.getStore().getAt(recIdx-1));
                		}
            			me.selectedRecords = selectedRecords;
    				} else {
    					var selectedRecords = [];   
        				var startIndex = me.store.find('charDescription', me.selectionArr[me.selectionArr.length - 2], 0, false, true, true);
            			for(var recIdx = startIndex+1; recIdx < record.get('charCode'); recIdx++){
                			selectedRecords.push(me.getStore().getAt(recIdx));
                		}
            			me.selectedRecords = selectedRecords;
    				}
    			}
    		}
    	}
    },
    
    onBeforeDeselect : function(list, record){
    	var me = this;
    	//var charData = me.ownerCt.ownerCt.data;
    	if(!me.ignoreSelection && me.isExpanded){
    		if(record.get('isDisable')){
    			return false;
    		} else {
    			record.set('isChecked', false);
    			Ext.Array.splice(me.selectedRecords, me.selectedRecords.length-1, 1);
    			if(me.selectionArr.indexOf(record.get('charDescription')) != -1){
    				Ext.Array.splice(me.selectionArr, me.selectionArr.indexOf(record.get('charDescription')), 1);
    			}
    			/*if(me.selectedRecords.length > 0){
    				Ext.Array.splice(me.selectionArr, me.selectionArr.indexOf(record.get('charDescription')), 1);
    			}*/
    		}
    	}
    },
    onListSelectionChange: function(list, selectedRecords)
    {
        	var me = this,
        	isMulti = me.multiSelect,
            hasRecords = selectedRecords.length > 0;
            
        // Only react to selection if it is not called from setValue, and if our list is
        // expanded (ignores changes to the selection model triggered elsewhere)
        if(!me.ignoreSelection && me.isExpanded)
        {
            if(!isMulti)
            {
                Ext.defer(me.collapse, 1, me);
            }
            
            if(isMulti || hasRecords)
            {
                me.setValue(selectedRecords, false);
            }
            
            if(hasRecords)
            {
            	me.fireEvent('select', me, selectedRecords);
            }
            me.inputEl.focus();

            
            if(me.addAllSelector == true && me.allSelector != false)
            {
                if(selectedRecords.length == me.store.getTotalCount()) me.allSelector.addCls('x-boundlist-selected');
                else me.allSelector.removeCls('x-boundlist-selected'); 
            } 
        }
    }
});
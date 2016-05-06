import React from 'react';
import ReactDOM from 'react-dom';
const Immutable = require('immutable'),
  _ = require('lodash');

var TreeMenu = require('react-tree-menu').TreeMenu,
    TreeNode = require('react-tree-menu').TreeNode;


class ProductCommodityTreeView extends React.Component { 



   
    _handleDynamicObjectTreeNodePropChange(messageWindowKey, stateKey, propName, lineage) {

    this._setLastActionState(propName, messageWindowKey, lineage);

    //Get a node path that includes children, given a key
    function getNodePath(nodeKey) {

      if (nodeKey.length === 1) return nodeKey;

      return _(nodeKey).zip(nodeKey.map(function () {
        return "children";
      })).flatten().initial().value();

    }

    var oldState = Immutable.fromJS(this.state[stateKey]);
    var nodePath = getNodePath(lineage),
      keyPaths = [nodePath.concat([propName])];

    //Build a list of key paths for all children
    function addChildKeys(state, parentPath) {

      var childrenPath = parentPath.concat('children'),
        children = state.getIn(childrenPath);

      if (!children || children.size === 0) return;

      children.map(function (value, key) {
        keyPaths.push(childrenPath.concat([key, propName]))
        addChildKeys(state, childrenPath.concat([key]));
      });
    }

    addChildKeys(oldState, nodePath);

    //Get the new prop state
    var newPropState = !oldState.getIn(keyPaths[0]);

    //Now create a new map w/ all the changes
    var newState = oldState.withMutations(function(state) {
      keyPaths.forEach(function (keyPath) {
        state.setIn(keyPath, newPropState);
      })
    });

    var mutation = {};

    mutation[stateKey] = newState.toJS();

    this.setState(mutation);

  }

  _setLastActionState(action, col, node) {

    var toggleEvents = ["collapsed", "checked", "selected"];

    if (toggleEvents.indexOf(action) >= 0) {
      action += "Changed";
    }

    console.log("Controller View received tree menu " + action + " action: " + node.join(" > "));

    var key = "lastAction" + col;

    var mutation = {};
    mutation[key] = {
      event: action,
      node: node.join(" > "),
      time: new Date().getTime()
    };

    this.setState(mutation)
  }

  componentDidMount()
  {  
    this.props.loadTreeData();
  }
   
    render(){
        return (
                <TreeMenu
                ref={(ref) => this.productCommodityTreeView = ref}   
                expandIconClass="fa fa-chevron-right"
                collapseIconClass="fa fa-chevron-down"
                onTreeNodeClick={this._setLastActionState.bind(this, "clicked", "5")}
                onTreeNodeCollapseChange={this._handleDynamicObjectTreeNodePropChange.bind(this, 5, "dynamicTreeDataMap","collapsed")}
                onTreeNodeCheckChange={this._handleDynamicObjectTreeNodePropChange.bind(this, 5, "dynamicTreeDataMap","checked")}
                data={this.props.treeData} />
        );
    }

}


ProductCommodityTreeView.propTypes = {  
  loadTreeData: React.PropTypes.func,
  treeData:React.PropTypes.array
}



export default ProductCommodityTreeView



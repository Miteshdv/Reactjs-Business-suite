import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.jsx'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import configureStore from './store/configureStore.js'
import GridDataReducer from './reducers/GridDataReducer'
const treeCss = require('./assets/styles/tree-view.css')
const productListCss = require('./assets/styles/ProductList.css')
const reactGridLayoutStyles = require('./assets/styles/ReactGridLayoutStyles.css')
const flexHelper = require('./assets/styles/flex-helper.css')
const AppCss = require('./assets/styles/App.css')
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const store =configureStore()


ReactDOM.render( <Provider store={store}><App /></Provider>, document.getElementById('root'))

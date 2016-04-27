import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.jsx'
const treeCss = require('./assets/styles/tree-view.css')
const productListCss = require('./assets/styles/ProductList.css')

ReactDOM.render( <App />, document.getElementById('root'))

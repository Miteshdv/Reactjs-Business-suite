import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import AppContainer from './containers/AppContainer.js'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import configureStore from './store/configureStore.js'
import AppRootReducer from './reducers/AppRootReducer.js'
const treeCss = require('./assets/styles/tree-view.css')
const AppCss = require('./assets/styles/App.css')
const bootstrap = require('./assets/styles/bootstrap.css')

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const store =configureStore()


ReactDOM.render( <Provider store={store}><AppContainer /></Provider>, document.getElementById('root'))

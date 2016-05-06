import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import  AppRootReducer from '../reducers/AppRootReducer'

export default function configureStore(initialState) {
  const store = createStore(
    AppRootReducer,
    initialState,
    applyMiddleware(thunkMiddleware, createLogger())
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/AppRootReducer.js', () => {
      const nextRootReducer = require('../reducers/AppRootReducer.js').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

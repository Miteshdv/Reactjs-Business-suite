import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import gridDataReducer from '../reducers/GridDataReducer'

export default function configureStore(initialState) {
  const store = createStore(
    gridDataReducer,
    initialState,
    applyMiddleware(thunkMiddleware, createLogger())
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/GridDataReducer.js', () => {
      const nextRootReducer = require('../reducers/GridDataReducer.js').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

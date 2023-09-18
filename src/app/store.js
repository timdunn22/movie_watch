import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import { createBrowserHistory} from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
// import createRootReducer from './reducers'

export const history = createBrowserHistory()

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
})
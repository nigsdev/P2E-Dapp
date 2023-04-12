import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { reducer as reduxFormReducer } from 'redux-form'
import {
  themeReducer,
  rtlReducer,
  rootReducer,
  walletReducer,
  transactionReducer,
  casinoReducer,
} from '../../redux/reducers/index'

const reducer = combineReducers({
  form: reduxFormReducer, // mounted under "form",
  theme: themeReducer,
  rtl: rtlReducer,
  root: rootReducer,
  walletState: walletReducer,
  transaction: transactionReducer,
  casino: casinoReducer,
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store

import { createStore as _createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from './modules/reducer';

export default function createStore() {
  return _createStore(reducer, applyMiddleware(thunk));
}

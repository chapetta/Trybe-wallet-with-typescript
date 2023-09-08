import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import { walletReducer } from './reducer/walletReducer';

const store = createStore(walletReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;

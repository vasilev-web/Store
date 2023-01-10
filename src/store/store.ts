import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import calculateReducer from '@store/calculateReducer';

const rootReducer = combineReducers({
    calculateReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;

export type RootState = ReturnType<typeof rootReducer>;

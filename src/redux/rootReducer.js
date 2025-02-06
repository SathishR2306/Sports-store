
import { combineReducers } from 'redux';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
    store: cartReducer,
    
});

export default rootReducer;

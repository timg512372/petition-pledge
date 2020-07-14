import { combineReducers } from 'redux';
import auth from './auth_reducer';
import petition from './petition_reducer';

export default combineReducers({
    auth,
    petition,
});

import { combineReducers } from 'redux';
import auth from './auth_reducer';
import petition from './petition_reducer';
import tag from './tag_reducer';
import status from './status_reducer';
import user from './user_reducer';

export default combineReducers({
    auth,
    petition,
    tag,
    status,
    user,
});

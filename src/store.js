import { combineReducers, legacy_createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
    addFilesReducer,
    filesListsReducer,
    detailFilesReducer,
    updateFilesReducer,
    deleteFilesReducer,
    userFilesReducer
} from './reducer/fileReducer';

import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
} from './reducer/userReducers';


const reducer = combineReducers({
    fileLists: filesListsReducer,
    userFilesList: userFilesReducer,
    addFile: addFilesReducer,
    detailFile: detailFilesReducer,
    updateFile: updateFilesReducer,
    deleteFile: deleteFilesReducer,

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
})

const middleware = [thunk]

const store = legacy_createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;
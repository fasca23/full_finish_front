export const userFilesReducer = (state = { file: [] }, action) => {
    switch (action.type) {
        case 'GET_USER_FILES_REQUEST':
            return { loading: true }
        case 'GET_USER_FILES_SUCCESS':
            return { loading: false, success: true, files: action.payload }
        case 'GET_USER_FILES_FAIL':
            return { loading: false, error: action.payload }
        default: return state;
    }
}

export const filesListsReducer = (state = { files: [] }, action) => {
    switch (action.type) {
        case 'GET_FILES_REQUEST':
            return { loading: true, success: false, files: [] }
        case 'GET_FILES_SUCCESS':
            return { loading: true, success: false, files: action.payload }
        case 'GET_FILES_FAIL':
            return { loading: false, success: false, error: action.payload }
        default: return state;
    }
}

export const addFilesReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_FILES_REQUEST':
            return { loading: true, success: false }
        case 'ADD_FILES_SUCCESS':
            return { loading: false, success: true, ...state, file: action.payload }
        case 'ADD_FILES_FAIL':
            return { loading: false, success: false, error: action.payload }
        case 'ADD_FILES_RESET':
            return {}
        default: return state;
    }
}

export const detailFilesReducer = (state = { file: {} }, action) => {
    switch (action.type) {
        case 'DETAIL_FILES_REQUEST':
            return { loading: true }
        case 'DETAIL_FILES_SUCCESS':
            return { loading: false, success: true, file: action.payload }
        case 'DETAIL_FILES_FAIL':
            return { loading: false, error: action.payload }
        default: return state;
    }
}

export const updateFilesReducer = (state = { file: {} }, action) => {
    switch (action.type) {
        case 'UPDATE_FILES_REQUEST':
            return { loading: true, success: false }
        case 'UPDATE_FILES_SUCCESS':
            return { loading: false, success: true, ...state, file: action.payload }
        case 'UPDATE_FILES_FAIL':
            return { loading: false, success: false, error: action.payload }
        case 'UPDATE_FILES_RESET':
            return {}
        default: return state;
    }
}

export const deleteFilesReducer = (state = {}, action) => {
    switch (action.type) {
        case 'DELETE_FILES_REQUEST':
            return { loading: true, success: false }
        case 'DELETE_FILES_SUCCESS':
            return { loading: false, success: true }
        case 'DELETE_FILES_FAIL':
            return { loading: false, success: false, error: action.payload }
        default: return state;
    }
}
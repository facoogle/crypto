const initialState = {
    token: 0,
    gas: 0,
    contract: 0,
    loading: false,
    error: false,
    errorMessage: ''
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_USER_DATA':
            return {
                ...state,
                loading: true
            }
        case 'RECEIVE_USER_DATA':
            return {
                ...state,
                token: action.payload.token,
                gas: action.payload.gas,
                contract: action.payload.contract,
                loading: false
            }
        case 'RECEIVE_USER_ERROR':
            return {
                ...state,
                error: true,
                errorMessage: action.payload.errorMessage,
                loading: false
            }
       case 'SUCCESS_GET_DELIVERY':
            state.gas = state.gas - action.payload.progressLess;
            state.contract = state.contract - action.payload.progressLess;
            state.token = state.token + action.payload.tokensWin;
            return {    
                ...state,
                loading: false
            }
        case 'FAIL_DELIVERY':
            state.gas = state.gas - action.payload.progressless;
            state.contract = state.contract - action.payload.progressless;
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}

export default userReducer;
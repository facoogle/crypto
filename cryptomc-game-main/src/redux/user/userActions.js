//DATA
    let DataUser = {
        token: 0,
        gas: 10,
        contract: 10
    }


const fetchUserRequest = () => {
    return {
        type: 'REQUEST_USER_DATA',
    }
}

const fetchUserSuccess = (payload) => {
    return {
        type: 'RECEIVE_USER_DATA',
        payload: payload
    }
}


const fetchUserError = (payload) => {
    return {
        type: 'RECEIVE_USER_ERROR',
        payload: payload
    }
}

const fetchSuccessDelivery = (payload) => {
    return {
        type: 'SUCCESS_GET_DELIVERY',
        payload: payload
    }
}

const fetchFailDelivery = (payload) => {
    return {
        type: 'FAIL_DELIVERY',
        payload: payload
    }
}

export const fetchUser = () => {
    return async (dispatch) => {
        dispatch(fetchUserRequest());
        try{
        setTimeout(() => {
            dispatch(fetchUserSuccess(DataUser));
        }, 1000);
        }catch(err){
            dispatch(fetchUserError(err));
            console.log("error",err);
        }
    }
}

export const fetchDeliverySuccess = (progressLess, tokensWin)=>{
    return async (dispatch) => {
        console.log("progressLess",progressLess);
        console.log("tokensWin",tokensWin);
        DataUser.gas = DataUser.gas - progressLess;
        DataUser.contract = DataUser.contract - progressLess;
        DataUser.token = DataUser.token + tokensWin;
        dispatch(fetchSuccessDelivery({progressLess, tokensWin}));
        dispatch(fetchUser());
    }
}

export const fetchDeliveryFail = ({progressLess})=>{
    return async (dispatch) => {
        dispatch(fetchFailDelivery({progressLess}));
        dispatch(fetchUser());
    }
}



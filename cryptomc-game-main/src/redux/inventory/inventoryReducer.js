let initialState = {
    burgers: [],
    bykes: [],
    loading: false,
    error: false,
    errorMessage: ''
}

const inventoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_INVENTORY_DATA':
            return {
                ...state,
                loading: true
            }
        case 'RECEIVE_INVENTORY_DATA':
            return {
                ...state,
                burgers: action.payload.burgers,
                bykes: action.payload.bykes,
                loading: false
            }
        case 'RECEIVE_INVENTORY_ERROR':
            return {
                ...state,
                error: true,
                errorMessage: action.payload.errorMessage,
                loading: false
            }
        case 'SUCCESS_DELIVERY':
            return {
                ...state,
                burgers: action.payload.burgers,
                bykes: action.payload.bykes,
                loading: false
            }
        case 'RESET_TIMER':
            const resetedBurger = action.payload.burger;
            const resetedByke = action.payload.byke;
            if(resetedBurger){
                for(let i = 0; i < state.burgers.length; i++) {
                    if(resetedBurger === state.burgers[i]){
                        state.burgers[i].eventTime = 0;
                    }
                }
            }
            if(resetedByke){
                for(let i = 0; i < state.bykes.length; i++) {
                    if(resetedByke === state.bykes[i]){
                        state.bykes[i].eventTime = 0;
                    }
                }
            }
            return {
                ...state,
                loading: false
            }
        default:
            return state;
           
    }
}

export default inventoryReducer;
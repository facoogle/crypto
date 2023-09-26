import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userReducer";
import inventoryReducer from "./inventory/inventoryReducer";

const store = configureStore({
    reducer: {
        user: userReducer,
        inventory: inventoryReducer
    }

});


export default store;
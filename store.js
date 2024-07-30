import { configureStore } from "@reactjs/toolkit"
import navReducer from "./slices/navSlice"

export const store = configureStore({
    reducer: {
        nav: navReducer,
    }
})
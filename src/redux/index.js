import { createStore } from "redux"
import rootReducer from "./reducers"

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS__&& window.__REDUX__DEVTOOLS_EXTENSION__()
);

export  default  store;
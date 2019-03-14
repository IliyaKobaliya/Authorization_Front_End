import React, {Component} from 'react';
import RouterApp from "./routes"
import {Provider} from "react-redux"
import store from '../redux'


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <RouterApp/>
            </Provider>
        );
    }
}

export default App;

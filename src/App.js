import React from 'react';
import Index from './App/Index.jsx';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom'

import { createStore } from 'redux';
import { Provider } from 'react-redux';


const reducer = (state = "home", action) => {
    switch (action.type){
        case "menu" : 
                state = action.data
            break;
        default :
            break;
    }
    return state
}

const store = createStore(reducer);

export default function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <CookiesProvider>
                    <Index />
                </CookiesProvider>
            </BrowserRouter>
        </Provider>
    );
}
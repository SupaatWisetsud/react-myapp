import React from 'react';
import Index from './App/Index.jsx';
import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
// import Cookies from 'universal-cookie';


// const cookies = new Cookies();

const menuReducer = (state = "home", action) => {
    switch (action.type){
        case "menu" : 
                state = action.data
            break;
        default :
            break;
    }
    return state
}

const basketReducer = (state = [], action) => {
    switch (action.type){
        case "add" : 
                
                let check = false;
                            
                state.forEach(n => {
                    if(n._id === action.data._id){
                        check = true;
                    }
                });

                if(check){
                    
                }else{
                    let obj = Object.assign(action.data, {count : 1});
                    return state.concat([obj]);
                }
                
            break;
        default :
            break;
    }
    return state
}

const store = createStore(combineReducers({menuReducer, basketReducer}));

export default function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Index />
            </BrowserRouter>
        </Provider>
    );
}
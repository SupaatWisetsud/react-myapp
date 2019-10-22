import React from 'react';
import Index from './App/Index.jsx';
import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

const menuReducer = (state = "home", action) => {
    switch (action.type){
        case "menu" : 
                state = action.payload
            break;
        default :
            break;
    }
    return state
}

const basketReducer = (state = [], action) => {
    switch (action.type){
        case "add" : 
                
                let checkadd = false;
                
                let x = [].concat(state);

                x.forEach(n => {
                    if(n._id === action.payload._id){
                        checkadd = true;
                    }
                });

                if(checkadd){
                    for(const n of x){
                        if(n._id ===  action.payload._id){
                            let i = Number.parseInt(n.count);
                            i += 1;
                            n.count = i;
                        }
                    }
                }else{
                    let obj = Object.assign(action.payload, {count : 1});
                    x.push(obj);
                }
                state = x;
                
            break;
        case "down" :
                let checkdown = false;
                let d = [].concat(state);

                for(const n of d){
                    if(n._id === action.payload._id){
                        let i = Number.parseInt(n.count);
                        if(i > 1){
                            i -= 1;
                            n.count = i;
                        }else{
                            checkdown = true;
                        }
                    }
                }
                if(checkdown){
                    d = d.filter( n => n._id !== action.payload._id);
                }
                state = d;
            break;
        case "delete" :
                state = state.filter( n => n._id !== action.payload._id);
            break;
        case "destroy" :
                state = action.payload;
            break;
        case "reset" :
                state = action.payload
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
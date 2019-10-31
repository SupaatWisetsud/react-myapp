import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import './index.scss';
import * as serviceWorker from './serviceWorker';

import { menuReducer, basketReducer } from './reducer';

import viewRoot from './Layout';
import {Login, Logout, NotFoundPage} from './components';

const store = createStore(combineReducers({menuReducer, basketReducer}));

ReactDOM.render(<Provider store={store}>
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/" component={viewRoot} />
                            <Route path="/login" component={Login} />
                            <Route path="/logout" component={Logout} />
                            <Route component={NotFoundPage} />
                        </Switch>
                    </BrowserRouter>
                </Provider>, 
                document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

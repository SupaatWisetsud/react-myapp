import React from 'react';
import { Route, Switch } from 'react-router-dom'

import Main from './Main.jsx';
import Login from './Login.jsx';
import Logout from './Logout.jsx';
import Chart from './Chart.jsx';

export default function Index(props) {

    const NotFoundPage = () => {
        return (
            <div className="error-page">
                <div>
                    <h1>404</h1>
                    <p>NOT FOUND</p>
                </div>
            </div>
        )
    }
    
    return (
        <div className="app">
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/logout" component={Logout} />
                <Route path="/chart" component={Chart} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    );
}


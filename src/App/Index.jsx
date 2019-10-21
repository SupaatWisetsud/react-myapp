import React from 'react';
import { Route, Switch } from 'react-router-dom'

import Main from './Main.jsx';
import Login from './Login.jsx';
import Logout from './Logout.jsx';

export default function Index(props) {

    const Project = () => <h1>Project</h1>
    const NotFoundPage = () => <h1>404</h1>
    
    return (
        <div className="app">
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/logout" component={Logout} />
                <Route path="/projects" component={Project} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    );
}


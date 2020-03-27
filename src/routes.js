import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';
import React from 'react';

import Register from './scenes/Register';
import Login from './scenes/Login';

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/register" component={Register}/>
            </Switch>
        </BrowserRouter>
    )
}
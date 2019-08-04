import React from 'react';
import ReactDOM from 'react-dom';
import { Route} from 'react-router-dom'

import './index.css';
import * as serviceWorker from './serviceWorker';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

import '../node_modules/semantic-ui-css/semantic.min.css';
import IssueRouter from './containers/IssueRouter';

ReactDOM.render(
    <IssueRouter>
        <Route exact path="/" component={IssueRouter}/>
    </IssueRouter>

    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

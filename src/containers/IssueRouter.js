import React, {Component} from 'react'
import IssueService from "../services/IssueService";
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import {Redirect} from 'react-router-dom';

import IssueViewer from './IssueViewer';
import ReactIssueTracker from './ReactIssueTracker'

export default class IssueRouter extends Component {

    //initialize constructor
    constructor(props) {
        super(props);
        this.issueService = new IssueService();
        this.state = {
            issues: [],
        }
        this.loadIssues();
    }

    //fetch issues using service
    async loadIssues() {
        let response = await this.issueService.fetchIssues();
        this.setState({issues: response})
    }

    //clean up subscription from promise
    abortController = new window.AbortController();

    render() {
        return (
            <div>
                {/*Definition of Routes and Switching based on url pattern*/}
                {this.state.issues.length > 0 ?
                    <Router>
                        <Switch>
                            <Route exact path="/issues"
                                   render={() =>
                                       <ReactIssueTracker issues={this.state.issues}/>
                                   }/>
                            <Route exact path="/issues/:issueId"
                                   render={(props) =>
                                       <IssueViewer
                                           {...props}/>
                                   }/>
                            <Route render={() => <Redirect to="/issues" issues={this.state.issues}/>}/>
                        </Switch>
                    </Router> : <div>Fetching Issues</div>}
            </div>
        )
    }

    componentWillUnmount() {
        this.abortController.abort();
    }
}
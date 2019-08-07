import React, {Component} from 'react'
import SemanticTable from '../components/SemanticTable'
export default class ReactIssueTracker extends Component {

    //Initialize constructor and issue Service.
    constructor(props) {
        super(props);
        this.state = {
            issues: this.props.issues
        }
    }

    //clean up subscription from promise
    abortController = new window.AbortController();

    render() {
        return (
            (this.state.issues.length > 0) ?
                <div className="m-3">
                    <div className="text-center m-3">
                        <i className="fa fa-2x fa-exclamation-circle text-warning"></i>
                        <span className="issue_text"> {this.state.issues.length} Issues </span>
                    </div>
                    <div className="container pl-4">
                        {/*Table View starts*/}
                            <SemanticTable issues={this.state.issues}/>
                        {/*Table View ends*/}
                    </div>
                </div> : <div>Loading Issues please wait</div>
        )
    }

    componentWillUnmount() {
        this.abortController.abort();
    }
}
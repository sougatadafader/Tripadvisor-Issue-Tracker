import React, {Component} from 'react'
import IssueService from "../services/IssueService";

export default class IssueViewer extends Component{

    constructor(props) {
        super(props);
        this.issueService =  new IssueService();
        const issueId = this.props.match.params.issueId;

        this.state = {
            comments : []
        }
        this.loadComments(issueId);
        console.log(this.props)
    }

    async loadComments (issueId){
        console.log("the issue is" + issueId)
        let response = await this.issueService.fetchComments(issueId);
        this.setState({comments:response})
    }

    render() {
        return(
            <div className="container">
                Hello from Issue Viewer {this.state.comments.length}
                <div className="row">
                    <div className="col">
                        1 of 3
                    </div>
                    <div className="col-6">
                        2 of 3 (wider)
                    </div>
                    <div className="col">
                        3 of 3
                    </div>
                </div>
            </div>

        )
    }
}

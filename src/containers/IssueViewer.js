import React, {Component} from 'react'
import IssueService from "../services/IssueService";
import UtilityService from "../services/UtilityService"
import IssueBody from '../components/IssueBody'
import UserComments from '../components/UserComments'

export default class IssueViewer extends Component {

    //Initialize constructor and issue and utility Service.
    constructor(props) {
        super(props);
        this.issueService = new IssueService();
        this.utilityservice = new UtilityService();
        const issueId = this.props.match.params.issueId;
        this.state = {
            issue: {},
            comments: []
        }
        this.loadComments(issueId);
    }

    //fetch comments using the service APIs.
    async loadComments(issueId) {
        let issueResp = await this.issueService.fetchIssue(issueId);
        let commentResp = await this.issueService.fetchComments(issueId);
        this.setState({issue: issueResp, comments: commentResp})
    }

    //clean up subscription from promise
    abortController = new window.AbortController();

    render() {
        return (
            <div className="container mt-4">
                {(this.state.issue !== {}) ?
                    <div className="row">
                        <div className="col">
                        </div>
                        <div className="col-8">
                            <h1>{this.state.issue.title}</h1>
                            <div className="row">
                                {this.state.issue.state === "open" ?
                                    <span className="ml-4">< i
                                        className="fa fa-2x fa-exclamation-circle bright_green"></i>
                                        <span className="font-weight-bold bright_green">Open</span>
                                        <span className="font-weight-bold"> {this.state.issue.user.login} </span>
                                        opened this issue on {new Date(this.state.issue.created_at).toDateString()},
                                        {this.utilityservice.dateFormatter(this.state.issue.created_at)}
                                    </span>
                                    : this.state.issue.state === "closed" ?
                                        <span>< i className="fa fa-2x fa-exclamation-circle text-danger"></i>
                                        Closed</span> : null
                                }
                                {/*Body Section for the Issue*/}
                                {this.state.issue.user !== undefined ?
                                    <IssueBody issue={this.state.issue}/>
                                    : null
                                }
                                {/*Comments section*/}
                                {this.state.comments.length > 0 ?
                                    <UserComments comments={this.state.comments}/> :
                                    <div className="full_width"><h4 className="mt-5 text-center">No comments yet</h4>
                                    </div>}
                            </div>
                            <hr/>
                        </div>
                        <div className="col">
                        </div>
                    </div> : <div>Issue not found</div>}
            </div>

        )
    }

    componentWillUnmount() {
        this.abortController.abort();
    }
}

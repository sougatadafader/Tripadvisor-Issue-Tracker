import React, {Component} from 'react'
import IssueService from "../services/IssueService";
import UtilityService from "../services/UtilityService"

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
                                    <span className="ml-4">< i className="fa fa-2x fa-exclamation-circle"
                                                               style={{color: '#82c91e'}}></i>
                                        <span className="font-weight-bold" style={{color: '#82c91e'}}>Open</span>
                                        <span className="font-weight-bold"> {this.state.issue.user.login} </span>
                                        opened this issue on {new Date(this.state.issue.created_at).toDateString()}, {this.utilityservice.dateFormatter(this.state.issue.created_at)}
                                    </span>
                                    : this.state.issue.state === "closed" ?
                                        <span>< i className="fa fa-2x fa-exclamation-circle text-danger"></i>
                                        Closed</span> : null
                                }
                                {/*Body Section for the Issue*/}
                                {this.state.issue.user !== undefined ?
                                    <div className="mt-4">


                                        <div className="media text-muted pt-3">
                                            <a href={this.state.issue['user']['url']}><img
                                                alt="32x32" className="mr-2 rounded" style={{width: 40, height: 40}}
                                                src={this.state.issue['user']['avatar_url']}
                                                data-holder-rendered="true"/></a>
                                            <div
                                                className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                                                <a href={this.state.issue['user']['html_url']}>
                                                    <strong
                                                        className="d-block text-gray-dark">{this.state.issue['user']['login']}</strong></a>
                                                <div
                                                    style={{fontSize: 8}}>{new Date(this.state.issue.created_at).toDateString()}, {this.utilityservice.dateFormatter(this.state.issue.created_at)}</div>
                                                {this.state.issue['body']}
                                            </div>
                                        </div>
                                    </div>
                                    : null
                                }
                                {/*Comments section*/}
                                {this.state.comments.length > 0 ?
                                    <div className="mt-4">
                                        {this.state.comments.map((comment, id) =>
                                            <div className="media text-muted pt-3" key={id}>
                                                <a href={comment['user']['url']}><img
                                                    alt="32x32" className="mr-2 rounded" style={{width: 40, height: 40}}
                                                    src={comment['user']['avatar_url']}
                                                    data-holder-rendered="true"/></a>
                                                <div
                                                    className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                                                    <a href={comment['user']['html_url']}>
                                                        <strong
                                                            className="d-block text-gray-dark">{comment['user']['login']}</strong></a>
                                                    <div
                                                        style={{fontSize: 8}}>{new Date(comment.created_at).toDateString()}, {this.utilityservice.dateFormatter(comment.created_at)}</div>
                                                    {comment['body']}
                                                </div>
                                            </div>)
                                        }
                                    </div> :
                                    <div style={{width: '100%'}}><h4 className="mt-5 text-center">No comments yet</h4>
                                    </div>
                                }
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

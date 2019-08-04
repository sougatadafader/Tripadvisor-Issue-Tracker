import React, {Component} from 'react'
import IssueService from "../services/IssueService";

export default class IssueViewer extends Component {

    constructor(props) {
        super(props);
        this.issueService = new IssueService();
        const issueId = this.props.match.params.issueId;

        this.state = {
            issue: {},
            comments: []
        }
        this.loadComments(issueId);
    }

    async loadComments(issueId) {
        console.log("the issue is" + issueId)
        let issueResp = await this.issueService.fetchIssue(issueId);
        let commentResp = await this.issueService.fetchComments(issueId);
        this.setState({issue: issueResp, comments: commentResp})
    }

    render() {
        console.log(this.state.issue)
        return (
            <div className="container mt-4">
                {(this.state.issue.length !== {} )?
                    <div className="row">
                        <div className="col">
                        </div>
                        <div className="col-8">
                            <h1>{this.state.issue.title}</h1>
                            <div className="row">
                                {this.state.issue.state === "open" ?
                                    <span className="ml-4">< i className="fa fa-2x fa-exclamation-circle" style={{color: '#82c91e'}}></i>
                                        <span className="font-weight-bold" style={{color: '#82c91e'}}>Open</span>
                                        <span className="font-weight-bold"> {this.state.issue.user.login} </span>
                                        opened this issue on {new Date(this.state.issue.created_at).toLocaleDateString()}
                                    </span>
                                    :this.state.issue.state === "closed"?
                                    <span>< i className="fa fa-2x fa-exclamation-circle text-danger"></i>
                                        Closed</span>:null
                                }
                                {this.state.comments.length > 0 ?
                                    <div className="mt-4">
                                        {this.state.comments.map((comment, id) =>
                                            <div className="media text-muted pt-3">
                                                <a href={comment['user']['url']}><img
                                                    data-src="holder.js/32x32?theme=thumb&amp;bg=007bff&amp;fg=007bff&amp;size=1"
                                                    alt="32x32" className="mr-2 rounded" style={{width: 32, height: 32}}
                                                    src={comment['user']['avatar_url']}
                                                    data-holder-rendered="true"/></a>
                                                <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                                                    <a href={comment['user']['html_url']}>
                                                        <strong
                                                            className="d-block text-gray-dark">{comment['user']['login']}</strong></a>
                                                    {this.state.comments[0]['body']}
                                                </p>
                                            </div>)
                                        }
                                    </div>:<h4 className="mt-5">No comments yet</h4>
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
}

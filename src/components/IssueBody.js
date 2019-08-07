import React, {Component} from 'react'
import UtilityService from "../services/UtilityService";

export default class IssueBody extends Component {
    constructor(props) {
        super(props);
        this.utilityservice = new UtilityService();

        this.state = {
            issue: this.props.issue
        }
    }

    render() {
        return (
            <div className="mt-4 ">
                <div className="media text-muted pt-3">
                    <a href={this.state.issue['user']['html_url']}><img
                        alt="32x32" className="mr-2 rounded square_4040"
                        src={this.state.issue['user']['avatar_url']}
                        data-holder-rendered="true"/></a>
                    <div
                        className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                        <a href={this.state.issue['user']['html_url']}>
                            <strong
                                className="d-block text-gray-dark">
                                {this.state.issue['user']['login']}</strong></a>
                        <div
                            className="pt8">
                            {new Date(this.state.issue.created_at).toDateString()}, {this.utilityservice.dateFormatter(this.state.issue.created_at)}</div>
                        {this.state.issue['body']}
                    </div>
                </div>
            </div>
        )
    }
}
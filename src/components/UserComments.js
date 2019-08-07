import React, {Component} from 'react'
import UtilityService from "../services/UtilityService";

export default class UserComments extends Component {
    constructor(props) {
        super(props);
        this.utilityservice = new UtilityService();

        this.state = {
            comments: this.props.comments
        }
    }

    render() {
        return (
            <div className="mt-4">
                {this.state.comments.map((comment) =>
                    <div className="media text-muted pt-3" key={comment.id}>
                        <a href={comment['user']['url']}><img
                            alt="32x32" className="mr-2 rounded square_4040"
                            src={comment['user']['avatar_url']}
                            data-holder-rendered="true"/></a>
                        <div
                            className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                            <a href={comment['user']['html_url']}>
                                <strong
                                    className="d-block text-gray-dark">{comment['user']['login']}</strong></a>
                            <div
                                className="pt8">{new Date(comment.created_at).toDateString()}, {this.utilityservice.dateFormatter(comment.created_at)}</div>
                            {comment['body']}
                        </div>
                    </div>)
                }
            </div>
        )
    }
}





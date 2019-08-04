import React, {Component} from 'react'
import IssueService from "../services/IssueService"

export default class ReactIssueTracker extends Component{

    //Initialize constructor and issue Service.
    constructor(props){
        super(props);
        this.issueService =  new IssueService();

        this.state = {
            issues : {}
        }
        this.loadIssues();
    }

    async loadIssues (){
        let response = await this.issueService.fetchIssues();
        this.setState({issues:response})
    }

    render() {
        return(
            (this.state.issues.length>0)?
                <div className="container-fluid">
                    <div>
                        <i className="fa fa-2x fa-exclamation-circle"></i>
                        <span style={{paddingBottom:3}}> Issues {this.state.issues.length}</span></div>




                </div>
                :<div>Loading Issues please wait</div>
        )
    }
}
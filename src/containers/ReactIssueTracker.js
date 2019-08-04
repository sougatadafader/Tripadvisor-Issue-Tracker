import React, {Component} from 'react'
import IssueService from "../services/IssueService"
import { Header, Table, Rating } from 'semantic-ui-react'

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
                    <div className="container ml-2 mr-2">
                    <Table celled padded>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell singleLine>Issue Number</Table.HeaderCell>
                                <Table.HeaderCell>Title</Table.HeaderCell>
                                    <Table.HeaderCell>Created At</Table.HeaderCell>
                                <Table.HeaderCell>Updated At</Table.HeaderCell>
                                <Table.HeaderCell>Labels</Table.HeaderCell>
                                <Table.HeaderCell>State</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {
                                this.state.issues.map(( issue , id) =>
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h4' textAlign='center'>
                                            {issue.number}
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell singleLine>{issue.title}</Table.Cell>

                                    <Table.Cell textAlign='right'>
                                        {new Date(issue.created_at).toLocaleDateString()}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {new Date(issue.updated_at).toLocaleDateString()}
                                    </Table.Cell>
                                    <Table.Cell>
                                        
                                    </Table.Cell>
                                    <Table.Cell>
                                        {issue.state}
                                    </Table.Cell>
                                </Table.Row>
                                )}
                        </Table.Body>
                    </Table>
                    </div>
                </div>
                :<div>Loading Issues please wait</div>
        )
    }
}
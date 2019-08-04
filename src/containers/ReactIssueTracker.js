import React, {Component} from 'react'
import IssueService from "../services/IssueService"
import { Header, Table, Rating } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default class ReactIssueTracker extends Component{

    //Initialize constructor and issue Service.
    constructor(props){
        super(props);
        this.issueService =  new IssueService();

        this.state = {
            issues : this.props.issues
        }
    }

    render() {
        return(
            (this.state.issues.length>0)?
                <div className="m-2">
                    <div className="text-center">
                        <i className="fa fa-2x fa-exclamation-circle text-warning"></i>
                        <span style={{paddingBottom:3, fontSize :20}}> Issues {this.state.issues.length}</span>
                    </div>
                    <div className="container pl-4">
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
                                <Table.Row id={id}>
                                    <Table.Cell>
                                        <Header as='h4' textAlign='center'>
                                            {issue.number}
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell singleLine><Link to={`/issues/${issue.number}`}>{issue.title}</Link></Table.Cell>

                                    <Table.Cell textAlign='right'>
                                        {new Date(issue.created_at).toLocaleDateString()}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {new Date(issue.updated_at).toLocaleDateString()}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {issue.labels.length}
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
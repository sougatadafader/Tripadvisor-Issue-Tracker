import React, {Component} from 'react'
import {Header, Table, Rating} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

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
                        <span style={{marginBottom: 30, fontSize: 20}}> {this.state.issues.length} Issues </span>
                    </div>
                    <div className="container pl-4">

                        {/*Table View starts*/}
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
                                {/*Iterate over all the issues*/}
                                {this.state.issues.map((issue, id) =>
                                        <Table.Row key={id}>
                                            <Table.Cell>
                                                <Header as='h4' textAlign='center'>
                                                    <Link to={`/issues/${issue.number}`}>{issue.number}</Link>
                                                </Header>
                                            </Table.Cell>
                                            <Table.Cell singleLine><Link
                                                to={`/issues/${issue.number}`}>{issue.title}</Link></Table.Cell>

                                            <Table.Cell textAlign='right'>
                                                {new Date(issue.created_at).toLocaleDateString()}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {new Date(issue.updated_at).toLocaleDateString()}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {issue.labels.map((label, id) =>
                                                    <p style={{
                                                        padding: 5,
                                                        backgroundColor: "#" + label.color,
                                                        fontSize: 9
                                                    }} key={id}>{label.name}</p>
                                                )}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {issue.state}
                                            </Table.Cell>
                                        </Table.Row>
                                    )}
                            </Table.Body>
                        </Table>
                        {/*Table View ends*/}
                    </div>
                </div> : <div>Loading Issues please wait</div>
        )
    }

    componentWillUnmount() {
        this.abortController.abort();
    }
}
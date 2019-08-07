import React, {Component} from 'react'
import {Header, Table} from "semantic-ui-react";
import {Link} from "react-router-dom";


export default class SemanticTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            issues: this.props.issues
        }
    }
    render()
    {
        return(
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
                    {this.state.issues.map((issue) =>
                        <Table.Row key={issue.id}>
                            <Table.Cell>
                                <Header as='h4'>
                                    <Link to={`/issues/${issue.number}`}>{issue.number}</Link>
                                </Header>
                            </Table.Cell>
                            <Table.Cell><Link
                                to={`/issues/${issue.number}`}>{issue.title}</Link></Table.Cell>

                            <Table.Cell>
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
        )
    }

}
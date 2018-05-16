import React, { Component } from 'react';
import { API } from 'aws-amplify';
import { Link } from 'react-router-dom';
import { PageHeader, ListGroup, ListGroupItem } from 'react-bootstrap';

export default class ProjectList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      lastEvaluatedKey: undefined,
      projects: [],
    };
  }

  componentDidMount = async () => {
    try {
      this.setState({ isLoading: true });
      const res = await this.getProjects();
      this.setState({
        projects: res.tenants,
        lastEvaluatedKey: res.lastEvaluatedKey,
        isLoading: false,
      });
    } catch (e) {
      this.setState({ isLoading: false });
    }
  }

  getProjects = () => (API.post('tenants', '/tenants', { body: { lastEvaluatedKey: this.state.lastEvaluatedKey } }))

  handleProjectClick = (event) => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute('href'));
  }

  renderProjectsList = (projects) => {
    return [{}].concat(projects).map((project, i) =>
      (i !== 0
        ? <ListGroupItem
              key={project.tenantId}
              href={`/projects/${project.tenantName}`}
              onClick={this.handleProjectClick}
              header={project.tenantName.trim().split('\n')[0]}
            >
              {`Created: ${new Date(project.createdAt).toLocaleString()}`}
            </ListGroupItem>
        : <ListGroupItem
              key='new'
              href='/project/new'
              onClick={this.handleProjectClick}
            >
              <h4>
                <b>{'\uFF0B'}</b> Create a new project
              </h4>
            </ListGroupItem>));
  }

  render = () => {
    const loading = this.state.isLoading || this.props.loading;
    return (
      <div className='projects'>
        <ListGroup>
          {!this.state.isLoading && this.renderProjectsList(this.state.projects)}
        </ListGroup>
      </div>
    );
  }
}

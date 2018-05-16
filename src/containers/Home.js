import React, { Component } from 'react';
import { API } from 'aws-amplify';
import { Link } from 'react-router-dom';
import { PageHeader, ListGroup, ListGroupItem, Grid, Row, Col } from 'react-bootstrap';
import ProjectsList from '../components/ProjectsList';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  renderLander = () => {
    return (
      <div className='lander'>
        <h1>Monless</h1>
        <p>A simple mobile app remote control for developers</p>
        <div>
          <Link to='/login' className='btn btn-info btn-lg'>
            Login
          </Link>
          <Link to='/signup' className='btn btn-success btn-lg'>
            Signup
          </Link>
        </div>
      </div>
    );
  }

  renderDashboard = () => {
    return (
      <Row className="show-grid">
        <Col xs={12} md={4}>
          <ProjectsList props={this.state.props} loading={this.state.isLoading} />
        </Col>
        <Col xs={12} md={8}>
          <code>{'Col xs={12} md={8}'}</code>
        </Col>
      </Row>
    );
  }

  render = () => {
    return (
      <div className='Home'>
        {this.props.isAuthenticated ? this.renderDashboard() : this.renderLander()}
      </div>
    );
  }
}

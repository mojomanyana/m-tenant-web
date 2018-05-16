import React, { Component } from 'react';
import { API } from 'aws-amplify';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { Jumbotron } from 'react-bootstrap';
import BillingForm from '../components/BillingForm';
import config from '../config';

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  billUser = details => (API.post('notes', '/billing', { body: details }))

  handleFormSubmit = async (storage, { token, error }) => {
    if (error) {
      return;
    }

    this.setState({ isLoading: true });

    try {
      await this.billUser({
        storage,
        source: token.id,
      });

      this.props.history.push('/');
    } catch (e) {
      this.setState({ isLoading: false });
    }
  }

  render = () => {
    return (
      <div className='Settings'>
        <Jumbotron>
          <h1>Hello, {this.props.currentUser.nickname}!</h1>
          <p>Please review and edit your settings and subscription plan here.</p>
          <StripeProvider apiKey={config.STRIPE_KEY}>
            <Elements>
              <BillingForm
                loading={this.state.isLoading}
                onSubmit={this.handleFormSubmit}
              />
            </Elements>
          </StripeProvider>
        </Jumbotron>
      </div>
    );
  }
}

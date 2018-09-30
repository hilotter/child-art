import React, { Component } from 'react';
import {
  Container,
  Header,
  Button,
  Image,
} from 'semantic-ui-react';
import Head from '../components/Head';
import Layout from '../containers/Layout';

class ChildArtAbout extends Component {
  render () {
    return (
      <Layout>
        <Head />
        <Container text>
          <Header as="h4" textAlign='center'>
            Welcome to ChildArt
          </Header>
          <p>You can publish your child art on IPFS as Ethereum ERC721 token.</p>
          <ul>
            <li>
              What is Child Art ?
              <ul>
                <li>Your child's doodle</li>
                <li>Your child's painting</li>
              </ul>
            </li>
            <li>
              Note
              <ul>
                <li>Published Child Art cannot be deleted.</li>
                <li>Please do not upload ilegal contents.</li>
                <li>This service assumes no responsibility.</li>
              </ul>
            </li>
          </ul>
        </Container>
      </Layout>
    );
  }
}

export default ChildArtAbout;


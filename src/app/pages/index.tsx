import React, { Component } from 'react';
import {
  Container,
  Header,
  Image,
  Dimmer,
  Loader,
  Button,
} from 'semantic-ui-react';
import Link from 'next/link';
import Layout from '../containers/Layout';
import Head from '../components/Head';
import ChildArt from '../lib/ChildArt';
import { getTokenIdByIndex, getTokenDetail } from '../lib/ChildArtUtil';
import CardGroups from '../components/CardGroups';

class ChildArtIndex extends Component {
  static async getInitialProps() {
    let recentlyListedItems = [];
    try {
      const totalSupply = await ChildArt.methods.totalSupply().call();
      for (let i = totalSupply - 1; i >= 0; i--) {
        let tokenId = await getTokenIdByIndex(i);
        let tokenDetail = await getTokenDetail(tokenId);
        if (!tokenDetail) {
          continue;
        }
        recentlyListedItems.push(tokenDetail);
        if (recentlyListedItems.length >= 24) {
          break;
        }
      }
    } catch(err) {
      console.log(err);
    }
    return { items: recentlyListedItems };
  }

  constructor () {
    super();
    this.state = {
      pageLoading: true,
    };
  }

  async componentDidMount() {
    this.setState({ pageLoading: false });
  }

  getContent = () => {
    if (this.state.pageLoading) {
      return(
        <Dimmer active inverted>
          <Loader inverted content='Loading' />
        </Dimmer>
      );
    } else {
      return (
        <div>
          <p>
            <Image src="/static/img/header_photo.png" size='huge' centered />
          </p>
          <Header as='h2' textAlign='center'>
            Showcase digital Child artwork & collectables
            <Header.Subheader>
              Child Art is published on IPFS and associated to Ethereum ERC721 token.
            </Header.Subheader>
          </Header>

          <Container textAlign='center'>
            <Link href="/publish">
              <Button
                content="Publish"
                icon="paint brush"
                color='green'
              />
            </Link>
          </Container>

          <Header as='h2' textAlign='center'>
            <Header.Content>
              Recently Listed
            </Header.Content>
          </Header>
          <CardGroups items={this.props.items} />
        </div>
      )
    }
  }

  render () {
    return (
      <Layout>
        <Head />
        {this.getContent()}
      </Layout>
    );
  }
}

export default ChildArtIndex;

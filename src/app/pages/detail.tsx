import React, { Component } from 'react';
import {
  Container,
  Card,
  Dimmer,
  Loader,
  Header,
  Button,
} from 'semantic-ui-react';
import Error from 'next/error';
import Head from '../components/Head';
import Layout from '../containers/Layout';
import { getTokenDetailByIpfsHash } from '../lib/ChildArtUtil';
import CardItem from '../components/CardItem';
import config from '../config';

class ChildArtDetail extends Component {
  static async getInitialProps({ req }) {
    const match = req.url.match(/detail\/([A-Za-z0-9]{46})/);
    const ipfsHash = match[1];
    const tokenDetail = await getTokenDetailByIpfsHash(ipfsHash);
    return { token: tokenDetail };
  }

  constructor () {
    super();
    this.state = {
      notFound: false,
      pageLoading: true,
    };
  }

  async componentDidMount() {
    if (!this.props.token) {
      this.setState({ notFound: true });
    }
    this.setState({ pageLoading: false });
  }

  twitterShare = () => {
    const token = this.props.token;
    const shareText = `This is my favorite ChildArt! ${token.name} :`;
    const shareUrl = `${config.site_url}/detail/${token.ipfsHash}`;
    const hashtags = 'childart';
    window.open(`https://twitter.com/intent/tweet?url=${encodeURI(shareUrl)}&text=${shareText}&hashtags=${hashtags}`);
  }

  getContent = () => {
    const token = this.props.token;
    if (this.state.pageLoading) {
      return(
        <Dimmer active inverted>
          <Loader inverted content='Loading' />
        </Dimmer>
      );
    } else {
      return (
        <Container textAlign='center'>
          <Header as='h2'>
            {token.name}
            <Header.Subheader>
              {token.description}
            </Header.Subheader>
          </Header>

          <Card.Group centered>
            <CardItem
              tokenId={token.tokenId}
              tokenUri={token.tokenUri}
              name={token.name}
              description={token.description}
              image={token.image}
              linkUrl={token.linkUrl}
              internalLink={false}
            />
          </Card.Group>
          <Container>
            <Container style={{ marginTop: '10px' }}>
              <a
                href={token.linkUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Button
                  content="Go to OpenSea"
                  color='teal'
                />
              </a>
            </Container>
            <Container style={{ marginTop: '10px' }}>
              <p>
                Share
              </p>
              <Button circular color='twitter' icon='twitter' onClick={this.twitterShare} />
            </Container>
          </Container>
        </Container>
      );
    }
  }

  render () {
    if(this.state.notFound) {
      return <Error statusCode={404} />
    } else {
      const token = this.props.token;
      return (
        <Layout>
          <Head 
            title={token.name}
            ogType="article"
            image={token.image.replace(/infura\./,'')}
            description={token.description ? token.description : token.name}
            url={`${config.site_url}/detail/${token.ipfsHash}`}
          />
          {this.getContent()}
        </Layout>
      );
    }
  }
}

export default ChildArtDetail;

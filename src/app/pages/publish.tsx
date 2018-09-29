import React, { Component } from 'react';
import {
  Container,
  Form,
  Input,
  Button,
  Label,
  Icon,
  Message,
  Loader,
} from 'semantic-ui-react';
import Link from 'next/link';
import Layout from '../containers/Layout';
import Head from '../components/Head';
import ipfs from '../lib/ipfs';
import web3 from '../lib/web3';
import ChildArt from '../lib/ChildArt';
import config from '../config';

class ChildArtPublish extends Component {
  constructor () {
    super();
    this.state = {
      loading: false,
      uploading: false,
      name: '',
      description: '',
      added_file_hash: null,
      added_data_hash: null,
      tokenId: '',
      errorMessage: '',
      successMessage: '',
    };
  }

  captureFile = async (event) => {
    event.stopPropagation();
    event.preventDefault();

    this.setState({ uploading: true });

    const file = event.target.files[0];
    let reader = new window.FileReader();
    reader.onloadend = () => {
      this.saveFileToIpfs(reader.result, "added_file_hash");
      this.setState({ uploading: false });
    };
    reader.readAsArrayBuffer(file);
  }

  saveFileToIpfs = async (data, stateKey) => {
    const buffer = Buffer.from(data);
    
    try {
      const response = await ipfs.add(buffer);
      const ipfsId = response[0].hash;
      this.setState({ [stateKey]: ipfsId });
    } catch(err) {
      console.error(err);
    }
  }

  ipfsUrl = (hash) => {
    return `${config.ipfs.gateway_url}${hash}`;
  }

  createChildArt = async () => {
    const name = this.state.name;
    const description = this.state.description;

    if (this.state.name === '') {
      this.setState({ loading: false, errorMessage: "require name" });
      return;
    }

    if (this.state.added_file_hash === null) {
      this.setState({ loading: false, errorMessage: "require image" });
      return;
    }

    await this.saveFileToIpfs(JSON.stringify({
      name,
      description,
      image: this.ipfsUrl(this.state.added_file_hash),
      ipfs_hash: this.state.added_file_hash,
      external_url: `${config.site_url}/detail/${this.state.added_file_hash}`,
    }), "added_data_hash");

    if (this.state.added_data_hash === null) {
      this.setState({ loading: false, errorMessage: "ipfs upload error" });
      return;
    }

    try {
      const accounts = await web3.eth.getAccounts();
      const fee = await ChildArt.methods.getPaperFee().call();
      const txReceipt = await ChildArt.methods
          .mintPaper(this.state.added_file_hash, this.ipfsUrl(this.state.added_data_hash))
          .send({
              from: accounts[0],
              value: fee,
          })
          .on('transactionHash');
      this.setState({ successMessage: `Published your child art!` });
    } catch (err) {
      console.error(err);
      this.setState({ errorMessage: err.message });
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault()
    this.setState({ loading: true, errorMessage: '', successMessage: '' });
    await this.createChildArt();
    this.setState({ loading: false });
  }

  getContent = () => {
    return (
      <Container>
        <p>Let's upload your original Child Art.</p>
        <Form onSubmit={this.handleSubmit} error={!!this.state.errorMessage} success={!!this.state.successMessage}>
          <Form.Field>
            <Input
              placeholder="child art name"
              value={this.state.name}
              onChange={event => this.setState({ name: event.target.value })}
              type="text"
            />
          </Form.Field>
          <Form.Field>
            <Input
              placeholder="child art description"
              value={this.state.description}
              onChange={event => this.setState({ description: event.target.value })}
              type="text"
            />
          </Form.Field>

          <Label width="4" as="label" htmlFor="file" size="big">
            <Icon name="file" />
            Image
          </Label>
          <input id="file" hidden type="file" accept="image/*" onChange={this.captureFile} />
          <Loader active={this.state.uploading} inline />
          <p>
            <img
              src={this.state.added_file_hash ? this.ipfsUrl(this.state.added_file_hash) : null}
              style={{ "display": (this.state.added_file_hash ? "block" : "none"), "maxHeight": "500px" }}
            />
          </p>

          <Button
            loading={this.state.loading}
            disabled={this.state.loading}
            content="Publish Child Art"
            icon="paint brush"
            color='orange'
          />

          <Message error header="Oops!" content={this.state.errorMessage} /> 
          <Message success>
            <Message.Header>Success!</Message.Header>
            <p>{this.state.successMessage}</p>
            <p>Your transaction is mining now. Please wait a little while more.</p>
            <p>
              <Link href="/">
                <a>after that please check top page</a>
              </Link>
            </p>
          </Message>
        </Form>

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
    )
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

export default ChildArtPublish;

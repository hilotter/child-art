import React from 'react';
import { Container, Divider, Icon } from 'semantic-ui-react';

export default () => (
  <Container textAlign="center">
    <Divider />
    <footer>
      <p>
        <a href="/about" style={{ color: '#000' }}>about</a>
      </p>
      <p>
        Contact
      </p>
      <p>
        <a
          href="https://twitter.com/childart_chain"
          target="_blank"
          rel="noreferrer noopener"
        >
          <Icon name='twitter' size='big' color='blue' />
        </a>
      </p>
      <p>
        copyrights 2018 ChildArt All RIghts Reserved.
      </p>
    </footer>
  </Container>
);

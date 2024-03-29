import App, { Container } from 'next/app';
import Router from 'next/router';
import withGA from 'next-ga';
import React from 'react';

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}
export default withGA('UA-126029245-3', Router)(MyApp);

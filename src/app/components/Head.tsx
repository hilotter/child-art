import Head from 'next/head';
import config from '../config';

export default props => (
  <Head>
    <title>ChildArt</title>
    <meta property="og:title" content={props.title ? `${props.title} - ChildArt` : "ChildArt"} />
    <meta property="og:description" content={props.description ? props.description : "Showcase digital Child artwork & collectables"} />
    <meta name="keywords" content="zen,art,mindfulness" />
    <meta property="og:type" content={props.ogType ? props.ogType : "website"} />
    <meta property="og:url" content={props.url ? props.url : config.site_url} />
    <meta property="og:image" content={props.image ? props.image : `${config.site_url}/static/img/ogp.png`} />
    <meta property="og:site_name" content="ChildArt" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@childart_chain" />
    <meta name="twitter:title" content="ChildArt" />
    <meta name="twitter:description" content={props.description ? props.description : "Showcase digital Child artwork & collectables"} />
    <meta name="twitter:image" content={props.image ? props.image : `${config.site_url}/static/img/ogp.png`} />
    <link rel="shortcut icon" href={`${config.site_url}/static/img/favicon.png`} />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
  </Head>
);

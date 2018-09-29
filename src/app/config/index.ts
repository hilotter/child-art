const env = process.env.ENV || 'development';

const configs = {
  development: {
    ipfs: {
      host: 'localhost',
      protocol: 'http',
      port: 5001,
      gateway_url: 'http://localhost:8080/ipfs/',
    },
    site_url: 'http://localhost:3000',
    etherscan_url: 'https://rinkeby.etherscan.io',
    contract_address: '0xfb2b7446e020526e32e2946298c2492c95dc3723',
    network_id: 1111,
    opensea_assets_url: 'https://rinkeby.opensea.io/assets/',
    opensea_url: 'https://rinkeby.opensea.io/category/childart',
    infura_url: 'http://localhost:8545',
  },
  staging: {
    ipfs: {
      host: 'ipfs.infura.io',
      protocol: 'https',
      port: 5001,
      gateway_url: 'https://ipfs.infura.io/ipfs/',
    },
    site_url: 'https://rinkeby.child-art.app',
    etherscan_url: 'https://rinkeby.etherscan.io',
    contract_address: '0x3dd23a655f261371259bb9e6feeb6d663516e37c',
    network_id: 4,
    opensea_assets_url: 'https://rinkeby.opensea.io/assets/',
    opensea_url: 'https://rinkeby.opensea.io/category/childart',
    infura_url: 'https://rinkeby.infura.io/v3/52cff74f88ac4e518e7b580d1f0af874',
  },
  production: {
    ipfs: {
      host: 'ipfs.infura.io',
      protocol: 'https',
      port: 5001,
      gateway_url: 'https://ipfs.infura.io/ipfs/',
    },
    site_url: 'https://child-art.app',
    etherscan_url: 'https://etherscan.io',
    contract_address: '0x706163a2ccfdf9b851830954a64a21a4987edd36',
    network_id: 1,
    opensea_assets_url: 'https://opensea.io/assets/',
    opensea_url: 'https://opensea.io/category/childart',
    infura_url: 'https://rinkeby.infura.io/v3/52cff74f88ac4e518e7b580d1f0af874',
  },
}[env];

export default configs;
